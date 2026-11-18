/*
 * metro-layout.js · 线网自动排布（v3）
 * ---------------------------------------------------------------
 * 输入 window.ALP（lines / branches / stages / transfers / resources），输出可直接画 SVG 的几何：
 *   站点坐标、每条线的折线（只用水平 / 45° 段，圆角转弯）、支线分岔、换乘站合并、
 *   入门 / 进阶 / 实战三段分区、标签位置（避让线、站、标签、分隔线），以及冲突清单。
 * 不碰 DOM，浏览器里挂在 window.MetroLayout，Node 里 module.exports。
 *
 * 思路：
 *   1. 列：每个资源是一个节点（多条线共用 = 换乘站）。同一段内按「线上先后」做最长路径分层，
 *      段与段首尾相接，所以先后顺序和三段分区天然成立。
 *   2. 行：逐列扫描。共用同一站的几条线在这一列并成一束（间距 bundleGap），其余线各占一条道，
 *      道与道至少 laneSep。位置尽量沿用上一列（PAV 块合并求最小移动），线只在列间用 45° 斜段换道。
 *   3. 列距：每个列间距 ≥ 斜段需要的水平长度 + 站点两侧的直段，保证 45°。
 *   4. 线序与支线朝向：枚举线的排列、逐线试支线上下方向，取总折返最少、交叉最少的一种。
 *   5. 标签：8 个候选位置贪心放置，碰到线 / 站 / 徽标 / 标签 / 分隔线就换；仍有冲突则放宽道距和列距重排。
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.MetroLayout = api;
})(typeof window !== "undefined" ? window : this, function () {
  "use strict";

  /* ---------- 默认参数（渲染端必须用同一套字号，见 FONTS） ---------- */
  var FONTS = {
    family: '"ALP Serif SC", "Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", "SimSun", serif',   // F1 铅印宋，与 site.css 一致
    mono: '"ALP Mono", ui-monospace, SFMono-Regular, Menlo, "ALP Serif SC", monospace',
    name: { size: 13, weight: 600, lineHeight: 16 },
    code: { size: 12, weight: 500, lineHeight: 14 },   // 等宽小字 ≥12px（可读性规范）
    zone: { size: 13, weight: 600 },
    cap: { size: 13, weight: 600 },   // 徽章字母、「+N 站」终点帽 ≥13px
    maxName: 112      // 站名超过这个宽度就折行（最多三行，绝不截断）
  };
  var DEFAULTS = {
    laneSep: 56,        // 不同道之间的最小中心距
    bundleGap: 12,      // 同一换乘站并束时线与线的中心距
    colGapMin: 96,      // 列距下限
    run: 16,            // 站点两侧至少保留的水平直段
    stroke: 6,          // 线宽
    stationR: 6.5,      // 普通站半径
    pillR: 8,           // 换乘胶囊半宽
    badgeR: 12,         // 起终点徽标半径（容纳 13px 粗体字母）
    badgeOffset: 30,    // 徽标离首末站的水平距离
    cornerR: 12,        // 转弯圆角
    labelGap: 5,        // 标签离站点
    margin: { top: 64, right: 56, bottom: 40, left: 56 },
    relax: [ [0, 0], [8, 8], [16, 16], [24, 28], [36, 40], [48, 56] ], // 放宽档：[laneSep+, colGapMin+]
    maxPermLines: 6
  };

  /* ---------- 颜色：WCAG 对比度，徽标字色自动选黑或白 ---------- */
  function hexToRgb(h) {
    h = String(h).replace("#", "");
    if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function luminance(hex) {
    var c = hexToRgb(hex).map(function (v) {
      v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function contrast(a, b) {
    var la = luminance(a), lb = luminance(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  }
  function textOn(bg, ink, paper) {
    ink = ink || "#111111"; paper = paper || "#FFFFFF";
    return contrast(bg, paper) >= contrast(bg, ink) ? paper : ink;
  }

  /* ---------- 文本宽度：浏览器用 canvas，Node 用估算 ---------- */
  function makeMeasure() {
    var ctx = null;
    try {
      if (typeof document !== "undefined") ctx = document.createElement("canvas").getContext("2d");
    } catch (e) { ctx = null; }
    return function (text, f, family) {
      text = String(text);
      if (ctx) {
        ctx.font = f.weight + " " + f.size + "px " + family;
        return ctx.measureText(text).width;
      }
      var w = 0;
      for (var i = 0; i < text.length; i++) {
        var cc = text.charCodeAt(i);
        w += cc > 0x2e80 ? f.size : (family === FONTS.mono ? 0.6 : 0.6) * f.size;
      }
      return w;
    };
  }

  function pad2(n) { return n < 10 ? "0" + n : String(n); }

  /* =================================================================
   * 1. 数据规范化与校验
   * ================================================================= */
  function normalize(data, opt) {
    opt = opt || {};
    var errors = [];
    var stages = data.stages || [];
    var stageIdx = {};
    stages.forEach(function (s, i) { stageIdx[s.id] = i; });
    var res = data.resources || {};
    var onlyLines = opt.lines ? opt.lines.slice() : null;
    var lines = (data.lines || []).filter(function (l) { return !onlyLines || onlyLines.indexOf(l.id) !== -1; });

    var palette = (data.palette || []).slice();
    var nodes = {}, tracks = [], lineModels = [];

    function stopsByStage(obj, where) {
      var out = [];
      Object.keys(obj || {}).forEach(function (sid) {
        if (!(sid in stageIdx)) errors.push(where + "：未知分段 " + sid);
      });
      stages.forEach(function (s) {
        ((obj || {})[s.id] || []).forEach(function (rid) { out.push({ id: rid, stage: s.id }); });
      });
      return out;
    }
    function node(rid, stage, where) {
      if (!res[rid]) { errors.push(where + "：资源不存在 " + rid); }
      var n = nodes[rid];
      if (!n) n = nodes[rid] = { id: rid, stage: stage, si: stageIdx[stage], tracks: [], lines: [], codes: {} };
      else if (n.stage !== stage) errors.push(where + "：换乘站 " + rid + " 在不同线上分段不一致（" + n.stage + " / " + stage + "）");
      return n;
    }

    var usedColors = lines.map(function (l) { return (l.color || "").toUpperCase(); });
    lines.forEach(function (l, li) {
      var color = l.color;
      if (!color) {
        while (palette.length && usedColors.indexOf(palette[0].toUpperCase()) !== -1) palette.shift();
        color = palette.shift() || "#555555";
      }
      var lm = {
        id: l.id, code: l.code, name: l.name, en: l.en, audience: l.audience,
        color: color, textOn: textOn(color), order: li, trunk: null, branches: [], stationCount: 0
      };
      var seen = {};
      var allTrunk = stopsByStage(l.trunk, "线 " + l.id);
      // 汇流终点：主干上分段晚于所有支线站的那几站（如「面试」）组成终点段 tail，所有支线的实战末端汇入 tail 第一站
      var maxBranchSi = -1;
      (l.branches || []).forEach(function (b) { Object.keys(b.stops || {}).forEach(function (sid) { if ((b.stops[sid] || []).length && sid in stageIdx) maxBranchSi = Math.max(maxBranchSi, stageIdx[sid]); }); });
      var trunkStops = allTrunk, tailStops = [];
      if (maxBranchSi >= 0) {
        var pre = allTrunk.filter(function (x) { return stageIdx[x.stage] <= maxBranchSi; });
        var post = allTrunk.filter(function (x) { return stageIdx[x.stage] > maxBranchSi; });
        if (pre.length && post.length) { trunkStops = pre; tailStops = post; }
      }
      if (!trunkStops.length) errors.push("线 " + l.id + "：主干没有站");
      // 主干内的分段必须单调
      var trunk = {
        id: l.id, key: l.id, lineId: l.id, branchId: null, kind: "trunk", code: l.code, name: l.name,
        color: color, textOn: lm.textOn, nodes: [], stages: [], fork: null, continues: false, side: 0,
        more: (l.trunkMore || 0)
      };
      trunkStops.forEach(function (s, i) {
        if (seen[s.id]) errors.push("线 " + l.id + "：站 " + s.id + " 重复");
        seen[s.id] = true;
        var n = node(s.id, s.stage, "线 " + l.id);
        trunk.nodes.push(s.id); trunk.stages.push(s.stage);
        n.codes[l.id] = l.code + pad2(i + 1);
      });
      tracks.push(trunk); lm.trunk = trunk;
      var tail = null;
      if (tailStops.length) {
        tail = {
          id: l.id + "/tail", key: l.id + "/tail", lineId: l.id, branchId: null, kind: "tail", code: l.code, name: l.name,
          color: color, textOn: lm.textOn, nodes: [], stages: [], fork: null, continues: false, side: 0, more: 0,
          stageName: (stages[stageIdx[tailStops[0].stage]] || {}).name || "", more: l.tailMore || 0
        };
        tailStops.forEach(function (s, i) {
          if (seen[s.id]) errors.push("线 " + l.id + "：站 " + s.id + " 重复");
          seen[s.id] = true;
          var n = node(s.id, s.stage, "线 " + l.id);
          tail.nodes.push(s.id); tail.stages.push(s.stage);
          n.codes[l.id] = l.code + pad2(trunkStops.length + i + 1);
        });
      }
      lm.tail = tail;
      var last = trunk.nodes[trunk.nodes.length - 1];
      var contTaken = false;
      (l.branches || []).forEach(function (b) {
        var bStops = stopsByStage(b.stops, "支线 " + l.id + "/" + b.id);
        if (trunk.nodes.indexOf(b.from) === -1) errors.push("支线 " + l.id + "/" + b.id + "：分岔站 " + b.from + " 不在主干上");
        if (!bStops.length) errors.push("支线 " + l.id + "/" + b.id + "：没有站");
        var forkStage = nodes[b.from] ? nodes[b.from].si : 0;
        if (bStops.length && stageIdx[bStops[0].stage] < forkStage) errors.push("支线 " + l.id + "/" + b.id + "：第一站的分段早于分岔站");
        var t = {
          id: l.id + "/" + b.id, key: l.id + "/" + b.id, lineId: l.id, branchId: b.id, kind: "branch",
          code: b.code, name: b.name, color: color, textOn: lm.textOn,
          nodes: [b.from], stages: [nodes[b.from] ? nodes[b.from].stage : "intro"], fork: b.from,
          continues: false, side: b.side === "up" ? -1 : b.side === "down" ? 1 : 0, fixedSide: !!b.side,
          more: b.more || 0, total: b.total || 0
        };
        if (b.from === last && !contTaken && b.side == null) { t.continues = true; contTaken = true; }
        bStops.forEach(function (s, i) {
          if (seen[s.id]) errors.push("线 " + l.id + "：站 " + s.id + " 在同一条线上出现两次");
          seen[s.id] = true;
          var n = node(s.id, s.stage, "支线 " + l.id + "/" + b.id);
          t.nodes.push(s.id); t.stages.push(s.stage);
          n.codes[l.id] = b.code + "-" + pad2(i + 1);
        });
        if (tail) { t.join = tail.nodes[0]; t.nodes.push(tail.nodes[0]); t.stages.push(tail.stages[0]); }
        tracks.push(t); lm.branches.push(t);
      });
      if (tail) tracks.push(tail);
      lm.stationCount = Object.keys(seen).length;
      lineModels.push(lm);
    });

    tracks.forEach(function (t) {
      t.nodes.forEach(function (rid, i) {
        var n = nodes[rid]; if (!n) return;
        if (t.kind === "branch" && i === 0) return; // 分岔站属于主干
        if (t.join && i === t.nodes.length - 1) return; // 汇流站属于终点段
        if (n.tracks.indexOf(t.key) === -1) n.tracks.push(t.key);
        if (n.lines.indexOf(t.lineId) === -1) n.lines.push(t.lineId);
      });
      for (var i = 1; i < t.stages.length; i++)
        if (stageIdx[t.stages[i]] < stageIdx[t.stages[i - 1]]) errors.push(t.key + "：分段顺序倒退");
    });
    Object.keys(nodes).forEach(function (k) { nodes[k].interchange = nodes[k].lines.length > 1; });

    var transfers = (data.transfers || []).map(function (tr) {
      var stops = (tr.stops || []).filter(function (rid) {
        if (!res[rid]) { errors.push("换乘专题 " + tr.id + "：资源不存在 " + rid); return false; }
        return true;
      });
      var onMap = stops.filter(function (rid) { return nodes[rid]; });
      var lineIds = [];
      onMap.forEach(function (rid) { nodes[rid].lines.forEach(function (l) { if (lineIds.indexOf(l) === -1) lineIds.push(l); }); });
      return { id: tr.id, code: tr.code, name: tr.name, en: tr.en, summary: tr.summary, stops: stops, lines: lineIds };
    });

    // 末尾没有任何站的分段（如 P/E 线没有面试站）不画空分区
    var maxSi = -1;
    Object.keys(nodes).forEach(function (rid) { if (nodes[rid].si > maxSi) maxSi = nodes[rid].si; });
    if (maxSi >= 0 && maxSi < stages.length - 1) stages = stages.slice(0, maxSi + 1);

    return { stages: stages, stageIdx: stageIdx, nodes: nodes, tracks: tracks, lines: lineModels,
      transfers: transfers, resources: res, errors: errors, typeLabels: data.typeLabels || {} };
  }

  /* =================================================================
   * 2. 列分配：段内最长路径
   * ================================================================= */
  function assignColumns(m) {
    var ids = Object.keys(m.nodes);
    var preds = {};
    ids.forEach(function (k) { preds[k] = []; });
    m.tracks.forEach(function (t) {
      for (var i = 1; i < t.nodes.length; i++) preds[t.nodes[i]].push(t.nodes[i - 1]);
    });
    var col = {}, zoneStart = [], zoneEnd = [], start = 0;
    m.stages.forEach(function (s, si) {
      zoneStart[si] = start;
      var inZone = ids.filter(function (k) { return m.nodes[k].si === si; });
      inZone.forEach(function (k) { col[k] = start; });
      var changed = true, guard = 0;
      while (changed) {
        changed = false;
        if (++guard > inZone.length + 2) { m.errors.push("段 " + s.id + "：站的先后关系有环，无法排成一条路线"); break; }
        inZone.forEach(function (k) {
          preds[k].forEach(function (p) {
            var c = m.nodes[p].si === si ? col[p] + 1 : (m.nodes[p].si < si ? start : start);
            if (m.nodes[p].si === si && c > col[k]) { col[k] = c; changed = true; }
            if (m.nodes[p].si < si && start > col[k]) { col[k] = start; changed = true; }
          });
        });
      }
      var end = start;
      inZone.forEach(function (k) { if (col[k] > end) end = col[k]; });
      // 分岔站和支线首站同列时，支线首站右移一列
      zoneEnd[si] = inZone.length ? end : start; // 空段也占一列
      start = zoneEnd[si] + 1;
    });
    ids.forEach(function (k) { m.nodes[k].col = col[k]; });
    m.cols = start;
    m.zoneStart = zoneStart; m.zoneEnd = zoneEnd;
    m.tracks.forEach(function (t) {
      t.firstCol = m.nodes[t.nodes[0]].col;
      t.lastCol = m.nodes[t.nodes[t.nodes.length - 1]].col;
      t.colOf = {};
      t.nodes.forEach(function (rid) { t.colOf[m.nodes[rid].col] = rid; });
    });
  }

  /* =================================================================
   * 3. 道序：线的排列 + 支线朝向 → 每条 track 的 lane index
   * ================================================================= */
  function laneIndexes(m, order, sides) {
    var idx = {}, base = 0;
    order.forEach(function (lineId) {
      var lm = m.lines.filter(function (l) { return l.id === lineId; })[0];
      var trunkCol = function (t) { return m.nodes[t.fork].col; };
      var side = function (t) { return sides[t.key] != null ? sides[t.key] : t.side; };
      var ups = lm.branches.filter(function (t) { return !t.continues && side(t) < 0; })
        .sort(function (a, b) { return trunkCol(a) - trunkCol(b); }); // 先分岔的在外
      var downs = lm.branches.filter(function (t) { return !t.continues && side(t) > 0; })
        .sort(function (a, b) { return trunkCol(b) - trunkCol(a); }); // 先分岔的在外（最后）
      ups.forEach(function (t) { idx[t.key] = base++; });
      idx[lm.trunk.key] = base;
      if (lm.tail) idx[lm.tail.key] = base;
      lm.branches.forEach(function (t) { if (t.continues) idx[t.key] = base; });
      base++;
      downs.forEach(function (t) { idx[t.key] = base++; });
    });
    return idx;
  }

  /* =================================================================
   * 4. 行：逐列扫描 + PAV 块合并
   * ================================================================= */
  function sweepRows(m, lane, P, noStraighten) {
    var Y = {}; // Y[trackKey][col]
    // 新出现的主干：按线序紧凑排（不给还没出现的支线预留空道）
    P = Object.assign({}, P, { _homeOf: {} });
    m.tracks.filter(function (t) { return t.kind === "trunk"; })
      .sort(function (a, b) { return lane[a.key] - lane[b.key]; })
      .forEach(function (t, i) { P._homeOf[t.key] = i; });
    m.tracks.forEach(function (t) { Y[t.key] = {}; });
    var trunkOf = {};
    m.tracks.forEach(function (t) { if (t.kind === "trunk") trunkOf[t.lineId] = t; });
    var tailOf = {};
    m.tracks.forEach(function (t) { if (t.kind === "tail") tailOf[t.lineId] = t; });
    P._tailOf = tailOf;

    for (var c = 0; c < m.cols; c++) {
      var active = m.tracks.filter(function (t) {
        return c >= t.firstCol && c <= t.lastCol && !(t.kind === "branch" && c === t.firstCol) && !(t.join && c === t.lastCol);
      });
      // 共用站成组
      var groupOf = {}, groups = [];
      active.forEach(function (t) {
        var rid = t.colOf[c];
        if (!rid) return;
        var n = m.nodes[rid];
        var members = active.filter(function (u) { return u.colOf[c] === rid; });
        if (members.length < 2 || groupOf[t.key]) return;
        var g = { members: members.sort(function (a, b) { return lane[a.key] - lane[b.key]; }), rid: rid };
        members.forEach(function (u) { groupOf[u.key] = g; });
        groups.push(g);
      });
      var items = [];
      groups.forEach(function (g) { items.push(g); });
      active.forEach(function (t) { if (!groupOf[t.key]) items.push({ members: [t] }); });

      items.forEach(function (it) {
        var sumK = 0, sumD = 0;
        it.members.forEach(function (t) {
          sumK += lane[t.key];
          var d;
          if (Y[t.key][c - 1] != null) d = Y[t.key][c - 1];
          else if (t.kind === "branch") {
            var tr = trunkOf[t.lineId];
            var fy = Y[tr.key][t.firstCol];
            d = fy + (lane[t.key] - lane[tr.key]) * P.laneSep;
          } else if (t.kind === "tail") {
            var trk = trunkOf[t.lineId], ys = [];
            m.tracks.forEach(function (u) { if (u.join && u.lineId === t.lineId && Y[u.key][c - 1] != null) ys.push(Y[u.key][c - 1] + (lane[t.key] - lane[u.key]) * P.laneSep); });
            d = ys.length ? ys.reduce(function (a, b) { return a + b; }, 0) / ys.length : (Y[trk.key][trk.lastCol] != null ? Y[trk.key][trk.lastCol] : 0);
          } else d = (P._homeOf[t.key] || 0) * P.laneSep;
          t._d = d; sumD += d;
        });
        it.key = sumK / it.members.length;
        it.h = (it.members.length - 1) * P.bundleGap;
        it.d = sumD / it.members.length;
      });
      items.sort(function (a, b) { return a.key - b.key || a.d - b.d; });

      // PAV：块内相对位置固定，块位置取成员期望的均值
      var blocks = [];
      items.forEach(function (it) {
        var b = { items: [it], off: [0], span: it.h, w: 1, sum: it.d };
        b.pos = b.sum / b.w; // 块中第一个 item 的中心 - 0
        blocks.push(b);
        while (blocks.length > 1) {
          var B = blocks[blocks.length - 1], A = blocks[blocks.length - 2];
          var aBottom = A.pos + A.span + 0; // A 最后一个 item 的中心 + 半高 已计入 span
          var lastA = A.items[A.items.length - 1];
          var firstB = B.items[0];
          // A 末项下沿 与 B 首项上沿
          var aEdge = A.pos + A.off[A.off.length - 1] + lastA.h / 2;
          var bEdge = B.pos - firstB.h / 2;
          if (bEdge - aEdge >= P.laneSep - 0.01) break;
          // 合并
          var shift = A.off[A.off.length - 1] + lastA.h / 2 + P.laneSep + firstB.h / 2;
          B.items.forEach(function (x, i) { A.items.push(x); A.off.push(B.off[i] + shift); });
          A.sum += B.sum - shift * B.w;
          A.w += B.w;
          A.span = A.off[A.off.length - 1];
          A.pos = A.sum / A.w;
          blocks.pop();
        }
      });
      blocks.forEach(function (b) {
        b.items.forEach(function (it, i) {
          var center = b.pos + b.off[i];
          var top = center - it.h / 2;
          it.members.forEach(function (t, j) { Y[t.key][c] = top + j * P.bundleGap; });
        });
      });
      // 分岔列：支线挂在主干站上
      m.tracks.forEach(function (t) {
        if (t.kind === "branch" && c === t.firstCol) Y[t.key][c] = Y[trunkOf[t.lineId].key][c];
        if (t.join && c === t.lastCol && tailOf[t.lineId]) Y[t.key][c] = Y[tailOf[t.lineId].key][c];
      });
    }
    if (!noStraighten) straighten(m, Y, P, trunkOf, tailOf);
    // 取整，避免半像素
    Object.keys(Y).forEach(function (k) { Object.keys(Y[k]).forEach(function (c) { Y[k][c] = Math.round(Y[k][c] * 2) / 2; }); });
    return Y;
  }

  /* 拉直：把一列里的一个道（或一整束）整体平移，去掉小折返；只接受不破坏间距、不改变上下顺序、且减少折返的移动 */
  function straighten(m, Y, P, trunkOf, tailOf) {
    tailOf = tailOf || {};
    function itemsAt(c) {
      var act = m.tracks.filter(function (t) { return Y[t.key][c] != null && !(t.kind === "branch" && c === t.firstCol) && !(t.join && c === t.lastCol); });
      var seen = {}, items = [];
      act.forEach(function (t) {
        if (seen[t.key]) return;
        var rid = t.colOf[c];
        var mem = rid ? act.filter(function (u) { return u.colOf[c] === rid; }) : [t];
        mem.forEach(function (u) { seen[u.key] = true; });
        items.push(mem);
      });
      return items;
    }
    function jog(dy) { dy = Math.abs(dy); return dy < 0.5 ? 0 : 40 + dy; }
    function localCost(mem, c) {
      var s = 0;
      mem.forEach(function (t) {
        var y = Y[t.key][c];
        if (Y[t.key][c - 1] != null) s += jog(y - Y[t.key][c - 1]);
        if (Y[t.key][c + 1] != null) s += jog(Y[t.key][c + 1] - y);
      });
      // 挂在这一列分岔的支线
      m.tracks.forEach(function (b) {
        if (b.kind === "branch" && b.firstCol === c && mem.indexOf(trunkOf[b.lineId]) !== -1 && Y[b.key][c + 1] != null)
          s += jog(Y[b.key][c + 1] - Y[trunkOf[b.lineId].key][c]);
        if (b.join && b.lastCol === c && mem.indexOf(tailOf[b.lineId]) !== -1 && Y[b.key][c - 1] != null)
          s += jog(Y[tailOf[b.lineId].key][c] - Y[b.key][c - 1]);
      });
      return s;
    }
    function feasible(items, idx, delta, c) {
      var mem = items[idx];
      for (var i = 0; i < items.length; i++) {
        if (i === idx) continue;
        for (var a = 0; a < mem.length; a++) for (var b = 0; b < items[i].length; b++) {
          var y0 = Y[mem[a].key][c], y1 = y0 + delta, yo = Y[items[i][b].key][c];
          if ((y0 - yo) * (y1 - yo) <= 0) return false;
          if (Math.abs(y1 - yo) < P.laneSep - 0.01) return false;
        }
      }
      return true;
    }
    function shift(mem, c, delta) {
      mem.forEach(function (t) { Y[t.key][c] += delta; });
      m.tracks.forEach(function (b) {
        if (b.kind === "branch" && b.firstCol === c && mem.indexOf(trunkOf[b.lineId]) !== -1) Y[b.key][c] = Y[trunkOf[b.lineId].key][c];
        if (b.join && b.lastCol === c && mem.indexOf(tailOf[b.lineId]) !== -1) Y[b.key][c] = Y[tailOf[b.lineId].key][c];
      });
    }
    for (var pass = 0; pass < 6; pass++) {
      var changed = false;
      for (var c = 0; c < m.cols; c++) {
        var items = itemsAt(c);
        items.forEach(function (mem, idx) {
          var deltas = [];
          mem.forEach(function (t) {
            [c - 1, c + 1].forEach(function (cc) {
              if (Y[t.key][cc] != null) { var d = Y[t.key][cc] - Y[t.key][c]; if (Math.abs(d) > 0.5) deltas.push(d); }
            });
          });
          m.tracks.forEach(function (b) {
            if (b.kind === "branch" && b.firstCol === c && mem.indexOf(trunkOf[b.lineId]) !== -1 && Y[b.key][c + 1] != null) {
              var d = Y[b.key][c + 1] - Y[b.key][c]; if (Math.abs(d) > 0.5) deltas.push(d);
            }
          });
          var base = localCost(mem, c);
          var best = 0, bestCost = base;
          deltas.forEach(function (d) {
            if (!feasible(items, idx, d, c)) return;
            shift(mem, c, d);
            var cst = localCost(mem, c);
            shift(mem, c, -d);
            if (cst < bestCost - 0.5) { bestCost = cst; best = d; }
          });
          if (best) { shift(mem, c, best); changed = true; }
        });
      }
      if (!changed) break;
    }
  }

  function geomScore(m, Y, P) {
    var move = 0, cross = 0, maxDy = 0, W = 0;
    for (var c = 0; c + 1 < m.cols; c++) {
      var colDy = 0;
      m.tracks.forEach(function (t) { var a = Y[t.key][c], b = Y[t.key][c + 1]; if (a != null && b != null) colDy = Math.max(colDy, Math.abs(b - a)); });
      W += P ? Math.max(P.colGapMin, colDy + 2 * P.run) : 0;
      var both = m.tracks.filter(function (t) { return Y[t.key][c] != null && Y[t.key][c + 1] != null; });
      both.forEach(function (t, i) {
        var dy = Math.abs(Y[t.key][c + 1] - Y[t.key][c]);
        move += dy; if (dy > maxDy) maxDy = dy;
        for (var j = i + 1; j < both.length; j++) {
          var u = both[j];
          var a = Y[t.key][c] - Y[u.key][c], b = Y[t.key][c + 1] - Y[u.key][c + 1];
          if (a * b < 0) cross++;
        }
      });
    }
    var ys = [];
    m.tracks.forEach(function (t) { Object.keys(Y[t.key]).forEach(function (c) { ys.push(Y[t.key][c]); }); });
    var h = Math.max.apply(null, ys) - Math.min.apply(null, ys);
    return move + 400 * cross + 0.5 * h + 1.5 * W; // W：总宽（列距由最大竖向位移决定），偏好把有换乘关系的线排在一起
  }

  function permutations(arr) {
    if (arr.length <= 1) return [arr.slice()];
    var out = [];
    arr.forEach(function (x, i) {
      var rest = arr.slice(0, i).concat(arr.slice(i + 1));
      permutations(rest).forEach(function (p) { out.push([x].concat(p)); });
    });
    return out;
  }

  /* 枚举线序；每个线序下逐线试支线朝向（坐标下降一轮） */
  function chooseOrder(m, P) {
    var ids = m.lines.map(function (l) { return l.id; });
    var perms = ids.length <= P.maxPermLines ? permutations(ids) : [ids];
    var cands = [];
    perms.forEach(function (order) {
      var sides = {};
      // 默认：交替上下
      m.lines.forEach(function (lm) {
        var k = 0;
        lm.branches.forEach(function (t) { if (!t.continues && !t.fixedSide) sides[t.key] = (k++ % 2 === 0) ? -1 : 1; });
      });
      var best = geomScore(m, sweepRows(m, laneIndexes(m, order, sides), P, true), P);
      m.lines.forEach(function (lm) {
        var free = lm.branches.filter(function (t) { return !t.continues && !t.fixedSide; });
        if (!free.length || free.length > 5) return;
        var bestSides = null;
        for (var mask = 0; mask < (1 << free.length); mask++) {
          var s2 = Object.assign({}, sides);
          free.forEach(function (t, i) { s2[t.key] = (mask >> i) & 1 ? 1 : -1; });
          var sc = geomScore(m, sweepRows(m, laneIndexes(m, order, s2), P, true), P);
          if (sc < best - 0.01) { best = sc; bestSides = s2; }
        }
        if (bestSides) sides = bestSides;
      });
      cands.push({ order: order, sides: sides, score: best });
    });
    cands.sort(function (a, b) { return a.score - b.score; });
    return cands;
  }

  /* =================================================================
   * 5. 几何：列 x、折线、圆角 path、徽标、方向箭头
   * ================================================================= */
  // 分区标题文字（渲染端 map.js 用 z.label，量宽也用它，保证 cuts / 避让与实际一致）
  function zoneLabel(st, terminal) { return st.name + " " + String(st.en || "").toUpperCase() + (terminal ? " · 终点" : ""); }
  function isTailStage(m, sid) { return m.tracks.some(function (t) { return t.kind === "tail" && t.stages[0] === sid; }); }

  function buildGeometry(m, Y, P, measure) {
    var X = [P.margin.left + P.badgeOffset + P.badgeR];
    for (var c = 0; c + 1 < m.cols; c++) {
      var maxDy = 0;
      m.tracks.forEach(function (t) {
        var a = Y[t.key][c], b = Y[t.key][c + 1];
        if (a != null && b != null) maxDy = Math.max(maxDy, Math.abs(b - a));
      });
      var gap = Math.max(P.colGapMin, maxDy + 2 * P.run);
      X.push(X[c] + gap);
    }
    // 每段至少放得下段标题（「进阶 DEEPER」+ 左右留白）
    m.stages.forEach(function (st, si) {
      if (si === m.stages.length - 1) return;
      var a = m.zoneStart[si], b = m.zoneEnd[si];
      var x0 = si === 0 ? 0 : (X[a - 1] + X[a]) / 2, x1 = (X[b] + X[b + 1]) / 2;
      var need = 20 + measure(zoneLabel(st, isTailStage(m, st.id)), FONTS.zone, FONTS.family) + 28;
      var deficit = need - (x1 - x0);
      if (deficit > 0) for (var k = b + 1; k < X.length; k++) X[k] += 2 * deficit;
    });
    var minY = Infinity, maxY = -Infinity;
    m.tracks.forEach(function (t) { Object.keys(Y[t.key]).forEach(function (c) { minY = Math.min(minY, Y[t.key][c]); maxY = Math.max(maxY, Y[t.key][c]); }); });
    var oy = P.margin.top + 44 - minY; // 44：给最上面一行的上方标签留位
    var tracks = m.tracks.map(function (t) {
      var pts = [];
      for (var c = t.firstCol; c <= t.lastCol; c++) {
        var y = Y[t.key][c] + oy, x = X[c];
        if (c === t.firstCol) { pts.push([x, y]); continue; }
        var py = Y[t.key][c - 1] + oy, px = X[c - 1];
        if (Math.abs(y - py) > 0.01) {
          var dy = Math.abs(y - py), mid = (px + x) / 2;
          if (t.join && c === t.lastCol) { // 汇流：斜线放在最后，紧贴汇流站，前面留水平段
            pts.push([x - P.run - dy, py]);
            pts.push([x - P.run, y]);
          } else {
            pts.push([mid - dy / 2, py]);
            pts.push([mid + dy / 2, y]);
          }
        }
        pts.push([x, y]);
      }
      var start = null, end = null;
      if (t.kind === "trunk") start = { x: pts[0][0] - P.badgeOffset, y: pts[0][1] };
      var lastNode = t.nodes[t.nodes.length - 1];
      var forksAtEnd = m.tracks.some(function (u) { return u.fork === lastNode && u.lineId === t.lineId; });
      if (!forksAtEnd && !t.join) end = { x: pts[pts.length - 1][0] + P.badgeOffset, y: pts[pts.length - 1][1] };
      return { key: t.key, lineId: t.lineId, branchId: t.branchId, kind: t.kind, code: t.code, name: t.name,
        color: t.color, textOn: t.textOn, continues: t.continues, nodes: t.nodes.slice(), more: t.more || 0,
        join: t.join || null, stageName: t.stageName || "",
        points: simplify(pts), start: start, end: end };
    });
    // 起点徽标：先水平向左；压到别的线或别的徽标就试 45° 左上 / 左下；都不行就不画
    var placedBadges = [];
    tracks.forEach(function (t) {
      if (!t.start) return;
      var fp = t.points[0], o = P.badgeOffset, rad = P.badgeR + P.stroke / 2 + 3;
      var opts = [[fp[0] - o, fp[1], null]];
      [0.7, 1.2, 1.8].forEach(function (k) {
        opts.push([fp[0] - o * 0.5 - o * k, fp[1] - o * k, [fp[0] - o * 0.5, fp[1]]]);
        opts.push([fp[0] - o * 0.5 - o * k, fp[1] + o * k, [fp[0] - o * 0.5, fp[1]]]);
      });
      t.start = null;
      for (var i = 0; i < opts.length; i++) {
        var c = opts[i];
        var stub = c[2] ? [[c[0], c[1]], c[2], fp] : [[c[0], c[1]], fp];
        var hit = tracks.some(function (u) {
          return u.key !== t.key && (polyHitsCircle(u.points, c[0], c[1], rad) ||
            (u.startStub && polyHitsCircle(u.startStub, c[0], c[1], rad)) ||
            stub.some(function (p, k) { return k > 0 && k < stub.length - 1 && segHitsPoly(stub[k - 1], p, u.points, P.stroke + 2); }) ||
            segHitsPoly(stub[0], stub[1], u.points, P.stroke + 2));
        }) || placedBadges.some(function (b) { return Math.hypot(b[0] - c[0], b[1] - c[1]) < 2 * P.badgeR + 6; });
        if (!hit) { t.start = { x: c[0], y: c[1], via: c[2], box: circleBox(c[0], c[1], P.badgeR) }; t.startStub = stub; placedBadges.push([c[0], c[1]]); break; }
      }
    });
    var endBoxes = [], endStubs = [];
    // 终点徽标：先水平延伸；压到别的线就试 45° 下 / 上；都不行就不画延伸，终点站本身做终点
    tracks.forEach(function (t) {
      if (!t.end) return;
      var lp = t.points[t.points.length - 1], o = P.badgeOffset, rad = P.badgeR + P.stroke / 2 + 3;
      var opts = [[lp[0] + o, lp[1], null], [lp[0] + o * 0.5 + o * 0.7, lp[1] + o * 0.7, [lp[0] + o * 0.5, lp[1]]],
        [lp[0] + o * 0.5 + o * 0.7, lp[1] - o * 0.7, [lp[0] + o * 0.5, lp[1]]],
        [lp[0] + o * 0.5 + o * 1.2, lp[1] + o * 1.2, [lp[0] + o * 0.5, lp[1]]],
        [lp[0] + o * 0.5 + o * 1.2, lp[1] - o * 1.2, [lp[0] + o * 0.5, lp[1]]],
        [lp[0] + o * 0.5 + o * 1.8, lp[1] + o * 1.8, [lp[0] + o * 0.5, lp[1]]],
        [lp[0] + o * 0.5 + o * 1.8, lp[1] - o * 1.8, [lp[0] + o * 0.5, lp[1]]],
        [lp[0] + o * 2, lp[1], null]];
      // 几条线在同一个换乘站结束：最上面的优先向右上，最下面的优先向右下
      var lastN = t.nodes[t.nodes.length - 1];
      var sameEnd = tracks.filter(function (u) { return u.end !== undefined && u.nodes[u.nodes.length - 1] === lastN && u.points.length; });
      if (sameEnd.length > 1) {
        var ys = sameEnd.map(function (u) { return u.points[u.points.length - 1][1]; });
        var dir = lp[1] <= Math.min.apply(null, ys) ? -1 : lp[1] >= Math.max.apply(null, ys) ? 1 : 0;
        if (dir) opts.sort(function (a, b) {
          var da = Math.sign(a[1] - lp[1]) === dir ? 0 : 1, db = Math.sign(b[1] - lp[1]) === dir ? 0 : 1;
          return da - db;
        });
      }
      t.end = null;
      var cap = null;
      if (t.kind === "tail") {
        var ttext = t.code + " 终点 · " + (t.stageName || "");
        cap = { text: ttext, w: Math.ceil(measure(ttext, FONTS.cap, FONTS.family)) + 30, h: 2 * P.badgeR + 6, terminal: true };
      } else if (t.more) {
        var ctext = t.code + " +" + t.more + " 站";
        var cw = Math.ceil(measure(ctext, FONTS.cap, FONTS.family)) + 18, ch = 2 * P.badgeR;
        cap = { text: ctext, w: cw, h: ch };
      }
      for (var i = 0; i < opts.length; i++) {
        var c = opts[i];
        var stub = c[2] ? [lp, c[2], [c[0], c[1]]] : [lp, [c[0], c[1]]];
        var box = cap ? { x: c[0] - cap.h / 2, y: c[1] - cap.h / 2, r: c[0] - cap.h / 2 + cap.w, b: c[1] + cap.h / 2 } : null;
        var hit = tracks.some(function (u) {
          return u.key !== t.key && ((box ? polyHitsRect(u.points, box, P.stroke / 2 + 3) : polyHitsCircle(u.points, c[0], c[1], rad)) ||
            stub.some(function (p, k) { return k > 0 && segHitsPoly(stub[k - 1], p, u.points, P.stroke + 2); }));
        }) || endBoxes.some(function (bx) { return rectsOverlap(bx, box || circleBox(c[0], c[1], P.badgeR), 4) || polyHitsRect(stub.slice(1), bx, P.stroke / 2 + 3); })
          || endStubs.some(function (st2) {
            return (box ? polyHitsRect(st2, box, P.stroke / 2 + 3) : polyHitsCircle(st2, c[0], c[1], rad)) ||
              stub.some(function (p, k) { return k > 0 && segHitsPoly(stub[k - 1], p, st2, P.stroke + 2); });
          });
        if (!hit) {
          t.end = { x: c[0], y: c[1], via: c[2] };
          if (cap) { t.end.cap = { text: cap.text, w: cap.w, h: cap.h, box: box, textX: box.x + cap.w / 2, terminal: !!cap.terminal }; }
          t.end.box = box || circleBox(c[0], c[1], P.badgeR);
          endBoxes.push(t.end.box); endStubs.push(stub);
          break;
        }
      }
    });
    tracks.forEach(function (t) {
      var pts = t.points.slice();
      if (t.start) { if (t.start.via) pts.unshift(t.start.via); pts.unshift([t.start.x, t.start.y]); }
      if (t.end) { if (t.end.via) pts.push(t.end.via); pts.push([t.end.x, t.end.y]); }
      t.drawPoints = simplify(pts);
      t.d = roundedPath(t.drawPoints, P.cornerR);
      t.arrows = arrows(t, X, m, P).filter(function (a) { return !(t.mid && a.x > t.mid.box.x - 14 && a.x < t.mid.box.r + 14); });
    });
    var mergeAt = {}, terminalAt = {}, moreAt = {};
    tracks.forEach(function (t) {
      if (t.join) mergeAt[t.join] = true;
      if (t.kind === "tail") terminalAt[t.nodes[t.nodes.length - 1]] = t.key;
      // 汇流支线的「+N 站」不再画在线尾（线尾已汇入终点），改成挂在该支线最后一个代表站标签里的一行线色小胶囊
      if (t.join && t.more) { moreAt[t.nodes[t.nodes.length - 2]] = { text: t.code + " +" + t.more + " 站", track: t.key, color: t.color, textOn: t.textOn }; t.moreOnLabel = t.nodes[t.nodes.length - 2]; }
      if (t.kind === "tail" && t.more) { var tl = t.nodes[t.nodes.length - 1]; moreAt[tl] = { text: t.code + " " + (t.stageName || "") + " +" + t.more + " 站", track: t.key, color: t.color, textOn: t.textOn }; t.moreOnLabel = tl; }
    });

    var stations = Object.keys(m.nodes).map(function (rid) {
      var n = m.nodes[rid];
      var ys = n.tracks.map(function (k) { return Y[k][n.col] + oy; });
      var y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
      var r = m.resources[rid] || {};
      var marker = n.interchange
        ? { kind: "interchange", x: X[n.col], y0: y0, y1: y1, r: P.pillR,
            box: { x: X[n.col] - P.pillR, y: y0 - P.pillR, r: X[n.col] + P.pillR, b: y1 + P.pillR } }
        : terminalAt[rid]
        ? { kind: "terminal", x: X[n.col], y0: y0, y1: y1, r: P.stationR + 3.5,
            box: { x: X[n.col] - P.stationR - 3.5, y: y0 - P.stationR - 3.5, r: X[n.col] + P.stationR + 3.5, b: y0 + P.stationR + 3.5 } }
        : { kind: "stop", x: X[n.col], y0: y0, y1: y1, r: P.stationR,
            box: { x: X[n.col] - P.stationR, y: y0 - P.stationR, r: X[n.col] + P.stationR, b: y0 + P.stationR } };
      var codes = n.lines.map(function (l) { return n.codes[l]; });
      return { id: rid, name: r.short || rid, fullName: r.short || rid, title: r.title, stage: n.stage, col: n.col, x: X[n.col], y: (y0 + y1) / 2,
        lines: n.lines.slice(), tracks: n.tracks.slice(), codes: n.codes, interchange: n.interchange,
        codeLabel: n.interchange ? "" : codes[0], marker: marker, merge: !!mergeAt[rid], terminal: !!terminalAt[rid], more: moreAt[rid] || null,
        forkOf: m.tracks.filter(function (t) { return t.fork === rid; }).map(function (t) { return t.key; }) };
    });

    // 分区
    var lastX = X[X.length - 1];
    var zones = m.stages.map(function (s, si) {
      var a = m.zoneStart[si], b = m.zoneEnd[si];
      var x0 = si === 0 ? 0 : (X[a - 1] + X[a]) / 2;
      var x1 = si === m.stages.length - 1 ? null : (X[b] + X[b + 1]) / 2;
      var terminal = m.tracks.some(function (t) { return t.kind === "tail" && t.stages[0] === s.id; });
      return { id: s.id, name: s.name, en: s.en, label: zoneLabel(s, terminal), index: si, x0: x0, x1: x1, colStart: a, colEnd: b, terminal: terminal };
    });
    return { X: X, oy: oy, tracks: tracks, stations: stations, zones: zones, lastX: lastX };
  }

  function simplify(pts) {
    var out = [];
    pts.forEach(function (p) {
      if (out.length && Math.abs(out[out.length - 1][0] - p[0]) < 0.01 && Math.abs(out[out.length - 1][1] - p[1]) < 0.01) return;
      out.push(p);
      while (out.length >= 3) {
        var a = out[out.length - 3], b = out[out.length - 2], c = out[out.length - 1];
        var cr = (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]);
        if (Math.abs(cr) < 0.01) out.splice(out.length - 2, 1); else break;
      }
    });
    return out;
  }
  function roundedPath(pts, r) {
    if (!pts.length) return "";
    var d = "M" + f(pts[0][0]) + " " + f(pts[0][1]);
    for (var i = 1; i < pts.length - 1; i++) {
      var p = pts[i], a = pts[i - 1], b = pts[i + 1];
      var la = Math.hypot(p[0] - a[0], p[1] - a[1]), lb = Math.hypot(b[0] - p[0], b[1] - p[1]);
      var t = Math.min(r, la / 2, lb / 2);
      var p1 = [p[0] + (a[0] - p[0]) * t / la, p[1] + (a[1] - p[1]) * t / la];
      var p2 = [p[0] + (b[0] - p[0]) * t / lb, p[1] + (b[1] - p[1]) * t / lb];
      d += " L" + f(p1[0]) + " " + f(p1[1]) + " Q" + f(p[0]) + " " + f(p[1]) + " " + f(p2[0]) + " " + f(p2[1]);
    }
    var z = pts[pts.length - 1];
    d += " L" + f(z[0]) + " " + f(z[1]);
    return d;
  }
  function f(v) { return Math.round(v * 10) / 10; }

  /* 方向箭头：放在相邻两站之间最长的水平直段中点 */
  function arrows(t, X, m, P) {
    var out = [], pts = t.points;
    for (var i = 0; i + 1 < pts.length; i++) {
      var a = pts[i], b = pts[i + 1];
      if (Math.abs(a[1] - b[1]) > 0.01) continue;
      var len = b[0] - a[0];
      if (len < 48) continue;
      // 不压在站上：中点到最近列 ≥ 20
      var mx = (a[0] + b[0]) / 2;
      var near = X.some(function (x) { return Math.abs(x - mx) < 20; });
      if (near) continue;
      out.push({ x: mx, y: a[1] });
    }
    // 每条线最多隔一个放一个
    return out.filter(function (_, i) { return i % 2 === 0; });
  }

  /* ---------- 碰撞几何 ---------- */
  function segRectDist(ax, ay, bx, by, R) {
    if (segIntersectsRect(ax, ay, bx, by, R)) return 0;
    var d = Math.min(ptRectDist(ax, ay, R), ptRectDist(bx, by, R));
    [[R.x, R.y], [R.r, R.y], [R.x, R.b], [R.r, R.b]].forEach(function (c) { d = Math.min(d, ptSegDist(c[0], c[1], ax, ay, bx, by)); });
    return d;
  }
  function ptRectDist(x, y, R) {
    var dx = Math.max(R.x - x, 0, x - R.r), dy = Math.max(R.y - y, 0, y - R.b);
    return Math.hypot(dx, dy);
  }
  function ptSegDist(px, py, ax, ay, bx, by) {
    var vx = bx - ax, vy = by - ay, L = vx * vx + vy * vy;
    var t = L ? Math.max(0, Math.min(1, ((px - ax) * vx + (py - ay) * vy) / L)) : 0;
    return Math.hypot(px - (ax + t * vx), py - (ay + t * vy));
  }
  function segIntersectsRect(ax, ay, bx, by, R) {
    if (inRect(ax, ay, R) || inRect(bx, by, R)) return true;
    var e = [[R.x, R.y, R.r, R.y], [R.r, R.y, R.r, R.b], [R.r, R.b, R.x, R.b], [R.x, R.b, R.x, R.y]];
    return e.some(function (s) { return segSeg(ax, ay, bx, by, s[0], s[1], s[2], s[3]); });
  }
  function inRect(x, y, R) { return x >= R.x && x <= R.r && y >= R.y && y <= R.b; }
  function segSeg(a, b, c, d, e, f2, g, h) {
    function o(px, py, qx, qy, rx, ry) { var v = (qy - py) * (rx - qx) - (qx - px) * (ry - qy); return v > 0 ? 1 : v < 0 ? -1 : 0; }
    var o1 = o(a, b, c, d, e, f2), o2 = o(a, b, c, d, g, h), o3 = o(e, f2, g, h, a, b), o4 = o(e, f2, g, h, c, d);
    return o1 !== o2 && o3 !== o4;
  }
  function polyHitsRect(pts, R, hw) {
    for (var i = 0; i + 1 < pts.length; i++)
      if (segRectDist(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], R) < hw) return true;
    return false;
  }
  function polyHitsCircle(pts, cx, cy, rad) {
    for (var i = 0; i + 1 < pts.length; i++)
      if (ptSegDist(cx, cy, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]) < rad) return true;
    return false;
  }
  function segHitsPoly(a, b, pts, minD) {
    for (var i = 0; i + 1 < pts.length; i++) {
      var p = pts[i], q = pts[i + 1];
      if (segSeg(a[0], a[1], b[0], b[1], p[0], p[1], q[0], q[1])) return true;
      var d = Math.min(ptSegDist(a[0], a[1], p[0], p[1], q[0], q[1]), ptSegDist(b[0], b[1], p[0], p[1], q[0], q[1]),
        ptSegDist(p[0], p[1], a[0], a[1], b[0], b[1]), ptSegDist(q[0], q[1], a[0], a[1], b[0], b[1]));
      if (d < minD && !(Math.hypot(a[0] - p[0], a[1] - p[1]) < 0.5)) return true;
    }
    return false;
  }
  function rectsOverlap(a, b, pad) {
    pad = pad || 0;
    return a.x < b.r + pad && b.x < a.r + pad && a.y < b.b + pad && b.y < a.b + pad;
  }
  function circleBox(x, y, r) { return { x: x - r, y: y - r, r: x + r, b: y + r }; }

  /* =================================================================
   * 6. 标签
   * ================================================================= */
  var CANDS = [
    { id: "N",  v: -1, h: "middle", cost: 0 },
    { id: "S",  v: 1,  h: "middle", cost: 0 },
    { id: "NE", v: -1, h: "start",  cost: 2 },
    { id: "SE", v: 1,  h: "start",  cost: 2 },
    { id: "NW", v: -1, h: "end",    cost: 2 },
    { id: "SW", v: 1,  h: "end",    cost: 2 },
    { id: "E",  v: 0,  h: "start",  cost: 4 },
    { id: "W",  v: 0,  h: "end",    cost: 4 }
  ];
  // 离站更远一档的候选（换乘大站周围线多时用）
  [1, 2].forEach(function (k) {
    ["N", "S", "NE", "SE", "NW", "SW"].forEach(function (id) {
      var b = CANDS.filter(function (c) { return c.id === id; })[0];
      CANDS.push({ id: id + k, v: b.v, h: b.h, cost: b.cost + 6 * k, extra: 12 * k });
    });
  });

  function labelBox(st, cand, P, measure) {
    var F = FONTS;
    if (!st._nameRows) st._nameRows = wrapName(st.name, measure);
    var nameRows = st._nameRows;
    var nameW = Math.max.apply(null, nameRows.map(function (t) { return measure(t, F.name, F.family); }));
    var codeW = st.codeLabel ? measure(st.codeLabel, F.code, F.mono) : 0;
    var moreW = st.more ? Math.ceil(measure(st.more.text, F.cap, F.family)) + 16 : 0, MORE_H = 24;
    var w = Math.ceil(Math.max(nameW, codeW, moreW)) + 2;
    var hasCode = !!st.codeLabel;
    var H = F.name.lineHeight * nameRows.length + (hasCode ? F.code.lineHeight : 0) + (st.more ? MORE_H : 0);
    var mk = st.marker.box;
    var ax, x, y;
    if (cand.v === 0) {
      y = st.y - H / 2;
      if (cand.h === "start") { x = mk.r + P.labelGap + 2; ax = x; } else { x = mk.x - P.labelGap - 2 - w; ax = x + w; }
    } else {
      var ex = cand.extra || 0;
      y = cand.v < 0 ? mk.y - P.labelGap - ex - H : mk.b + P.labelGap + ex;
      if (cand.h === "middle") { x = st.x - w / 2; ax = st.x; }
      else if (cand.h === "start") { x = st.x - 4; ax = x; }
      else { x = st.x + 4 - w; ax = st.x + 4; }
    }
    // 文本行：上方标签「编号在上、站名在下」；其余「站名在上、编号在下」，站名总是贴近站点
    var rows = [], cy = y;
    function pushName() { nameRows.forEach(function (t) { cy += F.name.lineHeight; rows.push({ kind: "name", text: t, baseline: cy - 3.5 }); }); }
    function pushCode() { if (hasCode) { cy += F.code.lineHeight; rows.push({ kind: "code", text: st.codeLabel, baseline: cy - 2.5 }); } }
    function pushMore() {
      if (!st.more) return;
      var px = cand.h === "middle" ? ax - moreW / 2 : cand.h === "start" ? ax : ax - moreW;
      var top = cy + 3; cy += MORE_H;
      rows.push({ kind: "more", text: st.more.text, baseline: top + 14.5, color: st.more.color, textOn: st.more.textOn, track: st.more.track,
        pill: { x: px, y: top, w: moreW, h: MORE_H - 4 }, textX: px + moreW / 2 });
    }
    if (cand.v < 0) { pushMore(); pushCode(); pushName(); } else { pushName(); pushCode(); pushMore(); }
    var anchor = cand.h;
    return { cand: cand.id, anchor: anchor, ax: ax, x: x, y: y, w: w, h: H,
      box: { x: x, y: y, r: x + w, b: y + H }, rows: rows };
  }

  /* 长站名：只折行，绝不截断。先试 1 行，再在空格 / 中英交界 / 汉字之间折 2 行，仍超宽再折 3 行；
     3 行都放不下就接受超过 maxName 的宽度（标签变宽，由避让和放宽重排处理）。 */
  function wrapName(name, measure) {
    var F = FONTS, max = F.maxName;
    var w = function (t) { return measure(t, F.name, F.family); };
    if (w(name) <= max) return [name];
    function cuts(text) {
      var out = [];
      for (var i = 1; i < text.length; i++) {
        var prev = text.charAt(i - 1), next = text.charAt(i);
        var sp = prev === " " || next === " ";
        var cjk = /[\u2e80-\u9fff]/.test(prev) || /[\u2e80-\u9fff]/.test(next);
        var latinInside = /[A-Za-z0-9]/.test(prev) && /[A-Za-z0-9]/.test(next);
        if (latinInside || !(sp || cjk)) continue; // 不拆英文单词
        out.push({ i: i, pen: sp ? 0 : (/[\u2e80-\u9fff]/.test(prev) && /[\u2e80-\u9fff]/.test(next) ? 24 : 8) });
      }
      return out;
    }
    function trim(t) { return t.replace(/^\s+|\s+$/g, ""); }
    var best2 = null;
    cuts(name).forEach(function (c) {
      var a = trim(name.slice(0, c.i)), b = trim(name.slice(c.i));
      if (!a || !b) return;
      var mw = Math.max(w(a), w(b)), sc = mw + c.pen;
      if (!best2 || sc < best2.sc) best2 = { sc: sc, mw: mw, rows: [a, b] };
    });
    if (best2 && best2.mw <= max) return best2.rows;
    var best3 = null, cs = cuts(name);
    for (var x = 0; x < cs.length; x++) for (var y = x + 1; y < cs.length; y++) {
      var r = [trim(name.slice(0, cs[x].i)), trim(name.slice(cs[x].i, cs[y].i)), trim(name.slice(cs[y].i))];
      if (r.some(function (t) { return !t; })) continue;
      var mw3 = Math.max(w(r[0]), w(r[1]), w(r[2])), sc3 = mw3 + cs[x].pen + cs[y].pen;
      if (!best3 || sc3 < best3.sc) best3 = { sc: sc3, mw: mw3, rows: r };
    }
    if (best3 && (!best2 || best3.mw < best2.mw - 8)) return best3.rows;
    return best2 ? best2.rows : [name];
  }

  function placeLabels(m, G, P, measure, width) {
    var obstaclesLines = G.tracks.map(function (t) { return { key: t.key, pts: t.drawPoints }; });
    var markers = G.stations.map(function (s) { return { id: s.id, box: s.marker.box }; });
    var badges = [];
    G.tracks.forEach(function (t) {
      if (t.start) badges.push({ key: t.key, box: t.start.box });
      if (t.end) badges.push({ key: t.key, box: t.end.box });
      if (t.mid) badges.push({ key: t.key, box: t.mid.box });
    });
    var dividers = G.zones.filter(function (z) { return z.x1 != null; }).map(function (z) { return z.x1; });
    var headers = G.zones.map(function (z) { var by = Math.max(24, P.margin.top - 26); return { x: z.x0 + 20, y: by - FONTS.zone.size - 2, r: z.x0 + 20 + Math.max(90, measure(z.label, FONTS.zone, FONTS.family)) + 6, b: by + 5 }; });
    var placed = [];
    var hw = P.stroke / 2 + 2.5;

    function hits(box, selfId) {
      var n = 0;
      obstaclesLines.forEach(function (l) { if (polyHitsRect(l.pts, box, hw)) n++; });
      markers.forEach(function (mk) { if (mk.id !== selfId && rectsOverlap(box, mk.box, 2)) n++; });
      badges.forEach(function (b) { if (rectsOverlap(box, b.box, 2)) n++; });
      placed.forEach(function (p) { if (rectsOverlap(box, p.box, 3)) n++; });
      dividers.forEach(function (x) { if (box.x - 3 < x && x < box.r + 3) n++; });
      headers.forEach(function (h) { if (rectsOverlap(box, h, 2)) n++; });
      if (box.x < 4 || box.y < 4) n++;
      return n;
    }

    // 难的先放：换乘站、分岔站，再按列
    var order = G.stations.slice().sort(function (a, b) {
      var pa = (a.interchange ? 0 : 2) + (a.forkOf.length ? 0 : 1), pb = (b.interchange ? 0 : 2) + (b.forkOf.length ? 0 : 1);
      return pa - pb || a.col - b.col || a.y - b.y;
    });
    var lastSide = {}; // 同一条线上相邻站尽量上下交替
    var conflicts = 0;
    order.forEach(function (st) {
      var prevKey = st.tracks[0];
      var best = null, bestScore = Infinity;
      CANDS.forEach(function (c) {
        var L = labelBox(st, c, P, measure);
        var h = hits(L.box, st.id);
        var alt = 0;
        var nb = neighbourSide(st, prevKey, m, G, lastSide);
        if (nb != null && c.v !== 0 && c.v === nb) alt = 1;
        var score = h * 1000 + c.cost + alt;
        if (score < bestScore) { bestScore = score; best = L; }
      });
      if (bestScore >= 1000) conflicts += Math.floor(bestScore / 1000);
      st.label = best;
      placed.push({ id: st.id, box: best.box });
      lastSide[st.id] = best.cand.charAt(0) === "N" ? -1 : best.cand.charAt(0) === "S" ? 1 : 0;
    });
    return conflicts;
  }
  function neighbourSide(st, trackKey, m, G, lastSide) {
    var t = m.tracks.filter(function (x) { return x.key === trackKey; })[0];
    if (!t) return null;
    var i = t.nodes.indexOf(st.id);
    var prev = t.nodes[i - 1], next = t.nodes[i + 1];
    if (prev && lastSide[prev] != null && lastSide[prev] !== 0) return lastSide[prev];
    if (next && lastSide[next] != null && lastSide[next] !== 0) return lastSide[next];
    return null;
  }

  /* =================================================================
   * 7. 冲突检测（布局结果的独立复核）
   * ================================================================= */
  function detectConflicts(G, P) {
    var out = [];
    var hw = P.stroke / 2 + 1;
    var S = G.stations;
    // 标签 × 标签
    for (var i = 0; i < S.length; i++) for (var j = i + 1; j < S.length; j++) {
      if (rectsOverlap(S[i].label.box, S[j].label.box, 0)) out.push({ type: "label×label", a: S[i].id, b: S[j].id });
    }
    // 标签 × 线
    S.forEach(function (s) {
      G.tracks.forEach(function (t) { if (polyHitsRect(t.drawPoints, s.label.box, hw)) out.push({ type: "label×line", a: s.id, b: t.key }); });
    });
    // 标签 × 站 / 徽标 / 分隔线
    S.forEach(function (s) {
      S.forEach(function (o) { if (o.id !== s.id && rectsOverlap(s.label.box, o.marker.box, 0)) out.push({ type: "label×station", a: s.id, b: o.id }); });
      G.tracks.forEach(function (t) {
        [t.start, t.end, t.mid].forEach(function (b) { if (b && rectsOverlap(s.label.box, b.box, 0)) out.push({ type: "label×badge", a: s.id, b: t.key }); });
      });
      G.zones.forEach(function (z) { if (z.x1 != null && s.label.box.x < z.x1 && z.x1 < s.label.box.r) out.push({ type: "label×divider", a: s.id, b: z.id }); });
    });
    // 站 × 站
    for (i = 0; i < S.length; i++) for (j = i + 1; j < S.length; j++) {
      if (rectsOverlap(S[i].marker.box, S[j].marker.box, 3)) out.push({ type: "station×station", a: S[i].id, b: S[j].id });
    }
    // 站 × 不经过它的线
    S.forEach(function (s) {
      G.tracks.forEach(function (t) {
        if (t.nodes.indexOf(s.id) !== -1) return;
        if (polyHitsRect(t.drawPoints, s.marker.box, hw)) out.push({ type: "station×line", a: s.id, b: t.key });
      });
    });
    // 徽标 × 别的线
    G.tracks.forEach(function (t) {
      [t.start, t.end, t.mid].forEach(function (b) {
        if (!b) return;
        G.tracks.forEach(function (u) {
          if (u.key === t.key) return;
          var hit = b.cap ? polyHitsRect(u.drawPoints, b.box, hw) : polyHitsCircle(u.drawPoints, b.x, b.y, P.badgeR + hw);
          if (hit) out.push({ type: "badge×line", a: t.key, b: u.key });
        });
        G.tracks.forEach(function (u) {
          [u.start, u.end, u.mid].forEach(function (o) { if (o && o !== b && (u.key < t.key || (u.key === t.key && o !== b && b === t.mid)) && rectsOverlap(o.box, b.box, 0)) out.push({ type: "badge×badge", a: t.key, b: u.key }); });
        });
      });
    });
    S.forEach(function (s) {
      var joined = s.label.rows.filter(function (r) { return r.kind === "name"; }).map(function (r) { return r.text; }).join("");
      if (joined.replace(/\s/g, "") !== String(s.fullName).replace(/\s/g, "") || /…/.test(joined) && !/…/.test(s.fullName))
        out.push({ type: "truncation", a: s.id, b: joined });
    });
    G.tracks.forEach(function (t) { if (t.more && !(t.end && t.end.cap) && !t.moreOnLabel) out.push({ type: "cap-missing", a: t.key, b: "+" + t.more }); });
    G.tracks.forEach(function (t) { if (t.kind === "tail" && !(t.end && t.end.cap && t.end.cap.terminal)) out.push({ type: "terminal-missing", a: t.key, b: "终点帽放不下" }); });
    // 汇流支线的 +N 胶囊必须完整落在本线的水平段上
    G.tracks.forEach(function (t) {
      if (!t.mid) return;
      var ok = false, p = t.drawPoints;
      for (var k = 0; k + 1 < p.length; k++) if (Math.abs(p[k][1] - t.mid.y) < 0.6 && Math.abs(p[k + 1][1] - t.mid.y) < 0.6 && Math.min(p[k][0], p[k + 1][0]) <= t.mid.box.x && Math.max(p[k][0], p[k + 1][0]) >= t.mid.box.r) ok = true;
      if (!ok) out.push({ type: "midcap-off-line", a: t.key, b: t.mid.cap.text });
    });
    // 几何约束：只允许水平 / 竖直 / 45°
    G.tracks.forEach(function (t) {
      var p = t.drawPoints;
      for (var k = 0; k + 1 < p.length; k++) {
        var dx = Math.abs(p[k + 1][0] - p[k][0]), dy = Math.abs(p[k + 1][1] - p[k][1]);
        if (!(dx < 0.01 || dy < 0.01 || Math.abs(dx - dy) < 0.6)) out.push({ type: "angle", a: t.key, b: "seg" + k });
      }
    });
    return out;
  }

  /* =================================================================
   * 主入口
   * ================================================================= */
  function layout(data, options) {
    options = options || {};
    var mp = Object.assign({}, data.layoutParams || {}, options.params || {});
    var P = Object.assign({}, DEFAULTS, mp);
    P.margin = Object.assign({}, DEFAULTS.margin, mp.margin || {});
    var measure = options.measure || makeMeasure();
    var m = normalize(data, { lines: options.lines });
    if (m.errors.length) return { ok: false, errors: m.errors, model: m };
    assignColumns(m);
    if (m.errors.length) return { ok: false, errors: m.errors, model: m };

    var tried = [], result = null;
    for (var lvl = 0; lvl < P.relax.length; lvl++) {
      var Q = Object.assign({}, P, { laneSep: P.laneSep + P.relax[lvl][0], colGapMin: P.colGapMin + P.relax[lvl][1] });
      var cands = chooseOrder(m, Q).slice(0, 3);
      for (var ci = 0; ci < cands.length; ci++) {
        var cand = cands[ci];
        var lane = laneIndexes(m, cand.order, cand.sides);
        var Y = sweepRows(m, lane, Q);
        var G = buildGeometry(m, Y, Q, measure);
        placeLabels(m, G, Q, measure);
        var conf = detectConflicts(G, Q);
        tried.push({ level: lvl, order: cand.order.join(","), conflicts: conf.length });
        if (!result || conf.length < result.conflicts.length) result = { G: G, Q: Q, conflicts: conf, order: cand.order, sides: cand.sides, level: lvl };
        if (!conf.length) break;
      }
      if (result && !result.conflicts.length) break;
    }
    var G2 = result.G, Q2 = result.Q;
    // 画布尺寸：包住线、徽标、标签
    var maxX = 0, maxY = 0;
    G2.tracks.forEach(function (t) { t.drawPoints.forEach(function (p) { maxX = Math.max(maxX, p[0] + Q2.badgeR); maxY = Math.max(maxY, p[1] + Q2.badgeR); }); });
    G2.tracks.forEach(function (t) { if (t.end && t.end.box) { maxX = Math.max(maxX, t.end.box.r); maxY = Math.max(maxY, t.end.box.b); } });
    G2.tracks.forEach(function (t) { if (t.mid) { maxX = Math.max(maxX, t.mid.box.r); maxY = Math.max(maxY, t.mid.box.b); } });
    G2.stations.forEach(function (s) { maxX = Math.max(maxX, s.label.box.r); maxY = Math.max(maxY, s.label.box.b, s.marker.box.b); });
    var width = Math.ceil(maxX + Q2.margin.right), height = Math.ceil(maxY + Q2.margin.bottom);
    G2.zones.forEach(function (z) { if (z.x1 == null) z.x1end = width; });
    G2.zones.forEach(function (z) { z.w = (z.x1 != null ? z.x1 : width) - z.x0; });

    var byId = {};
    G2.stations.forEach(function (s) { byId[s.id] = s; });
    // 无字竖带：任何标签、徽标、终点帽、段标题都不跨过的 x 区间。横向滚动框的左右边缘落在这里就不会切开文字
    var iv = [];
    G2.stations.forEach(function (s) { iv.push([s.label.box.x, s.label.box.r]); });
    G2.tracks.forEach(function (t) { [t.start, t.end, t.mid].forEach(function (b) { if (b && b.box) iv.push([b.box.x, b.box.r]); }); });
    G2.zones.forEach(function (z) { iv.push([z.x0 + 18, z.x0 + 22 + measure(z.label, FONTS.zone, FONTS.family)]); });
    iv.sort(function (a, b) { return a[0] - b[0]; });
    var cuts = [], cur = 0;
    iv.forEach(function (q) { if (q[0] - cur >= 12) cuts.push([Math.ceil(cur + 4), Math.floor(q[0] - 4)]); cur = Math.max(cur, q[1]); });
    if (width - cur >= 8) cuts.push([Math.ceil(cur + 4), width]);
    return {
      ok: true, width: width, height: height, params: Q2, fonts: FONTS,
      zones: G2.zones, tracks: G2.tracks, stations: G2.stations, stationById: byId,
      columns: G2.X, conflicts: result.conflicts, cuts: cuts,
      meta: { lineOrder: result.order, sides: result.sides, relaxLevel: result.level, tried: tried },
      model: m
    };
  }

  /* 某条线（可选某条支线）的完整路线：给线路页、移动端竖线、进度用 */
  function route(model, lineId, branchId) {
    var lm = model.lines.filter(function (l) { return l.id === lineId; })[0];
    if (!lm) return null;
    var b = branchId ? lm.branches.filter(function (t) { return t.branchId === branchId; })[0] : null;
    if (branchId && !b) return null;
    var trunkNodes = lm.trunk.nodes;
    var cut = b ? trunkNodes.indexOf(b.fork) : trunkNodes.length - 1;
    var seq = [];
    trunkNodes.slice(0, cut + 1).forEach(function (rid, i) { seq.push({ id: rid, stage: lm.trunk.stages[i], track: lm.trunk.key, code: model.nodes[rid].codes[lineId] }); });
    if (b) b.nodes.slice(1).forEach(function (rid, i) { if (b.join && rid === b.join && i === b.nodes.length - 2) return; seq.push({ id: rid, stage: b.stages[i + 1], track: b.key, code: model.nodes[rid].codes[lineId] }); });
    if (lm.tail) lm.tail.nodes.forEach(function (rid, i) { seq.push({ id: rid, stage: lm.tail.stages[i], track: lm.tail.key, code: model.nodes[rid].codes[lineId], terminal: i === lm.tail.nodes.length - 1 }); });
    seq.forEach(function (s) {
      var n = model.nodes[s.id];
      s.otherLines = n.lines.filter(function (l) { return l !== lineId; });
      s.forks = lm.branches.filter(function (t) { return t.fork === s.id; }).map(function (t) { return t.branchId; });
    });
    return { line: lm, branch: b, stops: seq };
  }

  /* 首页概览：主干全画；每条支线只留代表站（featured: true；没有就每段第一个）+ 所有换乘站 + opts.include；
     被省掉的站数记在 branch.more，布局在支线末端画「A1 +N 站」终点帽 */
  function overview(data, opts) {
    opts = opts || {};
    var include = {};
    (opts.include || []).forEach(function (id) { include[id] = true; });
    var linesOf = {};
    (data.lines || []).forEach(function (l) {
      var all = [].concat.apply([], Object.keys(l.trunk || {}).map(function (k) { return l.trunk[k]; }));
      (l.branches || []).forEach(function (b) { Object.keys(b.stops || {}).forEach(function (k) { all = all.concat(b.stops[k]); }); });
      all.forEach(function (id) { (linesOf[id] = linesOf[id] || {})[l.id] = true; });
    });
    var res = data.resources || {};
    var out = Object.assign({}, data);
    out.lines = (data.lines || []).map(function (l) {
      var nl = Object.assign({}, l);
      nl.branches = (l.branches || []).map(function (b) {
        var ids = [];
        (data.stages || []).forEach(function (s) { (b.stops[s.id] || []).forEach(function (id) { ids.push({ id: id, stage: s.id }); }); });
        var bf = b.featured && b.featured.length ? b.featured : null;
        var isFeat = function (id) { return bf ? bf.indexOf(id) !== -1 : !!(res[id] && res[id].featured); };
        var hasFeatured = ids.some(function (x) { return isFeat(x.id); });
        var firstOfStage = {};
        var keep = ids.filter(function (x) {
          var first = !firstOfStage[x.stage]; firstOfStage[x.stage] = true;
          var inter = Object.keys(linesOf[x.id] || {}).length > 1;
          var rep = hasFeatured ? isFeat(x.id) : first;
          return rep || inter || include[x.id];
        });
        var stops = {};
        keep.forEach(function (x) { (stops[x.stage] = stops[x.stage] || []).push(x.id); });
        return Object.assign({}, b, { stops: stops, more: ids.length - keep.length, total: ids.length });
      });
      // 汇流终点段（主干上晚于所有支线的分段，如「面试」）：概览只留首站（汇流站）、换乘站、末站（终点），其余计入 tailMore
      var stIdx = {}; (data.stages || []).forEach(function (s, i) { stIdx[s.id] = i; });
      var maxB = -1;
      (l.branches || []).forEach(function (b) { Object.keys(b.stops || {}).forEach(function (k) { if ((b.stops[k] || []).length) maxB = Math.max(maxB, stIdx[k]); }); });
      if (maxB >= 0 && !opts.fullTail) {
        var trunk = {}, removed = 0;
        Object.keys(l.trunk || {}).forEach(function (k) {
          if (stIdx[k] <= maxB) { trunk[k] = l.trunk[k]; return; }
          var lst = l.trunk[k] || [];
          trunk[k] = lst.filter(function (id, i) {
            var keepIt = i === 0 || i === lst.length - 1 || Object.keys(linesOf[id] || {}).length > 1 || include[id];
            if (!keepIt) removed++;
            return keepIt;
          });
        });
        nl.trunk = trunk; nl.tailMore = removed;
      }
      return nl;
    });
    // 概览图更紧凑一点，让 1:1（不缩放）的首页图在 1440 宽下放得进地图框
    out.layoutParams = Object.assign({ colGapMin: 88, margin: { top: 64, right: 32, bottom: 40, left: 40 } }, opts.params || {});
    return out;
  }

  return { layout: layout, normalize: normalize, route: route, overview: overview, textOn: textOn, contrast: contrast,
    FONTS: FONTS, DEFAULTS: DEFAULTS, detectConflicts: detectConflicts };
});

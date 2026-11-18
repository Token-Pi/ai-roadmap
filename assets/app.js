/* ==========================================================================
   assets/app.js — Shared Header, State Management & Page Renderers (v3)
   ========================================================================== */
(function (global) {
  "use strict";

  var M = global.MetroMapUI;
  var esc = M ? M.esc : function (s) { return String(s == null ? "" : s); };

  function isTestMode() {
    return /[?&]data=test\b/.test(location.search);
  }

  function stateOverride() {
    try {
      return new URLSearchParams(location.search).get("state");
    } catch (e) {
      return null;
    }
  }

  function queryParam(name) {
    try {
      return new URLSearchParams(location.search).get(name);
    } catch (e) {
      return null;
    }
  }

  function withTest(url) {
    if (!isTestMode()) return url;
    var parts = url.split("#");
    var base = parts[0];
    var hash = parts[1] ? "#" + parts[1] : "";
    if (/[?&]data=test\b/.test(base)) return url;
    var sep = base.indexOf("?") >= 0 ? "&" : "?";
    return base + sep + "data=test" + hash;
  }

  function pageUrl(file, params, hash) {
    var qs = [];
    if (params) {
      Object.keys(params).forEach(function (k) {
        if (params[k] != null && params[k] !== "") {
          qs.push(encodeURIComponent(k) + "=" + encodeURIComponent(params[k]));
        }
      });
    }
    if (isTestMode()) qs.push("data=test");
    var url = "./" + file + (qs.length ? "?" + qs.join("&") : "");
    if (hash) url += "#" + encodeURIComponent(hash);
    return url;
  }

  /* ========================================================================
     LocalStorage Progress & Branch Preferences
     ======================================================================== */
  function getProgress(lineId) {
    try {
      var raw = localStorage.getItem("alp:v3:progress:" + lineId);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function saveProgress(lineId, arr) {
    try {
      localStorage.setItem("alp:v3:progress:" + lineId, JSON.stringify(arr));
    } catch (e) {}
  }

  function toggleProgress(lineId, resId) {
    var arr = getProgress(lineId);
    var idx = arr.indexOf(resId);
    if (idx >= 0) arr.splice(idx, 1);
    else arr.push(resId);
    saveProgress(lineId, arr);
    return arr;
  }

  function getSavedBranch(lineId) {
    try {
      return localStorage.getItem("alp:v3:branch:" + lineId);
    } catch (e) {
      return null;
    }
  }

  function saveBranch(lineId, branchId) {
    try {
      localStorage.setItem("alp:v3:branch:" + lineId, branchId);
    } catch (e) {}
  }

  /* ========================================================================
     Data Helpers
     ======================================================================== */
  function lineColor(data, line, idx) {
    if (line.color) return line.color;
    var pal = (data && data.palette) || ["#8E44AD", "#D35400", "#16A085"];
    return pal[idx % pal.length];
  }

  function textOn(hex) {
    if (global.MetroLayout && global.MetroLayout.textOn) {
      return global.MetroLayout.textOn(hex);
    }
    return "#FFFFFF";
  }

  function getTransfersForStop(data, resId) {
    if (!data || !data.transfers) return [];
    return data.transfers.filter(function (t) {
      return Array.isArray(t.stops) && t.stops.indexOf(resId) >= 0;
    });
  }

  function getConnectedLinesForTransfer(model, transfer) {
    var seen = {};
    var out = [];
    if (!model || !transfer || !transfer.stops) return out;
    transfer.stops.forEach(function (rid) {
      var node = model.nodes[rid];
      if (!node) return;
      node.lines.forEach(function (lid) {
        if (!seen[lid]) {
          seen[lid] = true;
          out.push(lid);
        }
      });
    });
    return out;
  }

  function getStageObj(data, stageId) {
    if (!data || !data.stages) return { id: stageId, name: stageId, en: "" };
    return data.stages.filter(function (s) { return s.id === stageId; })[0] || { id: stageId, name: stageId, en: "" };
  }

  function renderResourceTags(data, res) {
    var typeLabel = (data.typeLabels && data.typeLabels[res.type]) || res.type || "资源";
    var html = '<span class="tag">' + esc(typeLabel) + "</span>";
    if (res.free === true) html += '<span class="tag">免费</span>';
    else if (res.free === false) html += '<span class="tag">付费</span>';
    if (res.lang && data.langLabels && data.langLabels[res.lang]) {
      html += '<span class="tag">' + esc(data.langLabels[res.lang]) + "</span>";
    }
    if (res.era) {
      html += '<span class="tag tag--era">' + esc(res.era) + "</span>";
    }
    return html;
  }

  function formatGithub(gh) {
    if (!gh || typeof gh.stars !== "number") return "";
    var starsStr = gh.stars >= 1000 ? (gh.stars / 1000).toFixed(1) + "k" : String(gh.stars);
    return "GitHub ★ " + starsStr + (gh.last_commit ? " · 最近提交 " + gh.last_commit : "");
  }

  function findStopBranch(lm, rid) {
    if (!lm || !lm.branches) return null;
    for (var i = 0; i < lm.branches.length; i++) {
      if (lm.branches[i].nodes.slice(1).indexOf(rid) >= 0) {
        return lm.branches[i].branchId;
      }
    }
    return null;
  }

  /* ========================================================================
     Header & Footer Shell
     ======================================================================== */
  function renderShell(data, pageType) {
    var protoEl = document.getElementById("proto-bar");
    if (protoEl) {
      if (isTestMode()) {
        protoEl.style.display = "";
        protoEl.innerHTML =
          '<span class="proto-bar__note">' +
          esc("测试数据 · 多 1 条主线和 3 条支线，只用来验证自动排布") +
          "</span>" +
          '<div class="proto-bar__links">' +
          '<a href="' + esc(pageUrl("about.html")) + '">关于</a>' +
          "</div>";
      } else {
        protoEl.style.display = "none";
        protoEl.innerHTML = "";
      }
    }

    var headerEl = document.getElementById("site-header");
    if (headerEl) {
      var legendHtml = "";
      if (data && Array.isArray(data.lines)) {
        var lineItems = data.lines.map(function (l, i) {
          var col = lineColor(data, l, i);
          var fg = textOn(col);
          return (
            '<a class="legend-item" data-legend-line="' + esc(l.id) + '" href="' +
            esc(pageUrl("line.html", { line: l.id })) + '" title="' + esc(l.name) + '" aria-label="' + esc(l.code + " " + l.name) + '">' +
            '<span class="line-badge line-badge--sm" style="background:' + esc(col) + ";color:" + esc(fg) + '">' +
            esc(l.code) + "</span>" +
            '<span class="legend-item__label">' + esc(l.name) + "</span></a>"
          );
        }).join("");

        var transferItems = (data.transfers || []).map(function (t) {
          return (
            '<a class="legend-item" data-legend-transfer="' + esc(t.id) + '" href="' +
            esc(pageUrl("transfer.html", { t: t.id })) + '" title="' + esc(t.name) + '" aria-label="' + esc(t.code + " " + t.name) + '">' +
            '<span class="transfer-badge">' + esc(t.code) + "</span>" +
            '<span class="legend-item__label">' + esc(t.name) + "</span></a>"
          );
        }).join("");

        legendHtml =
          '<nav class="header-legend" aria-label="线路与专题图例">' +
          '<div class="legend-group">' + lineItems + "</div>" +
          (transferItems ? '<span class="legend-sep" aria-hidden="true"></span><div class="legend-group">' + transferItems + "</div>" : "") +
          "</nav>";
      }

      headerEl.innerHTML =
        '<div class="site-header__inner">' +
        '<a class="brand" href="' + esc(pageUrl("index.html")) + '">' +
        '<span class="brand__title">AI 学习路线</span>' +
        '<span class="brand__sub">AI LEARNING TRANSIT</span>' +
        "</a>" +
        legendHtml +
        "</div>";
    }

    var footerEl = document.getElementById("site-footer");
    if (footerEl) {
      footerEl.innerHTML =
        "<span>AI 学习路线 · Token Pi</span>" +
        '<nav class="site-footer__nav" aria-label="页脚导航">' +
        '<a href="' + esc(pageUrl("index.html")) + '">全网线路图</a>' +
        '<a href="' + esc(pageUrl("about.html")) + '">关于本站</a>' +
        "</nav>";
    }
  }

  /* ========================================================================
     States: Loading / Error / Empty
     ======================================================================== */
  function renderLoading(container) {
    container.innerHTML =
      '<div class="state-panel" role="status" aria-live="polite">' +
      '<div class="state-panel__code">LOADING · TRANSIT</div>' +
      '<h1 class="state-panel__title">正在排布线路图</h1>' +
      '<p class="state-panel__desc">正在加载字体并计算站点与换乘坐标…</p>' +
      '<div class="skeleton-track" aria-hidden="true">' +
      '<span class="skeleton-dot"></span><span class="skeleton-line"></span>' +
      '<span class="skeleton-dot"></span><span class="skeleton-line"></span>' +
      '<span class="skeleton-dot"></span><span class="skeleton-line"></span>' +
      '<span class="skeleton-dot"></span>' +
      "</div>" +
      '<div class="skeleton-bars" aria-hidden="true">' +
      '<div class="skeleton-bar" style="width:76%"></div>' +
      '<div class="skeleton-bar" style="width:52%"></div>' +
      "</div></div>";
  }

  function renderError(container, errors) {
    var list = (errors && errors.length ? errors : ["未知布局错误"]).map(function (e) {
      return "<li>" + esc(e) + "</li>";
    }).join("");
    container.innerHTML =
      '<div class="state-panel" role="alert">' +
      '<div class="state-panel__code state-panel__code--error">ERROR · LAYOUT</div>' +
      '<h1 class="state-panel__title">线路图排布失败</h1>' +
      '<p class="state-panel__desc">请检查线路与分段的顺序约束：</p>' +
      '<ul class="state-panel__errors">' + list + "</ul>" +
      '<div class="state-panel__links">' +
      '<a class="btn btn--primary" href="' + esc(pageUrl("index.html")) + '">返回全网线路图</a>' +
      "</div></div>";
  }

  function renderEmpty(container, data, title, desc, codeLabel) {
    var lineLinks = "";
    if (data && Array.isArray(data.lines)) {
      lineLinks = data.lines.map(function (l, i) {
        var col = lineColor(data, l, i);
        var fg = textOn(col);
        return (
          '<a class="btn" href="' + esc(pageUrl("line.html", { line: l.id })) + '">' +
          '<span class="line-badge line-badge--sm" style="background:' + esc(col) + ";color:" + esc(fg) + '">' +
          esc(l.code) + "</span>" +
          "<span>" + esc(l.name) + "</span></a>"
        );
      }).join("");
    }
    container.innerHTML =
      '<div class="state-panel">' +
      '<div class="state-panel__code">' + esc(codeLabel || "EMPTY · NO ROUTE") + "</div>" +
      '<h1 class="state-panel__title">' + esc(title) + "</h1>" +
      '<p class="state-panel__desc">' + esc(desc) + "</p>" +
      '<div class="state-panel__links">' +
      '<a class="btn btn--primary" href="' + esc(pageUrl("index.html")) + '">返回全网线路图</a>' +
      "</div>" +
      (lineLinks ? '<div class="state-panel__alt"><span class="state-panel__alt-label">主线直达：</span>' + lineLinks + "</div>" : "") +
      "</div>";
  }

  /* ========================================================================
     Font Readiness
     ======================================================================== */
  function waitForFonts() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    return Promise.all([
      document.fonts.load('600 13px "ALP Serif SC"', "站名").catch(function () {}),
      document.fonts.load('400 16px "ALP Serif SC"', "正文").catch(function () {}),
      document.fonts.load('600 26px "ALP Fraunces"', "AI").catch(function () {}),
      document.fonts.load('500 12px "ALP Mono"', "A01").catch(function () {}),
      document.fonts.ready.catch(function () {})
    ]);
  }

  /* ========================================================================
     Index Page
     ======================================================================== */
  function initIndex(mainEl, data) {
    var R = global.MetroLayout.layout(global.MetroLayout.overview(data));
    if (!R.ok) {
      renderError(mainEl, R.errors);
      return;
    }

    var fullNorm = global.MetroLayout.normalize(data);
    var fullModel = fullNorm.errors.length ? R.model : fullNorm;

    mainEl.innerHTML =
      '<section class="map-section map-desktop" aria-label="全网地铁线路图">' +
      '<div class="map-frame" id="index-map-frame">' +
      '<div class="map-scroll" id="index-map-mount"></div>' +
      '<button type="button" class="map-scroll-hint" hidden>横向滑动 → 面试终点</button>' +
      "</div>" +
      "</section>" +
      '<section class="mobile-lines" id="mobile-lines-mount" aria-label="手机端竖向线路列表"></section>' +
      '<section class="line-strips-section" aria-label="主线列表">' +
      '<h2 class="section-heading">主线 · LINES</h2>' +
      '<div class="strips-grid" id="line-strips-mount"></div>' +
      "</section>" +
      '<section aria-label="换乘专题">' +
      '<h2 class="section-heading">换乘专题 · TRANSFERS</h2>' +
      '<div class="strips-grid" id="transfer-strips-mount"></div>' +
      "</section>" +
      '<div class="station-popover" id="station-popover" role="dialog" aria-modal="false" hidden></div>';

    var mount = document.getElementById("index-map-mount");
    var popover = document.getElementById("station-popover");
    var lastAnchor = null;

    function closePopover(restoreFocus) {
      if (popover.hidden) return;
      popover.hidden = true;
      popover.innerHTML = "";
      if (restoreFocus && lastAnchor && lastAnchor.focus) {
        lastAnchor.focus();
      }
      lastAnchor = null;
    }

    function openPopover(st, anchorEl) {
      var res = data.resources[st.id] || { title: st.name, url: "#", note: "", type: "site" };
      lastAnchor = anchorEl;

      var lineLinks = st.lines.map(function (lid) {
        var lm = fullModel.lines.filter(function (l) { return l.id === lid; })[0];
        if (!lm) return "";
        var code = (fullModel.nodes[st.id] && fullModel.nodes[st.id].codes[lid]) || st.codes[lid] || lm.code;
        var br = findStopBranch(lm, st.id);
        return (
          '<a class="station-popover__link" href="' + esc(pageUrl("line.html", { line: lid, branch: br || undefined }, st.id)) + '">' +
          '<span class="line-badge line-badge--sm" style="background:' + esc(lm.color) + ";color:" + esc(lm.textOn) + '">' +
          esc(lm.code) + "</span>" +
          "<span>" + esc(code) + "</span></a>"
        );
      }).join("");

      var transfers = getTransfersForStop(data, st.id);
      var transferLinks = transfers.map(function (t) {
        return (
          '<a class="station-popover__link" href="' + esc(pageUrl("transfer.html", { t: t.id })) + '">' +
          '<span class="transfer-badge">' + esc(t.code) + "</span>" +
          "<span>" + esc(t.name) + "</span></a>"
        );
      }).join("");

      var ghText = formatGithub(res.github);

      popover.innerHTML =
        '<div class="station-popover__head">' +
        '<span class="station-popover__short">' + esc(st.fullName || st.name) + "</span>" +
        '<button type="button" class="station-popover__close" aria-label="关闭卡片">×</button>' +
        "</div>" +
        '<h3 class="station-popover__title">' + esc(res.title) + "</h3>" +
        '<div class="station-popover__tags">' + renderResourceTags(data, res) + "</div>" +
        (res.note ? '<p class="station-popover__note">' + esc(res.note) + "</p>" : "") +
        '<a class="station-popover__ext" href="' + esc(res.url) + '" target="_blank" rel="noopener">' +
        esc(M.domainOf(res.url)) + " ↗</a>" +
        '<div class="station-popover__meta">' +
        (ghText ? '<div class="station-popover__row"><span class="station-popover__gh">' + esc(ghText) + "</span></div>" : "") +
        '<div class="station-popover__row"><span class="station-popover__label">经过线路：</span>' + lineLinks + "</div>" +
        (transferLinks ? '<div class="station-popover__row"><span class="station-popover__label">换乘专题：</span>' + transferLinks + "</div>" : "") +
        "</div>";

      M.positionPopover(popover, anchorEl);
      var closeBtn = popover.querySelector(".station-popover__close");
      if (closeBtn) {
        closeBtn.addEventListener("click", function () {
          closePopover(true);
        });
      }
    }

    var svg = M.renderMap(mount, R, {
      animate: false,
      minScale: 1,
      enableLineHover: true,
      onTrackClick: function (lineId, branchId) {
        location.href = pageUrl("line.html", { line: lineId, branch: branchId || undefined });
      },
      onStationSelect: function (st, anchorEl) {
        openPopover(st, anchorEl);
      }
    });
    M.syncScrollHint(document.getElementById("index-map-frame"), R);

    document.addEventListener("click", function (e) {
      if (!popover.hidden && !popover.contains(e.target) && !e.target.closest(".ml-station")) {
        closePopover(false);
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !popover.hidden) {
        e.preventDefault();
        closePopover(true);
      }
    });

    // Header legend hover/focus -> highlight line or transfer on map
    document.querySelectorAll("[data-legend-line]").forEach(function (el) {
      var lid = el.getAttribute("data-legend-line");
      el.addEventListener("mouseenter", function () { M.highlightLine(svg, lid); });
      el.addEventListener("focus", function () { M.highlightLine(svg, lid); });
      el.addEventListener("mouseleave", function () { M.clearHighlight(svg); });
      el.addEventListener("blur", function () { M.clearHighlight(svg); });
    });

    document.querySelectorAll("[data-legend-transfer]").forEach(function (el) {
      var tid = el.getAttribute("data-legend-transfer");
      var tObj = (data.transfers || []).filter(function (t) { return t.id === tid; })[0];
      var set = tObj ? new Set(tObj.stops || []) : new Set();
      el.addEventListener("mouseenter", function () { M.highlightTransfer(svg, set); });
      el.addEventListener("focus", function () { M.highlightTransfer(svg, set); });
      el.addEventListener("mouseleave", function () { M.clearHighlight(svg); });
      el.addEventListener("blur", function () { M.clearHighlight(svg); });
    });

    // Mobile vertical metro view (uses overview model for representative branch stops)
    renderMobileLines(document.getElementById("mobile-lines-mount"), data, R.model, fullModel);

    // Line strips & Transfer strips (uses full model for accurate counts)
    renderIndexStrips(data, fullModel);
  }

  function renderMobileLines(container, data, model, fullModel) {
    if (!container) return;
    fullModel = fullModel || model;
    var lineById = {};
    model.lines.forEach(function (l) { lineById[l.id] = l; });
    var fullLineById = {};
    fullModel.lines.forEach(function (l) { fullLineById[l.id] = l; });

    var html = model.lines.map(function (lm) {
      var fullLm = fullLineById[lm.id] || lm;
      var visited = getProgress(lm.id);
      var allLineStops = {};
      fullLm.trunk.nodes.forEach(function (id) { allLineStops[id] = true; });
      if (fullLm.tail) fullLm.tail.nodes.forEach(function (id) { allLineStops[id] = true; });
      fullLm.branches.forEach(function (b) { b.nodes.forEach(function (id) { allLineStops[id] = true; }); });
      var lineTotal = Object.keys(allLineStops).length;
      var lineDone = visited.filter(function (id) { return allLineStops[id]; }).length;

      var stagesHtml = data.stages.map(function (st) {
        var stageStops = [];
        var isTailStage = false;
        lm.trunk.nodes.forEach(function (rid, idx) {
          if (lm.trunk.stages[idx] === st.id) stageStops.push(rid);
        });
        if (!stageStops.length && lm.tail) {
          lm.tail.nodes.forEach(function (rid, idx) {
            if (lm.tail.stages[idx] === st.id) {
              stageStops.push(rid);
              isTailStage = true;
            }
          });
        }
        if (!stageStops.length) return "";

        var itemsHtml = stageStops.map(function (rid, sIdx) {
          var node = model.nodes[rid];
          var res = data.resources[rid] || { short: rid };
          var isInterchange = node.lines.length > 1;
          var isTerminal = isTailStage && sIdx === stageStops.length - 1;
          var others = node.lines.filter(function (ol) { return ol !== lm.id; }).map(function (ol) {
            var olm = lineById[ol];
            return '<span class="line-badge line-badge--sm" style="background:' + esc(olm.color) + ";color:" + esc(olm.textOn) + '">' + esc(olm.code) + "</span>";
          }).join("");

          var forksHere = lm.branches.filter(function (b) { return b.fork === rid; });
          var branchesHtml = forksHere.map(function (b) {
            var fullB = fullLm.branches.filter(function (fb) { return fb.branchId === b.branchId; })[0];
            var bTotal = b.total || (fullB ? fullB.nodes.length - 1 : b.nodes.length - 1);
            var moreCount = typeof b.more === "number" ? b.more : Math.max(0, bTotal - (b.nodes.length - 1));
            var branchStops = b.nodes.slice(1).map(function (brid) {
              var bnode = (fullModel.nodes && fullModel.nodes[brid]) || model.nodes[brid];
              var bres = data.resources[brid] || { short: brid };
              return (
                '<li class="m-stop">' +
                '<div class="m-stop__left">' +
                '<span class="m-stop__dot' + (bnode.lines.length > 1 ? " m-stop__dot--interchange" : "") + '"></span>' +
                '<span class="m-stop__code">' + esc(bnode.codes[lm.id]) + "</span>" +
                '<a class="m-stop__name" href="' + esc(pageUrl("line.html", { line: lm.id, branch: b.branchId }, brid)) + '">' +
                esc(bres.short || brid) + "</a>" +
                "</div></li>"
              );
            }).join("");
            var moreLinkText = moreCount > 0 ? "+" + moreCount + " 站 · 查看全部 →" : "查看该支线 →";
            branchStops +=
              '<li class="m-stop m-stop--more">' +
              '<a class="m-branch-more" href="' + esc(pageUrl("line.html", { line: lm.id, branch: b.branchId })) + '">' +
              esc(moreLinkText) + "</a></li>";
            var panelId = "m-br-" + lm.id + "-" + b.branchId;
            return (
              '<div class="m-branch-group">' +
              '<button type="button" class="m-branch-toggle" aria-expanded="false" aria-controls="' + esc(panelId) + '">' +
              '<span class="m-branch-toggle__left">' +
              '<span class="m-branch-toggle__code">' + esc(b.code) + "</span>" +
              '<span class="m-branch-toggle__name">' + esc(b.name) + "</span>" +
              "</span>" +
              '<span class="m-branch-toggle__right">' +
              '<span class="m-branch-toggle__count">' + bTotal + " 站</span>" +
              '<span class="m-branch-toggle__arrow" aria-hidden="true">▼</span>' +
              "</span>" +
              "</button>" +
              '<ul class="m-stop-list" id="' + esc(panelId) + '" hidden>' + branchStops + "</ul>" +
              "</div>"
            );
          }).join("");

          var dotClass = "m-stop__dot" +
            (isTerminal ? " m-stop__dot--terminal" : (isInterchange ? " m-stop__dot--interchange" : ""));
          var dotStyle = isTerminal ? ' style="--dot-color:' + esc(lm.color) + '"' : "";
          return (
            '<li class="m-stop">' +
            '<div class="m-stop__left">' +
            '<span class="' + dotClass + '"' + dotStyle + "></span>" +
            '<span class="m-stop__code">' + esc(node.codes[lm.id]) + "</span>" +
            '<a class="m-stop__name" href="' + esc(pageUrl("line.html", { line: lm.id }, rid)) + '">' +
            esc(res.short || rid) + "</a>" +
            "</div>" +
            (others ? '<div class="m-stop__others">' + others + "</div>" : "") +
            "</li>" +
            branchesHtml
          );
        }).join("");

        if (isTailStage && lm.tail && lm.tail.more > 0) {
          itemsHtml +=
            '<li class="m-stop m-stop--more">' +
            '<a class="m-branch-more" href="' + esc(pageUrl("line.html", { line: lm.id }, "interview")) + '">' +
            esc("+" + lm.tail.more + " 站 · 查看全部面试站 →") + "</a></li>";
        }

        return (
          '<span class="m-stage-label' + (isTailStage ? " m-stage-label--terminal" : "") + '"' +
          (isTailStage ? ' style="border-color:' + esc(lm.color) + '"' : "") + ">" +
          esc(st.name + " " + st.en.toUpperCase() + (isTailStage ? " · 终点" : "")) + "</span>" +
          '<ul class="m-stop-list">' + itemsHtml + "</ul>"
        );
      }).join("");

      return (
        '<article class="m-line-card">' +
        '<div class="m-line-card__bar" style="background:' + esc(lm.color) + '"></div>' +
        '<div class="m-line-card__body">' +
        '<div class="m-line-card__head">' +
        '<div class="m-line-card__id">' +
        '<span class="line-badge" style="background:' + esc(lm.color) + ";color:" + esc(lm.textOn) + '">' + esc(lm.code) + "</span>" +
        '<h3 class="m-line-card__title">' + esc(lm.name) + "</h3>" +
        "</div>" +
        '<span class="m-line-card__stat">' + lineDone + " / " + lineTotal + " 站</span>" +
        "</div>" +
        '<p class="m-line-card__audience">' + esc(lm.audience) + "</p>" +
        stagesHtml +
        '<a class="m-line-card__cta" href="' + esc(pageUrl("line.html", { line: lm.id })) + '">进入线路页 →</a>' +
        "</div></article>"
      );
    }).join("");

    container.innerHTML = html;
    container.querySelectorAll(".m-branch-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = document.getElementById(btn.getAttribute("aria-controls"));
        var expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", expanded ? "false" : "true");
        var arrow = btn.querySelector(".m-branch-toggle__arrow");
        if (arrow) arrow.textContent = expanded ? "▼" : "▲";
        if (target) target.hidden = expanded;
      });
    });
  }

  function renderIndexStrips(data, model) {
    var lineMount = document.getElementById("line-strips-mount");
    var transferMount = document.getElementById("transfer-strips-mount");
    var lineById = {};
    model.lines.forEach(function (l) { lineById[l.id] = l; });

    if (lineMount) {
      lineMount.innerHTML = model.lines.map(function (lm) {
        var trunkCount = lm.trunk.nodes.length + (lm.tail ? lm.tail.nodes.length : 0);
        var allLineStops = {};
        lm.trunk.nodes.forEach(function (id) { allLineStops[id] = true; });
        if (lm.tail) lm.tail.nodes.forEach(function (id) { allLineStops[id] = true; });
        lm.branches.forEach(function (b) { b.nodes.forEach(function (id) { allLineStops[id] = true; }); });
        var totalLineCount = Object.keys(allLineStops).length;
        var visited = getProgress(lm.id);
        var doneCount = visited.filter(function (id) { return allLineStops[id]; }).length;

        var branchTags = lm.branches.map(function (b) {
          return '<span class="tag">' + esc(b.code + " " + b.name + " · " + (b.nodes.length - 1) + " 站") + "</span>";
        }).join("");

        return (
          '<a class="line-strip" style="border-left-color:' + esc(lm.color) + '" href="' +
          esc(pageUrl("line.html", { line: lm.id })) + '">' +
          '<span class="line-badge line-badge--lg" style="background:' + esc(lm.color) + ";color:" + esc(lm.textOn) + '">' +
          esc(lm.code) + "</span>" +
          '<div class="line-strip__main">' +
          '<div class="line-strip__title">' + esc(lm.name) + "</div>" +
          '<div class="line-strip__audience">' + esc(lm.audience) + "</div>" +
          (branchTags ? '<div class="line-strip__branches">' + branchTags + "</div>" : "") +
          "</div>" +
          '<div class="line-strip__aside">' +
          "<span>主干 " + trunkCount + " 站" + (lm.branches.length ? " · " + lm.branches.length + " 支线" : "") + "</span>" +
          '<span class="line-strip__progress">已到 ' + doneCount + " / " + totalLineCount + " 站</span>" +
          "</div></a>"
        );
      }).join("");
    }

    if (transferMount) {
      transferMount.innerHTML = (data.transfers || []).map(function (t) {
        var connIds = getConnectedLinesForTransfer(model, t);
        var badges = connIds.map(function (lid) {
          var lm = lineById[lid];
          return lm ? '<span class="line-badge line-badge--sm" style="background:' + esc(lm.color) + ";color:" + esc(lm.textOn) + '">' + esc(lm.code) + "</span>" : "";
        }).join("");

        return (
          '<a class="transfer-strip" href="' + esc(pageUrl("transfer.html", { t: t.id })) + '">' +
          '<span class="transfer-badge transfer-badge--lg">' + esc(t.code) + "</span>" +
          '<div class="transfer-strip__main">' +
          '<div class="transfer-strip__title">' + esc(t.name) + "</div>" +
          '<div class="transfer-strip__summary">' + esc(t.summary) + "</div>" +
          "</div>" +
          '<div class="transfer-strip__aside">' +
          badges +
          '<span class="tag">' + (t.stops ? t.stops.length : 0) + " 站</span>" +
          "</div></a>"
        );
      }).join("");
    }
  }

  /* ========================================================================
     Line Page
     ======================================================================== */
  function initLinePage(mainEl, data) {
    var lineId = queryParam("line");
    var rawLine = data.lines.filter(function (l) { return l.id === lineId; })[0];
    if (!rawLine) {
      renderEmpty(mainEl, data, "没有这条线", "请选择一条已有的学习线路，或返回全网线路图查看。");
      return;
    }

    var R = global.MetroLayout.layout(data, { lines: [lineId] });
    if (!R.ok) {
      renderError(mainEl, R.errors);
      return;
    }

    // Also get full model for cross-line interchange info
    var fullNorm = global.MetroLayout.normalize(data);
    var fullModel = fullNorm.errors.length ? R.model : fullNorm;
    var lineById = {};
    fullModel.lines.forEach(function (l) { lineById[l.id] = l; });
    var lm = lineById[lineId] || R.model.lines[0];

    var activeBranchId = null;
    var initialHashId = location.hash ? decodeURIComponent(location.hash.slice(1)) : "";
    if (lm.branches.length > 0) {
      var hashBranch = initialHashId ? findStopBranch(lm, initialHashId) : null;
      var qBranch = queryParam("branch");
      var saved = getSavedBranch(lineId);
      var valid = function (bid) { return lm.branches.some(function (b) { return b.branchId === bid; }); };
      activeBranchId = valid(hashBranch)
        ? hashBranch
        : (valid(qBranch) ? qBranch : (valid(saved) ? saved : lm.branches[0].branchId));
    }

    var expandedBranches = new Set();
    if (activeBranchId) expandedBranches.add(activeBranchId);

    function syncBranchUrl(bid) {
      if (!bid) return;
      saveBranch(lineId, bid);
      try {
        var u = new URL(location.href);
        u.searchParams.set("line", lineId);
        u.searchParams.set("branch", bid);
        history.replaceState(null, "", u.pathname + u.search + u.hash);
      } catch (e) {}
    }

    function groupByStage(stopItems) {
      var groups = [];
      stopItems.forEach(function (s) {
        var last = groups[groups.length - 1];
        if (!last || last.stage !== s.stage) {
          groups.push({ stage: s.stage, stops: [s] });
        } else {
          last.stops.push(s);
        }
      });
      return groups;
    }

    function renderStageGroups(stopItems, isTrunk, visitedSet, stageOpts) {
      stageOpts = stageOpts || {};
      var isTail = !!stageOpts.isTail;
      return groupByStage(stopItems).map(function (g) {
        var stObj = getStageObj(data, g.stage);
        var stopsHtml = g.stops.map(function (s, sIdx) {
          var res = data.resources[s.id] || { short: s.id, title: s.id, url: "#", note: "", type: "site" };
          var isVisited = visitedSet.has(s.id);
          var isTerminal = isTail && sIdx === g.stops.length - 1;
          var node = fullModel.nodes[s.id];
          var otherLines = node ? node.lines.filter(function (l) { return l !== lineId; }) : [];
          var isInterchange = otherLines.length > 0;
          var otherBadges = otherLines.map(function (ol) {
            var olm = lineById[ol];
            if (!olm) return "";
            var ocode = (node && node.codes[ol]) || olm.code;
            var ob = findStopBranch(olm, s.id);
            return (
              '<a class="station-popover__link" href="' + esc(pageUrl("line.html", { line: ol, branch: ob || undefined }, s.id)) + '">' +
              '<span class="line-badge line-badge--sm" style="background:' + esc(olm.color) + ";color:" + esc(olm.textOn) + '">' +
              esc(olm.code) + "</span>" +
              "<span>" + esc(ocode) + "</span></a>"
            );
          }).join("");

          var transfers = getTransfersForStop(data, s.id);
          var transferLinks = transfers.map(function (t) {
            return (
              '<a class="station-popover__link" href="' + esc(pageUrl("transfer.html", { t: t.id })) + '">' +
              '<span class="transfer-badge">' + esc(t.code) + "</span>" +
              "<span>" + esc(t.name) + "</span></a>"
            );
          }).join("");

          var forksHere = isTrunk ? lm.branches.filter(function (b) { return b.fork === s.id; }) : [];
          var forkHtml = forksHere.length
            ? '<div class="stop-card__fork"><span>从这里分出：</span>' +
              forksHere.map(function (bObj) {
                return '<button type="button" class="btn" data-switch-branch="' + esc(bObj.branchId) + '">' + esc(bObj.code + " " + bObj.name) + "</button>";
              }).join("") +
              "</div>"
            : "";

          var ghText = formatGithub(res.github);
          var detailsId = "stop-details-" + s.id;
          var markerClass = "spine-marker" +
            (isTerminal ? " spine-marker--terminal" : (isInterchange ? " spine-marker--interchange" : "")) +
            (isVisited ? " spine-marker--visited" : "");
          return (
            '<div class="spine-stop' + (isTerminal ? " spine-stop--terminal" : "") + '" id="' + esc(s.id) + '" style="--spine-color:' + esc(lm.color) + ";--spine-alpha:" + (isVisited ? "1" : "0.35") + '">' +
            '<span class="' + markerClass + '" aria-hidden="true"></span>' +
            '<article class="stop-card" data-stop-card="' + esc(s.id) + '">' +
            '<div class="stop-card__top">' +
            '<div class="stop-card__head">' +
            '<div class="stop-card__code-row">' +
            '<span class="stop-card__code">' + esc(s.code) + "</span>" +
            '<h3 class="stop-card__short">' + esc(res.short || s.id) + "</h3>" +
            renderResourceTags(data, res) +
            "</div>" +
            '<div class="stop-card__title">' + esc(res.title) + "</div>" +
            (res.note ? '<p class="stop-card__note stop-card__note--clamp" data-note-el>' + esc(res.note) + "</p>" : "") +
            "</div>" +
            '<div class="stop-card__actions">' +
            '<button type="button" class="btn btn--visited" data-visit-id="' + esc(s.id) + '" aria-pressed="' + (isVisited ? "true" : "false") + '">' +
            (isVisited ? "✓ 已到站" : "标记到站") + "</button>" +
            '<button type="button" class="btn" data-expand-btn aria-expanded="false" aria-controls="' + esc(detailsId) + '">详情 ▼</button>' +
            "</div>" +
            "</div>" +
            forkHtml +
            '<div class="stop-card__details" id="' + esc(detailsId) + '" hidden>' +
            '<div class="stop-card__meta-row">' +
            '<a class="btn btn--primary" href="' + esc(res.url) + '" target="_blank" rel="noopener">打开资源（' + esc(M.domainOf(res.url)) + "）↗</a>" +
            (ghText ? '<span class="tag tag--mono">' + esc(ghText) + "</span>" : "") +
            "</div>" +
            (otherBadges ? '<div class="stop-card__meta-row"><span>可换乘线路：</span>' + otherBadges + "</div>" : "") +
            (transferLinks ? '<div class="stop-card__meta-row"><span>所属换乘专题：</span>' + transferLinks + "</div>" : "") +
            "</div>" +
            "</article></div>"
          );
        }).join("");

        var plaqueHtml = isTail
          ? '<div class="spine-stage-plaque spine-stage-plaque--terminal" style="border-color:' + esc(lm.color) + '"><span>终点 · ' + esc(stObj.name) + '</span><span class="spine-stage-plaque__en">' + esc(stObj.en.toUpperCase()) + "</span></div>"
          : '<div class="spine-stage-plaque"><span>' + esc(stObj.name) + '</span><span class="spine-stage-plaque__en">' + esc(stObj.en.toUpperCase()) + "</span></div>";

        return (
          '<section class="spine-stage-block">' +
          '<div class="spine-stage-header">' +
          plaqueHtml +
          "</div>" +
          stopsHtml +
          "</section>"
        );
      }).join("");
    }

    function renderLineView(opts) {
      opts = opts || {};
      var prevMiniScroll = null;
      var oldMini = document.getElementById("line-minimap-mount");
      if (oldMini && !opts.scrollMapToFork) prevMiniScroll = oldMini.scrollLeft;

      syncBranchUrl(activeBranchId);
      var route = global.MetroLayout.route(fullModel, lineId, activeBranchId);
      var stops = route.stops;
      var visited = getProgress(lineId);
      var visitedSet = new Set(visited);
      var doneCount = stops.filter(function (s) { return visitedSet.has(s.id); }).length;
      var nextStop = stops.filter(function (s) { return !visitedSet.has(s.id); })[0] || null;
      var nextRes = nextStop ? (data.resources[nextStop.id] || { short: nextStop.id }) : null;

      var progressText = nextStop
        ? "已到 " + doneCount + " / " + stops.length + " 站 · 下一站 " + nextStop.code + " " + (nextRes.short || nextStop.id)
        : "已到 " + doneCount + " / " + stops.length + " 站 · 已到终点";

      var branchTabsHtml = "";
      if (lm.branches.length > 0) {
        branchTabsHtml =
          '<div class="branch-tabs" role="tablist" aria-label="选择支线">' +
          lm.branches.map(function (b) {
            var sel = b.branchId === activeBranchId;
            return (
              '<button type="button" role="tab" class="branch-tab" aria-selected="' + (sel ? "true" : "false") +
              '" data-branch-id="' + esc(b.branchId) + '">' +
              esc(b.code + " " + b.name) + "</button>"
            );
          }).join("") +
          "</div>";
      }

      var totalLineNodes = {};
      lm.trunk.nodes.forEach(function (id) { totalLineNodes[id] = true; });
      if (lm.tail) lm.tail.nodes.forEach(function (id) { totalLineNodes[id] = true; });
      lm.branches.forEach(function (b) { b.nodes.forEach(function (id) { totalLineNodes[id] = true; }); });
      var totalLineCount = Object.keys(totalLineNodes).length;

      var trunkItems = lm.trunk.nodes.map(function (rid, i) {
        return { id: rid, stage: lm.trunk.stages[i], code: (fullModel.nodes[rid] && fullModel.nodes[rid].codes[lineId]) || "" };
      });
      var trunkSpineHtml = renderStageGroups(trunkItems, true, visitedSet);

      var branchesHtml = lm.branches.map(function (b) {
        var bItems = b.nodes.slice(1).map(function (rid) {
          var node = fullModel.nodes[rid];
          return { id: rid, stage: node ? node.stage : "intro", code: node ? node.codes[lineId] : "" };
        });
        var bDone = bItems.filter(function (s) { return visitedSet.has(s.id); }).length;
        var isExpanded = expandedBranches.has(b.branchId);
        var forkRes = data.resources[b.fork] || { short: b.fork };
        var forkCode = (fullModel.nodes[b.fork] && fullModel.nodes[b.fork].codes[lineId]) || "";
        var panelId = "branch-panel-" + b.branchId;

        return (
          '<section class="branch-accordion" id="branch-block-' + esc(b.branchId) + '">' +
          '<button type="button" class="branch-accordion__toggle" aria-expanded="' + (isExpanded ? "true" : "false") +
          '" aria-controls="' + esc(panelId) + '" data-branch-toggle="' + esc(b.branchId) + '">' +
          '<span class="branch-accordion__left">' +
          '<span class="line-badge line-badge--sm" style="background:' + esc(lm.color) + ";color:" + esc(lm.textOn) + '">' + esc(b.code) + "</span>" +
          '<span class="branch-accordion__name">' + esc(b.name) + "</span>" +
          '<span class="branch-accordion__count">' + bItems.length + " 站</span>" +
          "</span>" +
          '<span class="branch-accordion__right">' +
          '<span class="branch-accordion__progress">已到 ' + bDone + " / " + bItems.length + "</span>" +
          '<span class="branch-accordion__arrow" aria-hidden="true">' + (isExpanded ? "▲" : "▼") + "</span>" +
          "</span>" +
          "</button>" +
          '<div class="branch-accordion__panel" id="' + esc(panelId) + '"' + (isExpanded ? "" : " hidden") + ">" +
          '<div class="branch-fork-note">从 <a href="#' + esc(b.fork) + '" class="branch-fork-link">' +
          esc((forkCode ? forkCode + " " : "") + (forkRes.short || b.fork)) + "</a> 分出</div>" +
          renderStageGroups(bItems, false, visitedSet) +
          "</div>" +
          "</section>"
        );
      }).join("");

      var tailItems = lm.tail
        ? lm.tail.nodes.map(function (rid, i) {
            return { id: rid, stage: lm.tail.stages[i], code: (fullModel.nodes[rid] && fullModel.nodes[rid].codes[lineId]) || "" };
          })
        : [];
      var tailSpineHtml = tailItems.length ? renderStageGroups(tailItems, false, visitedSet, { isTail: true }) : "";

      mainEl.innerHTML =
        '<section class="platform-hero">' +
        '<div class="platform-hero__top">' +
        '<div class="platform-hero__id">' +
        '<span class="line-badge line-badge--lg" style="background:' + esc(lm.color) + ";color:" + esc(lm.textOn) + '">' + esc(lm.code) + "</span>" +
        '<div><h1 class="platform-hero__title">' + esc(lm.name) + "</h1>" +
        '<div class="platform-hero__en">' + esc(lm.en.toUpperCase()) + " · 全线 " + totalLineCount + " 站" + (lm.branches.length ? " · " + lm.branches.length + " 支线" : "") + "</div></div>" +
        "</div>" +
        (nextStop
          ? '<a class="progress-pill" href="#' + esc(nextStop.id) + '" id="next-stop-link">' + esc(progressText) + "</a>"
          : '<span class="progress-pill">' + esc(progressText) + "</span>") +
        "</div>" +
        '<p class="platform-hero__desc">' + esc(lm.audience) + "</p>" +
        branchTabsHtml +
        "</section>" +
        '<section class="mini-map-wrap" aria-label="本线线路缩略图">' +
        '<div class="map-frame" id="line-map-frame">' +
        '<div class="map-scroll" id="line-minimap-mount"></div>' +
        '<div class="map-scroll-hint" aria-hidden="true" hidden>横向滑动 →</div>' +
        "</div>" +
        "</section>" +
        '<section class="spine-route" aria-label="主干站点">' + trunkSpineHtml + "</section>" +
        (branchesHtml ? '<section class="branch-accordions" aria-label="支线站点">' + branchesHtml + "</section>" : "") +
        (tailSpineHtml ? '<section class="spine-route spine-route--tail" id="interview" aria-label="终点 · 面试">' + tailSpineHtml + "</section>" : "");

      // Mini-map (1:1 scale, horizontal scroll)
      var miniMount = document.getElementById("line-minimap-mount");
      if (miniMount) {
        var activeTracks = new Set([lm.trunk.key]);
        if (lm.tail) activeTracks.add(lm.tail.key);
        if (activeBranchId) activeTracks.add(lineId + "/" + activeBranchId);
        M.renderMap(miniMount, R, {
          minScale: 1,
          activeBranchTracks: activeTracks,
          visitedIds: visitedSet,
          visitedColor: lm.color,
          onTrackClick: function (_lid, bid) {
            if (bid) {
              activeBranchId = bid;
              expandedBranches.add(bid);
              renderLineView({ scrollToBranch: bid, scrollMapToFork: true });
            }
          },
          onStationSelect: function (st) {
            var stBranch = findStopBranch(lm, st.id);
            if (stBranch && !expandedBranches.has(stBranch)) {
              expandedBranches.add(stBranch);
              var toggleBtn = mainEl.querySelector('[data-branch-toggle="' + stBranch + '"]');
              var panel = document.getElementById("branch-panel-" + stBranch);
              if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "true");
              if (panel) panel.hidden = false;
            }
            var target = document.getElementById(st.id);
            if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        });
        M.syncScrollHint(document.getElementById("line-map-frame"), R);

        if (opts.scrollMapToFork) {
          var activeBr = activeBranchId ? lm.branches.filter(function (b) { return b.branchId === activeBranchId; })[0] : null;
          var forkSt = activeBr && R.stationById[activeBr.fork];
          if (forkSt) {
            M.scrollMapToStation(miniMount, forkSt, R);
          }
        } else if (prevMiniScroll != null) {
          miniMount.scrollLeft = prevMiniScroll;
        }
      }

      // Branch tab clicks + keyboard navigation
      var tabs = Array.prototype.slice.call(mainEl.querySelectorAll(".branch-tab"));
      tabs.forEach(function (tab, idx) {
        tab.addEventListener("click", function () {
          activeBranchId = tab.getAttribute("data-branch-id");
          expandedBranches.add(activeBranchId);
          renderLineView({ scrollToBranch: activeBranchId, scrollMapToFork: true });
        });
        tab.addEventListener("keydown", function (e) {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            var nextIdx = e.key === "ArrowRight" ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
            activeBranchId = tabs[nextIdx].getAttribute("data-branch-id");
            expandedBranches.add(activeBranchId);
            renderLineView({ scrollMapToFork: true });
            var newTab = mainEl.querySelector('.branch-tab[data-branch-id="' + activeBranchId + '"]');
            if (newTab) newTab.focus();
          }
        });
      });

      // Branch accordion toggles
      mainEl.querySelectorAll("[data-branch-toggle]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var bid = btn.getAttribute("data-branch-toggle");
          var panel = document.getElementById(btn.getAttribute("aria-controls"));
          var expanded = btn.getAttribute("aria-expanded") === "true";
          btn.setAttribute("aria-expanded", expanded ? "false" : "true");
          var arrow = btn.querySelector(".branch-accordion__arrow");
          if (arrow) arrow.textContent = expanded ? "▼" : "▲";
          if (panel) panel.hidden = expanded;
          if (expanded) expandedBranches.delete(bid);
          else expandedBranches.add(bid);
        });
      });

      // Fork switch buttons
      mainEl.querySelectorAll("[data-switch-branch]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          activeBranchId = btn.getAttribute("data-switch-branch");
          expandedBranches.add(activeBranchId);
          renderLineView({ scrollToBranch: activeBranchId, scrollMapToFork: true });
        });
      });

      // Visit toggles
      mainEl.querySelectorAll("[data-visit-id]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          toggleProgress(lineId, btn.getAttribute("data-visit-id"));
          renderLineView();
        });
      });

      // Expand details
      mainEl.querySelectorAll("[data-expand-btn]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var panel = document.getElementById(btn.getAttribute("aria-controls"));
          var expanded = btn.getAttribute("aria-expanded") === "true";
          btn.setAttribute("aria-expanded", expanded ? "false" : "true");
          btn.textContent = expanded ? "详情 ▼" : "收起 ▲";
          if (panel) panel.hidden = expanded;
          var card = btn.closest(".stop-card");
          var noteEl = card ? card.querySelector("[data-note-el]") : null;
          if (noteEl) {
            noteEl.classList.toggle("stop-card__note--clamp", expanded);
          }
        });
      });

      if (opts.scrollToBranch) {
        var brBlock = document.getElementById("branch-block-" + opts.scrollToBranch);
        if (brBlock) brBlock.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // Hash target auto-expand & scroll
      var targetId = opts.scrollTargetId || "";
      if (targetId) {
        var targetBranch = findStopBranch(lm, targetId);
        if (targetBranch && !expandedBranches.has(targetBranch)) {
          expandedBranches.add(targetBranch);
          var tBtn = mainEl.querySelector('[data-branch-toggle="' + targetBranch + '"]');
          var tPanel = document.getElementById("branch-panel-" + targetBranch);
          if (tBtn) tBtn.setAttribute("aria-expanded", "true");
          if (tPanel) tPanel.hidden = false;
        }
        var stopEl = document.getElementById(targetId);
        if (stopEl) {
          var card = stopEl.querySelector(".stop-card");
          var expBtn = stopEl.querySelector("[data-expand-btn]");
          var details = stopEl.querySelector(".stop-card__details");
          var noteEl = stopEl.querySelector("[data-note-el]");
          if (card) card.classList.add("stop-card--highlight");
          if (expBtn) {
            expBtn.setAttribute("aria-expanded", "true");
            expBtn.textContent = "收起 ▲";
          }
          if (details) details.hidden = false;
          if (noteEl) {
            noteEl.classList.remove("stop-card__note--clamp");
          }
          stopEl.scrollIntoView({ behavior: "auto", block: "center" });
        }
      }
    }

    renderLineView({ scrollTargetId: initialHashId, scrollMapToFork: true });
  }

  /* ========================================================================
     Transfer Page
     ======================================================================== */
  function initTransferPage(mainEl, data) {
    var tid = queryParam("t");
    var transfer = (data.transfers || []).filter(function (t) { return t.id === tid; })[0];
    if (!transfer) {
      renderEmpty(mainEl, data, "没有这个换乘专题", "请选择一个已有的换乘专题，或返回全网线路图查看。");
      return;
    }
    if (!transfer.stops || !transfer.stops.length) {
      renderEmpty(mainEl, data, transfer.name + " 暂无站点", "该换乘专题目前还没有收录站点。");
      return;
    }

    var fullNorm = global.MetroLayout.normalize(data);
    if (fullNorm.errors.length) {
      renderError(mainEl, fullNorm.errors);
      return;
    }

    var lineById = {};
    fullNorm.lines.forEach(function (l) { lineById[l.id] = l; });
    var connLines = getConnectedLinesForTransfer(fullNorm, transfer);
    var overviewData = global.MetroLayout.overview(data, { include: transfer.stops });
    var R = connLines.length ? global.MetroLayout.layout(overviewData, { lines: connLines }) : null;
    if (R && !R.ok) {
      renderError(mainEl, R.errors);
      return;
    }

    var stopsHtml = transfer.stops.map(function (rid, idx) {
      var res = data.resources[rid] || { short: rid, title: rid, url: "#", note: "", type: "site" };
      var node = fullNorm.nodes[rid];
      var lineLinks = node
        ? node.lines.map(function (lid) {
            var lm = lineById[lid];
            var stObj = getStageObj(data, node.stage);
            var br = findStopBranch(lm, rid);
            var brObj = br ? lm.branches.filter(function (b) { return b.branchId === br; })[0] : null;
            var locLabel = brObj ? (node.codes[lid] + " · " + brObj.name + " · " + stObj.name) : (node.codes[lid] + " · " + stObj.name);
            return (
              '<a class="station-popover__link" href="' + esc(pageUrl("line.html", { line: lid, branch: br || undefined }, rid)) + '">' +
              '<span class="line-badge line-badge--sm" style="background:' + esc(lm.color) + ";color:" + esc(lm.textOn) + '">' +
              esc(lm.code) + "</span>" +
              "<span>" + esc(locLabel) + "</span></a>"
            );
          }).join("")
        : "";

      var ghText = formatGithub(res.github);
      var detailsId = "t-details-" + rid + "-" + idx;
      return (
        '<article class="stop-card" id="' + esc(rid) + '">' +
        '<div class="stop-card__top">' +
        '<div class="stop-card__head">' +
        '<div class="stop-card__code-row">' +
        '<span class="stop-card__code">' + esc(transfer.code + "-" + String(idx + 1).padStart(2, "0")) + "</span>" +
        '<h2 class="stop-card__short">' + esc(res.short || rid) + "</h2>" +
        renderResourceTags(data, res) +
        "</div>" +
        '<div class="stop-card__title">' + esc(res.title) + "</div>" +
        (res.note ? '<p class="stop-card__note stop-card__note--clamp" data-note-el>' + esc(res.note) + "</p>" : "") +
        "</div>" +
        '<div class="stop-card__actions">' +
        '<button type="button" class="btn" data-expand-btn aria-expanded="false" aria-controls="' + esc(detailsId) + '">详情 ▼</button>' +
        "</div>" +
        "</div>" +
        '<div class="stop-card__meta-row" style="margin-top:10px">' + lineLinks + "</div>" +
        '<div class="stop-card__details" id="' + esc(detailsId) + '" hidden>' +
        '<div class="stop-card__meta-row">' +
        '<a class="btn btn--primary" href="' + esc(res.url) + '" target="_blank" rel="noopener">打开资源（' + esc(M.domainOf(res.url)) + "）↗</a>" +
        (ghText ? '<span class="tag tag--mono">' + esc(ghText) + "</span>" : "") +
        "</div>" +
        "</div>" +
        "</article>"
      );
    }).join("");

    mainEl.innerHTML =
      '<section class="platform-hero">' +
      '<div class="platform-hero__top">' +
      '<div class="platform-hero__id">' +
      '<span class="transfer-badge transfer-badge--lg">' + esc(transfer.code) + "</span>" +
      '<div><h1 class="platform-hero__title">' + esc(transfer.name) + "</h1>" +
      '<div class="platform-hero__en">' + esc((transfer.en || "").toUpperCase()) + " · " + transfer.stops.length + " 站</div></div>" +
      "</div>" +
      "</div>" +
      '<p class="platform-hero__desc">' + esc(transfer.summary) + "</p>" +
      "</section>" +
      (R
        ? '<section class="mini-map-wrap" aria-label="专题涉及线路图"><div class="map-frame" id="transfer-map-frame"><div class="map-scroll" id="transfer-minimap-mount"></div><div class="map-scroll-hint" aria-hidden="true" hidden>横向滑动 →</div></div></section>'
        : "") +
      '<section class="strips-grid" aria-label="专题站点顺序">' + stopsHtml + "</section>";

    var miniMount = document.getElementById("transfer-minimap-mount");
    if (miniMount && R) {
      M.renderMap(miniMount, R, {
        minScale: 1,
        transferStations: new Set(transfer.stops),
        onTrackClick: function (lid, bid) {
          location.href = pageUrl("line.html", { line: lid, branch: bid || undefined });
        }
      });
      M.syncScrollHint(document.getElementById("transfer-map-frame"), R);

      var firstStopId = transfer.stops && transfer.stops[0];
      var firstSt = firstStopId && R.stationById[firstStopId];
      if (firstSt) {
        M.scrollMapToStation(miniMount, firstSt, R);
      }
    }

    mainEl.querySelectorAll("[data-expand-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var panel = document.getElementById(btn.getAttribute("aria-controls"));
        var expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", expanded ? "false" : "true");
        btn.textContent = expanded ? "详情 ▼" : "收起 ▲";
        if (panel) panel.hidden = expanded;
        var card = btn.closest(".stop-card");
        var noteEl = card ? card.querySelector("[data-note-el]") : null;
        if (noteEl) {
          noteEl.classList.toggle("stop-card__note--clamp", expanded);
        }
      });
    });
  }

  /* ========================================================================
     About Page & 404 Page
     ======================================================================== */
  function initAboutPage(mainEl, data) {
    var lineCount = (data.lines || []).length;
    var transferCount = (data.transfers || []).length;
    var resCount = Object.keys(data.resources || {}).length;
    var verifiedDate = (data.source && data.source.generated) || "2026-11-18";

    mainEl.innerHTML =
      '<section class="platform-hero">' +
      '<h1 class="platform-hero__title">关于 AI 学习路线</h1>' +
      '<p class="platform-hero__desc">这里是一个按人群视角组织的 AI 学习导航，只推荐经过筛选的外部优质资源，帮你从零散收藏变成一条可走通的路线。</p>' +
      "</section>" +
      '<div class="about-prose">' +
      '<article class="about-card">' +
      "<h2>怎么读这张线路图</h2>" +
      "<ul>" +
      "<li><strong>线路</strong>：代表不同角色或目标的学习路径，从左到右分为「入门 → 进阶 → 实战 → 面试」四段（P、E 线至实战为止）。</li>" +
      "<li><strong>支线</strong>：主干走到一定阶段后，按细分方向分出的专题路线（如 A1–A4）。</li>" +
      "<li><strong>换乘站</strong>：多条路线共同经过的核心资源，可以在这里换乘到另一条路线。</li>" +
      "<li><strong>换乘专题（T1 / T2 / T3）</strong>：横跨多条路线的主题串讲，按阅读顺序把相关站点连起来。</li>" +
      "</ul>" +
      '<div class="legend-diagram">' +
      '<div class="legend-diagram__item">' +
      '<svg width="48" height="28" viewBox="0 0 48 28" aria-hidden="true"><line x1="0" y1="14" x2="48" y2="14" stroke="#E4002B" stroke-width="6"/><circle cx="24" cy="14" r="6" fill="#fff" stroke="#111" stroke-width="2.5"/></svg>' +
      '<div class="legend-diagram__name">普通站点</div>' +
      '<div class="legend-diagram__desc">单条线路上的一个推荐资源。</div>' +
      "</div>" +
      '<div class="legend-diagram__item">' +
      '<svg width="48" height="36" viewBox="0 0 48 36" aria-hidden="true"><line x1="0" y1="11" x2="48" y2="11" stroke="#E4002B" stroke-width="5"/><line x1="0" y1="25" x2="48" y2="25" stroke="#0072CE" stroke-width="5"/><rect x="18" y="5" width="12" height="26" rx="6" fill="#fff" stroke="#111" stroke-width="2.5"/></svg>' +
      '<div class="legend-diagram__name">换乘站</div>' +
      '<div class="legend-diagram__desc">多条路线共用的重要节点。</div>' +
      "</div>" +
      '<div class="legend-diagram__item">' +
      '<svg width="64" height="36" viewBox="0 0 64 36" aria-hidden="true"><path d="M0 10 H24 L38 26 H64" fill="none" stroke="#E4002B" stroke-width="5" stroke-linejoin="round"/><line x1="0" y1="10" x2="64" y2="10" stroke="#E4002B" stroke-width="5"/><circle cx="24" cy="10" r="5" fill="#fff" stroke="#111" stroke-width="2"/></svg>' +
      '<div class="legend-diagram__name">支线分岔</div>' +
      '<div class="legend-diagram__desc">从主干分出的细分方向。</div>' +
      "</div>" +
      '<div class="legend-diagram__item">' +
      '<svg width="96" height="36" viewBox="0 0 96 36" aria-hidden="true"><line x1="0" y1="18" x2="24" y2="18" stroke="#E4002B" stroke-width="6"/><circle cx="24" cy="18" r="10" fill="#FFFFFF" stroke="#111111" stroke-width="3.5"/><circle cx="24" cy="18" r="4" fill="#E4002B"/><rect x="40" y="4" width="52" height="28" rx="14" fill="#F4F1EA" stroke="#E4002B" stroke-width="3"/><text x="66" y="22.5" text-anchor="middle" font-size="13" font-weight="600" fill="#111111">终点</text></svg>' +
      '<div class="legend-diagram__name">终点站 / 面试</div>' +
      '<div class="legend-diagram__desc">各支线实战结束后汇入共同面试段，线尾以粗框终点帽收束。</div>' +
      "</div>" +
      '<div class="legend-diagram__item">' +
      '<div style="display:flex;gap:8px;align-items:center;height:28px"><span class="line-badge" style="background:#E4002B;color:#fff">A</span><span class="transfer-badge">T1</span></div>' +
      '<div class="legend-diagram__name">线路与专题徽标</div>' +
      '<div class="legend-diagram__desc">实心圆为学习主线，黑框方标为换乘专题。</div>' +
      "</div>" +
      "</div>" +
      "</article>" +
      '<article class="about-card">' +
      "<h2>数据与进度说明</h2>" +
      "<p>全网共 " + lineCount + " 条学习主线与 " + transferCount + " 个换乘专题，每条主线分为「入门 → 进阶 → 实战 → 面试」四段（A、M 线在实战后汇入面试终点）。" +
      "本站共收录 " + resCount + " 条资源，链接于 " + esc(verifiedDate) + " 逐条核验。页面不收集个人数据，学习进度仅保存在当前浏览器的本地存储中。</p>" +
      "</article>" +
      "</div>";
  }

  function init404Page(mainEl, data) {
    renderEmpty(mainEl, data, "这一站不存在", "你访问的页面可能已移动，或者线路号有误。", "404 · STATION NOT FOUND");
  }

  /* ========================================================================
     Bootstrap
     ======================================================================== */
  function boot() {
    var data = global.ALP;
    var pageType = document.body.getAttribute("data-page") || "index";
    renderShell(data, pageType);

    var mainEl = document.getElementById("main-content");
    if (!mainEl) return;

    var forcedState = stateOverride();
    if (forcedState === "loading") {
      renderLoading(mainEl);
      return;
    }
    if (forcedState === "error") {
      renderError(mainEl, ["模拟错误：线 A 与线 M 对站「上下文工程」的先后顺序形成环"]);
      return;
    }

    if (!data || !global.MetroLayout) {
      renderError(mainEl, ["未能加载线路数据（ALP）或自动排布模块（MetroLayout）。"]);
      return;
    }

    if (pageType === "about") {
      initAboutPage(mainEl, data);
      return;
    }
    if (pageType === "404") {
      init404Page(mainEl, data);
      return;
    }

    renderLoading(mainEl);
    waitForFonts().then(function () {
      if (pageType === "index") initIndex(mainEl, data);
      else if (pageType === "line") initLinePage(mainEl, data);
      else if (pageType === "transfer") initTransferPage(mainEl, data);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(window);

/*
 * AI 学习路线 · 数据适配层（v3）
 * ---------------------------------------------------------------
 * 输入：window.ALP_SOURCE（shared/source.js）。
 * 输出：window.ALP（metro-layout.js 和页面使用的结构，见 docs/data-format.md）。
 * 源文件不改；字段差异都在这里处理：
 *   - 线没有 color → 按地铁色系分配（A 红 / M 蓝 / P 绿 / E 黄，其余从 palette 取）
 *   - resource.reason → note；lang 'zh' / 'zh-en' → 中文 / 中英；free、github 原样保留
 *   - 站名 short：原样使用 JSON 里的 short，不加空格、不截断
 *   - 首页代表站：window.ALP_FEATURED（research/featured-stations.json，按支线代码）→ branch.featured；
 *     缺失时回退到资源上的 featured 字段，再回退到每段第一个
 */
(function () {
  // 风格规则不许 emoji：源数据里的标题若带 emoji（如 GitHub 仓库名「happy-llm: 📚 …」），显示时去掉；字体子集同样不收这些字
  function noEmoji(t) { return typeof t === "string" ? t.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]\s*/gu, "").replace(/\s{2,}/g, " ").trim() : t; }

  var S = window.ALP_SOURCE;
  if (!S) { window.ALP = { error: "没有加载到 shared/source.js（运行 tools/build_data.py 生成）" }; return; }
  var COLORS = { eng: "#E4002B", model: "#0072CE", product: "#00A651", everyone: "#F5A800" };
  var resources = {};
  Object.keys(S.resources || {}).forEach(function (id) {
    var r = S.resources[id];
    resources[id] = {
      short: noEmoji(r.short || r.title || id), shortRaw: r.short, type: r.type, title: noEmoji(r.title), url: r.url,
      note: r.reason || "", stage: r.stage,
      free: r.free === true ? true : (r.free === false ? false : undefined),
      lang: r.lang === "zh" ? "zh" : r.lang === "zh-en" ? "zh-en" : undefined,
      github: r.github || null,
      featured: r.featured === true || r.representative === true,
      // 年代标签：只读源数据的可选字段 era（research/resources.json），没有就不显示
      era: typeof r.era === "string" && r.era.trim() ? r.era.trim() : undefined,
      check: r.check || null
    };
  });
  var lines = (S.lines || []).map(function (l) {
    return {
      id: l.id, code: l.code, name: l.name, en: l.en, audience: l.audience,
      color: l.color || COLORS[l.id],
      trunk: l.trunk,
      branches: (l.branches || []).map(function (b) {
        var F = window.ALP_FEATURED && window.ALP_FEATURED.byBranch;
        return { id: b.id, code: b.code, name: b.name, from: b.from, stops: b.stops, side: b.side,
          featured: F && F[b.code] && F[b.code].length ? F[b.code].slice() : null };
      })
    };
  });
  window.ALP = {
    featuredErrors: (window.ALP_FEATURED && window.ALP_FEATURED.errors) || [],
    source: { generated: S.meta && S.meta.generated, note: S.meta && S.meta.note, verification: S.verification },
    stages: S.stages,
    lines: lines,
    transfers: (S.transfers || []).map(function (t) {
      return { id: t.id, code: t.code, name: t.name, en: t.en, summary: t.summary, stops: t.stops };
    }),
    palette: ["#8E44AD", "#00A0B0", "#E86A10", "#7A5C3E", "#C2185B", "#5B6B00"],
    typeLabels: S.typeLabels,
    langLabels: { zh: "中文", "zh-en": "中英" },
    resources: resources
  };
})();

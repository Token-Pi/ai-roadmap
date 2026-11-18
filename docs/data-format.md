# 线网数据格式与加线方法

线路图的坐标全部由 `shared/metro-layout.js` 自动计算。加线、加支线、加站或调整顺序，只改 `shared/data.js`，不用写坐标。

## 文件

| 文件 | 作用 |
| --- | --- |
| `shared/source.js` | **运行时源数据**（当前 167 条资源清单，包装为 `window.ALP_SOURCE`） |
| `shared/data.js` | 适配层：`ALP_SOURCE` → `window.ALP`（补线色、reason→note、lang 标签、代表站；站名 short 原样使用，不加空格、不截断） |
| `shared/data-sample.js` | 上一轮的示例数据，已不用，留作对照 |
| `shared/data-test.js` | 压力测试数据，只在 `?data=test` 时加载：多 1 条主线和 3 条支线 |
| `shared/metro-layout.js` | 布局模块 `MetroLayout`：浏览器和 Node 都能用，不依赖 DOM |
| `tools/check_metro.py` | 渲染后在页面上做重叠、截断、溢出检测，以及可读性检测（`tools/text_audit.py`：逐字形像素 WCAG AA 对比度、字号字重下限、地图文字压线） |
| `tools/check_layout.js` | Node 下对布局结果做同样的检测，速度快，适合改完数据先跑一遍 |

## 结构

```js
window.ALP = {
  stages: [ { id: "intro", name: "入门", en: "Basics" }, …, { id: "interview", name: "面试", en: "Interview" } ],   // 分段，按顺序
  lines: [ Line, … ],                                           // 主线，顺序不影响布局（布局会自己挑线序）
  transfers: [ Transfer, … ],                                   // 换乘专题
  palette: ["#8E44AD", …],                                      // 新线不写 color 时按顺序取色
  typeLabels: { site: "网站", repo: "仓库", … },
  resources: { "<id>": Resource, … }
};
```

**Line（主线）**

```js
{
  id: "eng", code: "A", name: "AI 应用与工程开发", en: "AI Engineering",
  audience: "…",
  color: "#E4002B",                 // 可省略：从 palette 取色
  trunk: { intro: ["latent-space", "llm-basics", "roadmap-ai-eng"],     // 主干，按分段写，段内按先后
           interview: ["aiml-interviews", "datawhale-llm-interview"] }, // 可省略：面试终点段，整条线共用，不挂支线
  branches: [ Branch, … ]           // 可省略
}
```

**Branch（支线）**

```js
{ id: "rag", code: "A2", name: "RAG 与知识检索",
  from: "roadmap-ai-eng",           // 分岔站，必须是主干上的站
  stops: { adv: ["dlai-courses"], build: ["openai-cookbook"] },
  side: "up" | "down" }             // 可省略：布局自己选朝向
```

- 从主干最后一站分出的第一条支线，会接着主干走直线。其余支线向上或向下分开。
- 站号自动生成。主干是 `A01`、`A02`…，支线是 `A2-01`、`A2-02`…。

**Transfer（换乘专题）**

```js
{ id: "safety", code: "T3", name: "AI 安全与合规", en: "…", summary: "…",
  stops: ["ai-red-teaming", "pair", "cs324", "bluedot"] }   // 资源 id，按阅读顺序；经过哪些线由数据推导
```

**Resource（资源）**

```js
"evals": { short: "评测", type: "article", title: "Your AI Product Needs Evals",
           url: "https://…", note: "…", free: true, lang: "zh",
           era: "2021 年基础题库" }   // era 可省略
```

- `short` 是图上的站名，尽量不超过 6 个汉字。
- `free` 和 `lang` 不确定时不要写，页面不会显示。
- `era` 是可选的年代标签，只给需要提示材料年代的资源（例如「2021 年基础题库」）。没有该字段的资源不显示年代标签。

## 面试终点（汇流终点段）

- 写法：面试站写在 `lines[].trunk.interview`，整条线共用，**不要**写进支线。现在 A 线 3 站、M 线 7 站，P、E 线没有。两条线都有的面试站（AIML面试指南、大模型面试整理）自动成为换乘站。
- 规则是通用的：主干上「分段晚于该线所有支线站」的那几站，布局会拆成一条 `kind: "tail"` 的终点段；该线每条支线的最后一站之后都 45° 汇入终点段第一站（汇流站，`station.merge`），终点段末站是终点（`station.terminal`，`marker.kind: "terminal"`），末端画线色粗框终点帽「A 终点 · 面试」（`track.end.cap.terminal`）。没有支线的线不拆。
- 分区多一段 `zone.terminal: true`，页面画成右侧独立的「面试」分段带。
- 站号接着主干编：A 线主干 A01–A05，面试 A06–A08。
- `route(model, lineId, branchId)` 在支线站之后接上面试各站，最后一站带 `terminal: true`；进度的 N 和「下一站」都按这条路线算，全部支线实战之后下一站就是面试。
- 汇流支线没有线尾，所以首页的「+N 站」改成支线最后一个代表站标签里的一行线色小胶囊（`row.kind: "more"`）；概览图里面试段只留汇流站、换乘站和终点站，被省的站数显示在终点站标签里（「M 面试 +3 站」）。没有面试段的线仍用线尾「+N 站」终点帽。
- 审计：面试段不强制 ≥3 站，`audit_resources.py` 会单独列出每条线面试段的站数；面试段出现在支线里会报结构错误。

## 资源年代标签

- 资源卡片在类型/免费标签旁边显示一个年代标签（如「2021 年基础题库」），和其他标签同一样式，不截断。
- `data.js` 只读源数据的 `era` 字段（`ALP.resources[id].era`），没有就不显示；设计侧兜底文件 `shared/resource-tags.js` 已删除。目前 12 条资源有 era，`tools/check_era.py` 核对它们在线路页（1440 与 390）都显示且不截断。
- 标题里的 emoji（源数据来自 GitHub 仓库名，例如「happy-llm: 📚 …」）显示时去掉，字体子集也不收 emoji。

## 宽地图的滚动与切边

- 布局结果有 `R.cuts`：任何标签、徽章、终点帽、段标题都不跨过的竖带 `[x0, x1]`。地图框的初始滚动位置和 scroll-snap 落点都选在竖带里；左右边缘不能同时落进竖带时，用 `clip-path: inset()` 把右缘收进最近的竖带（实色裁切，不用渐隐遮罩）。
- `check_metro.py` 的 `edgecuts` 检查首屏下有没有地图文字被滚动框左右缘切开；`docs/edgecut-check-proof.md` 记录了它能抓到旧版换乘页「A4 +7 站」的问题。
- 用户横向滑动后同样成立：`updateMapClip` 左右两侧都裁到最近的无字竖带；`edgecuts_scrolled` 在 1440 下关掉吸附、滚到 50% 和 100% 各查一次（证明见同一文档第二轮）。
- 分区标题文字由布局给出 `zone.label`（面试段带「· 终点」），布局量宽、无字竖带和渲染用的是同一串字。

## 首页概览与代表站

首页全网图不画全量站，而是 `MetroLayout.layout(MetroLayout.overview(ALP))`：

- 主干全部画出。
- 每条支线只画代表站，加上所有换乘站。代表站按以下顺序取，先有先用：
  1. `window.ALP_FEATURED`（若提供）：`{"featured": {"A1": ["入门站id", "进阶站id", "实战站id"], …}}`，按支线代码，每段 1 个，由 `data.js` 挂到 `branch.featured`。
  2. 该支线资源上的 `featured: true` / `representative: true`。
  3. 入门、进阶、实战各段的第一个（featured 文件缺失，或文件里没有这条支线时）。
- `build_data.py` 校验 featured 文件：支线代码不存在、资源 id 不存在、资源不在该支线上、某段不是恰好 1 个，都会打印 `FEATURED ERROR …` 并以退出码 1 结束；出错的条目不用，那条支线退回下一档规则。`audit_resources.py` 也会把这些列进 `docs/resources-audit.md`。
- 被省掉的站数记在 `branch.more`。布局会在支线末端画一个「A2 +10 站」终点帽，链接到该支线的线路页。
- 想换首页上的代表站：更新 `window.ALP_FEATURED` 或对应支线资源的 `featured` 字段。
- 换乘专题页用 `overview(ALP, {include: 专题的站})`，保证专题串起的站都在图上。
- 线路页用全量：`layout(ALP, {lines: [id]})`。

可读性规范（`FONTS` 与页面样式都按这个来，`check_metro.py` 会判失败）：地图站名 13px/600，站编号 12px 等宽，分段标牌 13px/700，徽章字母与「+N 站」终点帽 13px/700；地图一律 1:1 渲染，不缩小，更宽就在框内横向滚动；地图文字带与底色同色的 3.5px halo（`paint-order: stroke`）；淡化只作用于线和站点，文字改用实色暖灰褐 `#665F55`，不用透明度。HTML 中文正文 ≥16px（手机 ≥15px），行高 1.7–1.8；其他文字 ≥13px（等宽 ≥12px），字重 ≥400；全部文字 ≥4.5:1（大字 ≥3:1）。

长站名的规则：**以 JSON 里的 `short` 为准，绝不截断、不加「…」、不补空格。** 宽度超过 `FONTS.maxName`（112px）时只折行：先在空格、中英交界或汉字之间折成两行（不拆英文单词）；两行仍超宽就试三行；三行也放不下就让标签比 112px 宽，由避让和放宽间距吸收。`detectConflicts` 有 `truncation` 类型：标签各行拼起来不等于完整站名就算冲突。`check_metro.py` 在浏览器里再查一遍：SVG 站名拼接必须等于 `short`，任何站名/资源名元素被 ellipsis、line-clamp 或 overflow:hidden 裁掉都算失败（推荐理由的两行折叠是展开交互，不算）。

## 规则（违反时布局返回 `ok:false` 和中文错误清单）

1. 同一个资源出现在多条线上，就自动合并成一个换乘站。它在每条线上的分段必须相同。
2. 同一个资源在同一条线（含支线）里只能出现一次。
3. 段内顺序就是先后。不同线对同一组站的先后要求不能互相矛盾，否则形成环，排不出来。
4. 支线第一站的分段不能早于分岔站。

## 怎么加

- **加一条线**：在 `lines` 末尾加一个 Line。`color` 可以不写，颜色从 `palette` 自动取，徽标字色按 WCAG 对比度自动选黑或白。
- **加一条支线**：在对应 Line 的 `branches` 里加一个 Branch，`from` 填主干上的站。
- **加一个站**：先在 `resources` 加资源，再把 id 写进某条线某个分段的数组。
- **加一个换乘专题**：在 `transfers` 加一项。

改完后运行：

```bash
python3 tools/build_data.py           # 源 JSON 变了就先重新包装
python3 tools/audit_resources.py --md docs/resources-audit.md   # 字段缺失 / 异常审计（只读）
node tools/check_layout.js            # 首页概览、每条线全量、每个专题，正式 + 测试数据，Node 下检测
/workspace/.venv-pw/bin/python tools/check_metro.py   # 浏览器里按真实字体检测所有页面
```

两项都要是 0 冲突。

## 字体与子集化（build 的一步）

全站字体是 F1 铅印宋：中文 Noto Serif SC 400/600，标题拉丁 Fraunces 静态 600，编号 IBM Plex Mono 500。文件在 `shared/fonts/`，来源与授权见 `shared/fonts/README.md`。

- 在仓库根目录运行 `python3 tools/build_fonts.py`（需要 `fonttools` 和 `brotli`）。字符集优先使用 `shared/fonts/charset.txt`，也可从 `shared/source.js` 的全部字段（包括 `era`）、所有 HTML、`assets/*.js`、`assets/site.css`、`shared/*.js` 收集，再加 ASCII 和常用标点。
- 超过 450 KB 预算，或者源字体里缺字，构建就失败（退出码 1）。
- 数据或页面文案加了新字，更新 `shared/fonts/charset.txt`（或删除后重建）并重跑 `python3 tools/build_fonts.py`，字体就会跟着更新。
- `check_metro.py` 的 `fallback` 检查用 Chrome 的 `CSS.getPlatformFontsForNode` 看每个可见节点实际用到的字体。出现任何不是 `ALP Subset …` 的字体，就算缺字回退。

## 布局怎么算（简述）

1. **列**：每段内做最长路径分层，段与段首尾相接。所以「入门 → 进阶 → 实战」的先后天然成立，分区线落在两段之间。
2. **行**：逐列扫描。共用同一站的线在该列并成一束，间距 12px，画成一个换乘胶囊。其他线各占一道，道间距不小于 `laneSep`。位置尽量沿用上一列，再做一遍拉直，去掉小折返。
3. **列距**：每个列间距至少等于斜段高度加上站点两侧的直段。线只走水平和 45°，转角是圆角。
4. **线序和支线朝向**：枚举线的排列（不超过 6 条线时全排列），再逐线试支线向上还是向下，取折返最少、交叉最少的方案。
5. **标签**：每个站有 20 个候选位置，按贪心逐个放置，避让线、站、徽标、其他标签、分区线和分区标题。仍有冲突时放宽道距和列距重排，最多 6 档。
6. **冲突复核**：`layout().conflicts` 检查标签与标签、标签与线、标签与站或徽标、标签与分隔线、站与站、站与未经过它的线、徽标与线，以及线段角度是否只有 0°、45°、90°。

返回值的主要字段：`width`、`height`、`zones[]`、`tracks[]`（`d` 是圆角 path，`arrows` 是方向箭头，`start` 和 `end` 是起终点徽标）、`stations[]`（`marker` 是站或换乘胶囊，`label` 是位置和文本行）、`conflicts[]` 和 `model`（规范化后的数据，供 `MetroLayout.route(model, lineId, branchId)` 生成线路页和移动端竖线的站序）。

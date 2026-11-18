# 全站字体（F1 铅印宋）

字体文件由 `tools/build_fonts.py` 生成，不要手改。可在仓库根目录运行以下命令重新生成（需安装 `fonttools` 与 `brotli`）：

```bash
python3 tools/build_fonts.py
```

若部署时仓库中缺少 `.woff2` 文件，GitHub Pages 工作流（`.github/workflows/pages.yml`）会自动安装依赖并执行 `python3 tools/build_fonts.py` 构建字体后再发布。

| 文件 | 用途 | 来源 | 授权 |
|---|---|---|---|
| `NotoSerifSC-400.woff2` | 中文和拉丁正文（400） | Noto Serif SC Regular，github.com/notofonts/noto-cjk（Serif/SubsetOTF/SC） | SIL OFL 1.1，见 `LICENSE-NotoSerifSC-OFL.txt` |
| `NotoSerifSC-600.woff2` | 标题、站名、按钮等（600） | Noto Serif SC SemiBold，来源同上 | 同上 |
| `Fraunces-600-opsz72.woff2` | 标题里的拉丁字母 | Fraunces 可变字体，github.com/undercasetype/Fraunces，经 google/fonts 分发。固定 opsz 72、wght 600、SOFT 0、WONK 0，实例化为静态字重 | SIL OFL 1.1，见 `LICENSE-Fraunces-OFL.txt` |
| `IBMPlexMono-500.woff2` | 站码等编号、英文副标题、GitHub 信息 | IBM Plex Mono Medium，github.com/IBM/plex | SIL OFL 1.1，保留字体名 "Plex"，见 `LICENSE-IBMPlexMono-OFL.txt` |

- **子集。** 优先使用已提交的 `charset.txt`；若需重新收集，字符集取自 `shared/source.js` 的全部字段（包括 `era`），以及 HTML、`assets/*.js`、`assets/site.css`、`shared/*.js` 里的文字，再加 ASCII 和常用标点。emoji 不收：`data.js` 显示标题时会把 emoji 去掉。
- **改名。** OFL 规定修改版不能沿用保留字体名，子集化也算修改。所以四个文件的内部字体名统一改成 `ALP Subset …`，Plex 是必须改，其他几个也一并改了。这样缺字检查能从字体名分辨出用的是不是我们自己的字体。
- **构建时检查。** 每个文件实际包含的字写在 `coverage.json`，体积写在 `sizes.json`。超过 450 KB 预算，或者源字体缺字，构建都会以退出码 1 结束。
- **源字体位置。** 源字体缓存在仓库根目录的 `.fontsrc/`（已加入 `.gitignore`）。缺失时，脚本会按 `SOURCES` 里的地址重新下载。

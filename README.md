# AI 学习路线

一个地铁线路图风格的 AI 学习导航站，由 **Token Pi** 维护。站点只推荐并外链到经过筛选的权威网站、代码仓库和书籍，自身不托管教程正文。

- 在线地址：<https://token-pi.github.io/ai-roadmap/>

## 本地预览

站点线上部署在 `/ai-roadmap/` 子路径下，请在仓库的父目录（例如 `deploy` 目录）启动静态文件服务，以确保子路径与相对资源路径一致：

```bash
python3 -m http.server 8080
```

随后在浏览器打开：

```text
http://127.0.0.1:8080/ai-roadmap/
```

## 数据与字体

- `shared/source.js`：源资源清单（`window.ALP_SOURCE`），包含线路、支线、换乘专题与资源条目。
- `shared/data.js`：数据适配层，将 `window.ALP_SOURCE` 转换为页面与布局引擎使用的 `window.ALP`。
- `shared/fonts/`：全站子集字体（F1 铅印宋）。如需重新生成，可在仓库根目录安装 `fonttools` 与 `brotli` 后运行 `python3 tools/build_fonts.py`。

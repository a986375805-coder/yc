# 姚畅 · 简历与作品集（本地版）

简历 + 作品集单页 HTML。源码仓库已按要求设为私有，本目录为纯静态页面，可部署到任意静态托管（GitHub Pages / Vercel / Netlify / 自己的服务器）实现全网可访问。

## 本地预览

```bash
python -m http.server 8900
# 打开 http://127.0.0.1:8900
```

## 目录

- `index.html` — 简历 + 作品集主页面
- `css/styles.css` — 样式（印刷/编辑风，无框架依赖）
- `js/reveal.js` — 轻量滚动显现（尊重 reduced-motion）
- `assets/shots/` — 项目界面截图（GamePulse）
- `downloads/resume-fde.md` / `downloads/resume-aiops.md` — 简历 Markdown 下载版

## 部署提示

直接把这整个文件夹上传到任意静态托管即可，无需构建。

## 内容说明

- 页面不含任何源码仓库链接（源码已私有化）。
- 求职方向双通道：AI 产品运营 / AI 技术交付（FDE）。

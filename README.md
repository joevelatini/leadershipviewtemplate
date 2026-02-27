# Leadership View Builder · ActivTrak

An executive-ready workforce productivity report builder. Fill in your customer data on Page 1, generate the branded Leadership View on Page 2, and download as a PDF.

## 🚀 Quick Start (Local)

```bash
npm install
npm run dev
```

Open [http://localhost:5173/leadership-view/](http://localhost:5173/leadership-view/)

## 📦 Deploy to GitHub Pages

### Option A — Automatic (Recommended)
This repo uses GitHub Actions. Every push to `main` auto-deploys.

1. Push this repo to GitHub
2. Go to **Settings → Pages → Source** and set to **GitHub Actions**
3. Done — your site deploys automatically on every push to `main`

### Option B — Manual
```bash
# Update vite.config.js base to match your repo name first, then:
npm run deploy
```

## ⚙️ Configuration

**Before deploying**, update the `base` in `vite.config.js` to match your GitHub repo name:

```js
// vite.config.js
export default defineConfig({
  plugins: [react()],
  base: '/YOUR-REPO-NAME/',   // ← change this
})
```

Also update `package.json` homepage:
```json
"homepage": "https://YOUR-USERNAME.github.io/YOUR-REPO-NAME"
```

## 🗂️ Project Structure

```
src/
  App.jsx                  # Root — state management, page routing
  components/
    InputPage.jsx          # Page 1: data entry form
    InputPage.module.css
    ReportPage.jsx         # Page 2: rendered report + PDF download
    ReportPage.module.css
  index.css                # Global styles + print overrides
.github/workflows/
  deploy.yml               # Auto-deploy to GitHub Pages on push
```

## 🖨️ PDF Export

Click **Download PDF** on the report page — this triggers the browser's native print dialog. Choose "Save as PDF" as the destination. The toolbar and controls are hidden in print mode.

## ✏️ Customization

- **Salary & hours**: Editable per-report on the input page
- **Departments**: Add/remove as needed (supports 1–5+ departments)
- **Calculations**: Optimization opportunity figures auto-calculate from your inputs

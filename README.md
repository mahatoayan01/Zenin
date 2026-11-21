# ZENZI Restaurant Cafe — Demo Website

A modern, high-performance, responsive demo website for **ZENZI Restaurant Cafe** (Dhole Patil Road, Sangamvadi, Pune). Built for restaurant owner presentations and sales demos.

---

## 🚀 Quick Start

### 1. Development Server
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Production Build
```bash
npm run build
```
Build output is generated cleanly into the `/dist` directory.

### 3. Local Preview
```bash
npm run preview
```

---

## 🌐 Deployment Instructions

Because the project uses **HashRouter** (`#/`, `#/menu`, `#/location`, etc.) and relative base assets (`./`), it is 100% static and requires **zero URL rewrite rules** or server configuration.

### Deploying to Vercel
1. Push this repository to GitHub or GitLab.
2. In Vercel, click **Add New Project** and select the repository.
3. Framework Preset: **Vite**.
4. Root Directory: `./` (or leave default).
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Click **Deploy**.

### Deploying to Netlify
1. Connect repository in Netlify or drag-and-drop the `dist` folder into [Netlify Drop](https://app.netlify.com/drop).
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Click **Deploy Site**.

### Deploying to GitHub Pages
1. Build the site: `npm run build`.
2. Deploy the contents of `/dist` to your `gh-pages` branch.

---

## 🛠️ How to Edit Restaurant Data

All content, hours, dishes, prices, reviews, social links, FAQs, and demo credentials are kept in **ONE single source of truth**:
`src/data/restaurant.js`

To update:
- **Phone or WhatsApp**: Change `info.phone` and `info.whatsappNumber`.
- **Address & Map**: Update `info.address` and `info.embedMapUrl`.
- **Menu Items & Pricing**: Modify the `menu` array items.
- **Operating Hours**: Update the `hours` array.
- **Offers**: Add or edit promo codes in the `offers` array.
- **Reviews**: Add real customer reviews to the `reviews` array.
- **Demo Credentials**: Change `credentials.username` and `credentials.password`.

---

## 🖼️ How to Replace Images

All images are saved locally in `public/images/`:
- `public/images/logo.webp`: Restaurant logo.
- `public/images/hero-banner.webp`: Homepage hero image.
- `public/images/dishes/`: Dish photos matching exact dish names.
- `public/images/gallery/`: Ambiance, seating, and patio photos.
- `public/images/instagram/`: 6 Instagram grid preview photos.
- `public/images/placeholder.webp`: Universal fallback image.

To replace an image:
1. Save your new image into `public/images/dishes/` (or the appropriate folder) in `.webp` format (recommended max width 1200px, under 150 KB).
2. Update the corresponding `path` and `alt` in `src/data/restaurant.js`.
3. If replacing a sample image with an official photo, change `sample: false` and `source: "maps"` or `"owner"`.

---

## 🔐 Demo Owner Portal Credentials

- **URL**: `#/owner-login`
- **Username**: `owner`
- **Password**: `demo123`
*(Clearly marked on the login screen for easy client demonstration)*

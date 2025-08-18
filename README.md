<<<<<<< HEAD
# albumdesignplatform
=======
# Album Design Platform (MVP)

A minimal full‑stack app demonstrating **Manual** and **Automated** album design flows.

- **Frontend:** React (Vite), fetch API, simple CSS
- **Backend:** Node.js (Express), MongoDB (Mongoose), JWT auth, Multer uploads
- **Automated layout rules:** simple engine that fills pages based on fixed image ratios/limits

> This is an MVP to help you start quickly. You can layer Tailwind, shadcn/ui, sockets, and CDN later.

## Quick Start

### 1) Backend
```bash
cd server
npm i
# set env
cp .env.example .env
# edit .env (Mongo URI & JWT secret)
npm run dev
```
Server runs on **http://localhost:4000**

### 2) Frontend
```bash
cd client
npm i
npm run dev
```
App opens on **http://localhost:5173**

---

## Automated Layout Summary

Rules (from the brief):

- 16 + 2 cover pages → 50 images
- 20 + 2 cover pages → 62 images
- 30 + 2 cover pages → 92 images
- 40 + 2 cover pages → 122 images

The engine distributes images across pages with simple 1–4 image grid templates. You can replace
`src/services/autoLayout.js` with your custom logic or ImageMagick pipeline.

---

## Folder Structure

```
album-design-platform/
  server/
    src/
      models/ (User, Album, Comment)
      routes/ (auth, albums)
      services/ (autoLayout, storage)
      middleware/ (auth)
      index.js
    uploads/ (local image storage)
    package.json
    .env.example
  client/
    src/
      components/ (FlipViewer, CommentPanel, Uploader)
      pages/ (Login, Dashboard, AlbumEditor)
      api.js
      App.jsx
      main.jsx
      styles.css
    index.html
    package.json
    vite.config.js
```

## Notes

- This starter keeps things simple. For production: add Tailwind, role-based permissions, WebSocket updates,
  Cloud storage (S3/Cloudinary), CDN, and robust error handling.
- Flip viewer here is a basic page-by-page viewer (no WebGL). Swap with a library if you prefer.
>>>>>>> a1ac49d (first commit)

# 🌍 Country Explorer

A **Next.js** app for exploring countries around the world using the [REST Countries API](https://restcountries.com/). Search, filter, and favorite countries — with dynamic routing, dark mode, and server-side features.

- Built with the Next.js **Pages Router**, **Tailwind CSS**, and **Flowbite UI**.
- Deployed: https://solvd-homeworks-23-git-epar-23-next-2-duard4s-projects.vercel.app

---

## ✨ Features

- **Explore All Countries** with name, flag, and region
- **Dynamic Country Pages** with full details (capital, languages, borders, etc.)
- **Client-side Search & Filter** by name or region
- **Favorites System** using `localStorage`
- **Dark Mode** with system preference and toggle
- **Random Country Page** (SSR)
- **Custom API Route** for filtering by region
- **Custom 404 Page** for unknown countries

---

## 🛠 Tech Stack

- **Framework**: [Next.js (Pages Router)](https://nextjs.org/docs/pages)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Flowbite](https://flowbite.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Data Source**: [REST Countries API](https://restcountries.com/)

---

## 📁 Pages Overview

### `/` – All Countries (SSG)

- Uses `getStaticProps` to fetch all countries at build time
- Includes:
  - Country name, flag, and region
  - Search bar (client-side)
  - Region filter (buttons or dropdown)
  - Favorite icon (❤️) toggle via `localStorage`

### `/countries/[name]` – Country Details (SSG + Dynamic Routing)

- Uses `getStaticPaths` and `getStaticProps`
- Displays:
  - Name, flag, capital, region, population
  - Languages, currencies, timezones, and borders

### `/random` – Random Country (SSR)

- Uses `getServerSideProps`
- Randomly selects one country from all

### `/api/region` – API Route

- Accepts a `region` query param
- Returns list of countries in that region (JSON)

### `/favorites` – Favorites Page

- Displays countries marked as favorites (from `localStorage`)

### `/404` – Custom Not Found Page

- Shown when a country doesn't exist or URL is invalid

---

## 🌗 Dark Mode

- Toggle via button (manual)
- Supports system preference via `prefers-color-scheme`
- Implemented using Tailwind’s `dark` class strategy

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/country-explorer.git
cd country-explorer
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the dev server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📄 API Reference

**Base URL:** `https://restcountries.com/v3.1`
Full documentation: [https://restcountries.com/#about-this-project](https://restcountries.com/#about-this-project)

---

## 💡 Notes

- No predefined design — UI is custom-built using Tailwind + Flowbite
- Fully responsive and accessible

---

## 📦 Project Structure

```
/pages
  /index.tsx         → All countries (SSG)
  /countries/[name]  → Country details (dynamic route)
  /random.tsx        → Random country (SSR)
  /favorites.tsx     → Favorites from localStorage
  /api/region.ts     → Custom API route
  /404.tsx           → Custom 404 page

/components
  CountryCard.tsx
  CountryDetails.tsx
  Layout.tsx
  DarkModeToggle.tsx
  etc.

utils/
  api.ts            → Formatting helpers
  localStorage.ts   → Favorite and theme persistence

hooks/
  useFavorites.ts   → Hook for handling operations with favorites
  seRegionFilter.ts → Hook for managing region filtering
```

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Credits

- Data: [REST Countries](https://restcountries.com/)
- UI: [Flowbite React](https://flowbite-react.com/)

# 🌍 Country Explorer

A modern web app for exploring countries worldwide using the REST Countries API. Built with **Next.js App Router**, featuring client-side filtering, dynamic routing, localStorage-based favorites, and dark mode support. Fully responsive with a custom UI powered by Tailwind CSS and Flowbite.

**Deployed:**
https://solvd-homeworks-24-git-epar-24-next-3-duard4s-projects.vercel.app

---

## ✨ Features

- 🗺️ **Browse Countries** with name, flag, region
- 🔍 **Search & Filter** by name or region (client-side)
- 📄 **Dynamic Country Pages** with full details (capital, borders, languages, etc.)
- ❤️ **Favorites System** using `localStorage`
- 🎲 **Random Country Page** (server-side rendered)
- ☁️ **Dark Mode**, responsive to system settings and user toggle
- 🔧 **Custom API Route** for region-based filtering
- 🚫 **Custom 404 Page** for unknown or invalid countries

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS, Flowbite UI
- **Icons:** React Icons
- **Data Source:** [REST Countries API](https://restcountries.com/)

---

## 📁 Project Structure (App Router)

/`src/`
├── `app/`
│ ├── `page.tsx` – Home: All countries (fetch in client component)
│ ├── `layout.tsx` – Root layout (includes navigation, dark mode, etc.)
│ ├── `not-found.tsx` – Custom 404
│ ├── `api/region/route.ts` – API route for filtering countries by region
│ ├── `countries/[name]/page.tsx` – Dynamic country page
│ ├── `favorites/page.tsx` – LocalStorage-based favorites page
│ └── `random/page.tsx` – Server-rendered random country page

├── `components/`
│ ├── `controls/` – SearchBar, RegionFilter, ShortNav
│ ├── `country/` – CountryCard, CountryDetails, CountryGrid, InfoRow
│ ├── `favorites/` – Favorites UI: ActionBar, EmptyState, FooterStats
│ ├── `home/` – EmptyState, ErrorMessage, ResultsSummary
│ └── `layout/` – Navigation, Layout, Footer, PageHeading, DarkModeToggle

├── `hooks/` – Custom React hooks
│ ├── `useRegionFilter.ts` – Region-based filtering logic
│ ├── `useFavorites.ts` – Favorites management with `localStorage`
│ └── `useDarkMode.ts` – Dark mode system toggle & sync

├── `utils/` – Utilities
│ ├── `api.ts` – API helpers
│ └── `localStorageUtils.ts` – Theme & favorite persistence

├── `types/` – TypeScript interfaces
│ ├── `country.ts` – Country-related types
│ ├── `navlink.ts` – Navigation links
│ └── `props.ts` – Props interfaces for components

├── `styles/globals.css` – Global styles

---

## 🔄 Routing Overview (App Router)

/ – **Home**

- Displays all countries
- Search + region filter (client-side)

/countries/\[name] – **Country Details**

- Dynamic route with SSG
- Country info: capital, borders, languages, currencies, etc.

/favorites – **Favorites Page**

- Displays countries saved in `localStorage`

/random – **Random Country Page**

- SSR Randomly shows one country
- Same info as on Country Details page

/api/region – **Custom API Route**

- Input: region query param (`?region=Europe`)
- Output: JSON list of countries in that region

/404 – **Custom Not Found Page**

- Renders when an invalid country name or route is entered

---

## 🌗 Dark Mode

- Toggle manually via button
- Automatically adapts to system preference (`prefers-color-scheme`)
- Managed via `useDarkMode.ts` and `localStorage`
- Implemented using Tailwind’s `dark` variant

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/country-explorer.git
cd country-explorer

npm install    # or yarn
npm run dev    # or yarn dev
```

Visit `http://localhost:3000` to start exploring!

---

## 📄 API Reference

**Base URL:** `https://restcountries.com/v3.1`
[Full Docs](https://restcountries.com/#about-this-project)

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 🙌 Credits

- **Data:** [REST Countries API](https://restcountries.com)
- **UI:** Flowbite + Tailwind CSS
- **Framework:** Next.js App Router

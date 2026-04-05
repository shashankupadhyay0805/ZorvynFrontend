# Finance Dashboard (Frontend-only)

Clean, modern, responsive finance dashboard UI built with **React + Vite + JavaScript**, styled using **Tailwind CSS**, charted with **Recharts**, and state-managed via **Zustand**.

## Setup

```bash
npm install
npm run dev
```

## Features implemented

- **Currency**
  - Choose display currency (ISO 4217); persisted with other preferences
- **Multi-page UI**
  - Overview / Transactions / Insights pages with top navigation
- **Overview**
  - Summary cards: Total Balance, Total Income, Total Expenses
  - Charts: running balance trend (line), expense breakdown (pie)
- **Transactions**
  - Table with date/amount/category/type/description
  - **Search**, **filter** (type/category), **sorting** (date/amount)
  - **Export**: CSV + JSON
- **Role-based UI (frontend-only)**
  - Role switcher: **Viewer** (read-only) vs **Admin** (add/edit/delete)
  - UI updates dynamically based on role
- **Insights**
  - Highest spending category
  - Month-over-month net comparison
  - Cashflow ratio + activity metrics
- **UX**
  - Responsive layout (mobile/desktop)
  - Loading skeletons + empty states
  - **Dark mode** (System/Light/Dark)
- **Persistence**
  - Transactions/filters/role/theme persisted via `localStorage`

## Approach

- **Zustand store** (`src/store/useFinanceStore.js`) owns transactions, filters, role, and theme.
- **Pure utils** (`src/utils/*`) compute derived analytics (summary, trend, breakdown, insights).
- **Reusable UI components** in `src/components/ui/*` (Card, Button, Modal, etc.).
- **No backend**: seeded with mock data in `src/data/mockTransactions.js`.

## Folder structure

```txt
src/
  components/
    charts/
    insights/
    layout/
    overview/
    transactions/
    ui/
  data/
  hooks/
  pages/
    AppLayout.jsx
    OverviewPage.jsx
    TransactionsPage.jsx
    InsightsPage.jsx
  store/
  utils/
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

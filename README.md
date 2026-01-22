

# ConfiguraPro Client

ConfiguraPro Client is the customer-facing application where users configure
products created in the Admin panel.

The client only reads data from Firebase and never creates configuration options.

---

## Tech Stack

- React (Vite)
- Redux Toolkit
- Firebase Authentication
- Firebase Realtime Database
- React Router
- Bootstrap

---

## Project Structure

src/
├─ assets/
├─ components/
│  └─ layout/
│     ├─ Navbar.jsx
│     ├─ Footer.jsx
│     └─ Layout.jsx
├─ features/
│  ├─ auth/
│  ├─ cart/
│  │  └─ cartSlice.jsx
│  ├─ configurator/
│  │  ├─ configuratorSlice.jsx
│  │  └─ ConfigSummary.jsx
│  └─ pricing/
│     └─ pricingSelectors.jsx
├─ pages/
│  ├─ Auth.jsx
│  ├─ Configurator.jsx
│  ├─ Cart.jsx
│  ├─ Checkout.jsx
│  ├─ ProductList.jsx
│  └─ ProductDetails.jsx
├─ routes/
│  ├─ AppRoutes.jsx
│  └─ ProtectedRoute.jsx
├─ services/
│  ├─ authApi.jsx
│  ├─ cartService.jsx
│  ├─ orderService.jsx
│  └─ productService.jsx
├─ store/
│  └─ store.jsx
├─ utils/
│  └─ products.jsx
├─ App.jsx
└─ main.jsx

---

## How Data Is Used

Client reads product data created in Admin.

Mapping:

- product.materials → Material selection
- product.capacities → Capacity selection
- capacity.dimensions → Dimension selection

Example:
```js
const selectedCap = product.capacities.find(
  c => c.name === selectedCapacity
);

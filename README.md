# ShopApp — Mobile E-Commerce Application

## Description

ShopApp is a fully functional mobile e-commerce application built with React Native and Expo. Users can browse products fetched from the FakeStore API, search and filter by category, view product details, manage a persistent shopping cart, check out with a delivery address and payment method, and manage their profile including a photo uploaded from their gallery. The app uses a clean authentication flow with persisted login state, ensuring unauthenticated users cannot access protected screens.

---

## Features Implemented

- **Splash Screen** — Animated logo with auto-navigation after 2.5 seconds
- **Authentication** — Login and Register screens with email/password validation, persistent login via AsyncStorage, and protected navigation
- **Home Screen** — Product grid fetched from FakeStore API, live search bar, category filter chips, pull-to-refresh, and cart badge
- **Product Details** — Large image, description, rating, quantity selector, add-to-cart with confirmation alert
- **Cart Screen** — Full item list with quantity controls, remove item, subtotal and total, persisted across app reloads
- **Checkout Screen** — Delivery address form, payment method selection (Card / Transfer / Cash on Delivery), order summary
- **Order Success Screen** — Animated confirmation screen, cart cleared on confirm
- **Profile Screen** — View name and email, edit name, pick profile photo from gallery, logout with confirmation

---

## Tech Stack

- **React Native** — Core framework
- **Expo** (~51) — Development toolchain, image picker
- **React Navigation** — Stack + Bottom Tab navigators
- **Context API** — Global state management for auth and cart
- **AsyncStorage** — Persisting user session and cart data
- **FakeStore API** — `https://fakestoreapi.com` for product data

---

## Folder Structure Explanation

```
ShopApp/
├── App.jsx                      # Root: providers + navigator
├── app.json                     # Expo config (splash, icons, permissions)
├── package.json
├── babel.config.js
└── src/
    ├── components/              # Reusable UI — kept isolated so screens stay thin
    │   ├── Button.jsx           # Primary / outline / ghost variants
    │   ├── Input.jsx            # Labelled input with inline error
    │   ├── ProductCard.jsx      # Memoized product tile for FlatList
    │   ├── CartItem.jsx         # Memoized cart row with qty controls
    │   ├── LoadingSpinner.jsx   # Centered loading state
    │   └── EmptyState.jsx       # Empty list / error placeholder
    │
    ├── screens/                 # One file per screen, UI + user interaction only
    │   ├── SplashScreen.jsx
    │   ├── LoginScreen.jsx
    │   ├── RegisterScreen.jsx
    │   ├── HomeScreen.jsx
    │   ├── ProductDetailsScreen.jsx
    │   ├── CartScreen.jsx
    │   ├── CheckoutScreen.jsx
    │   ├── OrderSuccessScreen.jsx
    │   └── ProfileScreen.jsx
    │
    ├── navigation/              # Navigator definitions separate from screens
    │   ├── AppNavigator.jsx     # Root navigator — auth guard lives here
    │   ├── AuthStack.jsx        # Login / Register stack
    │   └── MainTabs.jsx         # Bottom tabs + HomeStack (details, cart, checkout)
    │
    ├── context/                 # Global state shared across the app
    │   ├── AuthContext.jsx      # User state, login/logout/updateUser
    │   └── CartContext.jsx      # Cart items, add/remove/update, persistence
    │
    ├── hooks/                   # Custom hooks abstract logic out of screens
    │   ├── useAuth.js           # Validation + auth submission logic
    │   ├── useCart.js           # Thin wrapper around CartContext
    │   └── useProducts.js       # Fetching, filtering, category selection
    │
    ├── services/                # All API calls in one place — screens never call fetch directly
    │   └── productService.js
    │
    ├── storage/                 # Centralised AsyncStorage wrapper with error handling
    │   └── storage.js
    │
    ├── constants/               # Single source of truth for design tokens
    │   └── theme.js             # COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING, RADIUS, SHADOW
    │
    └── utils/                   # Pure helper functions
        └── validators.js        # isValidEmail, isValidPassword, isNotEmpty, formatPrice
```

This structure keeps concerns separated: screens are presentation-only, hooks own logic, context owns state, and services own data fetching. Swapping the API or the storage layer only requires changes in one folder.

---

## Screenshots

> Add screenshots after running the app. Required screens:

| Screen | Screenshot |
|--------|------------|
| Splash | _add image_ |
| Login | _add image_ |
| Home | _add image_ |
| Product Details | _add image_ |
| Cart | _add image_ |
| Checkout | _add image_ |
| Profile | _add image_ |

---

## Optimization Techniques Used

### `React.memo`
- **`ProductCard`** — Wrapped in `memo()`. The Home screen renders up to 20 products in a `FlatList`. Without memoization, every product card re-renders whenever the parent state changes (e.g. search input updates). With `memo`, a card only re-renders if its own `product` or `onPress` prop changes.
- **`CartItem`** — Wrapped in `memo()`. Updating the quantity of one item would otherwise force all cart items to re-render. Memoization isolates each row.
- **`Button`, `Input`, `LoadingSpinner`, `EmptyState`** — All memoized as general-purpose components that are used across many screens.

### `useCallback`
- **`CartContext`** — `addToCart`, `removeFromCart`, `updateQuantity`, and `clearCart` are all wrapped in `useCallback`. Without this, a new function reference is created on every render, breaking the memoization of `CartItem` (memo checks props by reference).
- **`HomeScreen`** — `handleProductPress`, `renderProduct`, and `keyExtractor` are memoized with `useCallback` so `FlatList` does not recreate its item renderer on every keystroke in the search bar.
- **`CartScreen`** — `handleIncrease`, `handleDecrease`, and `handleRemove` are memoized and passed as stable props to `CartItem`.

### `useMemo`
- **`CartContext`** — `subtotal` and `itemCount` are computed with `useMemo`. The total is derived from `cartItems` and would otherwise recalculate on every render, even when the cart hasn't changed.
- **`HomeScreen`** — The filtered product list is computed with `useMemo`, so searching only re-filters when `products` or `search` changes — not on unrelated state updates.

---

## Challenges Faced

> Fill this section in honestly as you build and test the app. Examples to guide you:

- **Cart persistence on reload** — Ensuring the cart was correctly serialised to and deserialised from AsyncStorage, especially when items had nested objects, required careful JSON handling and error boundaries.
- **Auth guard timing** — During the initial AsyncStorage load, there was a brief flash of the login screen before the user was restored. This was resolved by showing the SplashScreen while `loading` is `true` in `AuthContext`.
- **FlatList performance** — Without `keyExtractor`, `useCallback` on `renderItem`, and `React.memo` on `ProductCard`, scrolling was noticeably janky on a large product list.
- **Keyboard handling** — Forms behind a soft keyboard required `KeyboardAvoidingView` with different `behavior` values per platform (`padding` on iOS, `height` on Android).

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/ShopApp.git
cd ShopApp

# 2. Install dependencies
npm install

# 3. Start the dev server
npx expo start

# 4. Scan the QR code with Expo Go (iOS or Android)
```

---

## Submission

- GitHub repo: [add your link here]
- All screens functional with no crashes
- No `node_modules` committed
- README complete ✓

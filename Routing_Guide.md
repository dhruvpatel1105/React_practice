# React Router v6: Step-by-Step Educational Guide

Welcome to the React Router learning guide! This document explains step-by-step how routing is built in your application, what each file does, and how the core hooks and components operate.

---

## 📌 1. Introduction to Client-Side Routing
In traditional websites, clicking a link requests a new HTML document from the server. This causes the browser to reload and blank out.

In a **Single Page Application (SPA)** like React, we use **Client-Side Routing**. The browser downloads the app code once. When you click a link, the router blocks the default browser refresh, updates the URL path in the address bar using the browser's History API, and dynamically swaps out the React components. This yields instantaneous transitions.

---

## 📦 Step 1: Installation and Basic Setup
To begin using React Router in any project, we must install the routing package:
```bash
npm install react-router-dom
```

### The Root Router Wrapper (`App.js` & `index.js`)
For routing to work, the entire application (or the routing branch) must be wrapped inside the `<BrowserRouter>` component. This component tracks the URL state.
Inside [App.js](file:///c:/Users/P21-0066/Documents/ReactPractice/react_practice/src/App.js), we set up the routing container:
- `<BrowserRouter>`: Listens to URL changes.
- `<Routes>`: Acts as a switch box, searching through its child elements to render the first one that matches the URL.
- `<Route>`: Maps a specific `path` to a React `element`.

---

## 🧭 Step 2: Main Navigation & Links (`Navbar.js`)
We must avoid using standard HTML anchor tags (`<a href="...">`) because they cause full page refreshes. Instead, React Router provides two components:
1. **`<Link>`**: Renders an anchor tag but intercepts clicks to change the page instantly without refreshing.
2. **`<NavLink>`**: A special version of `<Link>` that knows if it is "active" (if its link matches the current browser URL). It is used for menus and navigation headers.

### Dynamic Active Styling in [Navbar.js](file:///c:/Users/P21-0066/Documents/ReactPractice/react_practice/src/components/Navbar.js):
```javascript
<NavLink 
  to="/about" 
  className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
>
  About
</NavLink>
```
*Note: The `end` attribute is added to the Home link (`to="/"`) so that it doesn't stay highlighted when visiting sub-pages like `/about`.*

---

## 🎮 Step 3: Programmatic Navigation (`About.js`)
Sometimes you need to redirect the user automatically (e.g., after they submit a form, log out, or click a custom back button). For this, we use the `useNavigate` hook.

Inside [About.js](file:///c:/Users/P21-0066/Documents/ReactPractice/react_practice/src/pages/About.js):
```javascript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// 1. Move to a specific route
navigate('/');

// 2. Go back in browser history
navigate(-1);

// 3. Move to a route and pass state data
navigate('/products', { state: { searchTip: 'electronics' } });
```

---

## 🏷️ Step 4: Dynamic Routes & Route Parameters (`ProductDetail.js`)
Dynamic routing allows you to use a single component to display items dynamically based on their ID in the URL.
We define a dynamic parameter by prefixing it with a colon (`:`) in [App.js](file:///c:/Users/P21-0066/Documents/ReactPractice/react_practice/src/App.js):
```javascript
<Route path="/products/:productId" element={<ProductDetail />} />
```
*If a user visits `/products/101`, the value `101` is mapped to the variable `productId`.*

Inside [ProductDetail.js](file:///c:/Users/P21-0066/Documents/ReactPractice/react_practice/src/pages/ProductDetail.js), we extract the value using the `useParams()` hook:
```javascript
import { useParams } from 'react-router-dom';

const { productId } = useParams(); // Returns { productId: "101" }
```

---

## 🔍 Step 5: Query String Parameters (`Products.js`)
Query parameters appear at the end of a URL after a question mark (e.g., `/products?category=Tech&sort=price`). They are commonly used for filtering and sorting list states.
We handle query strings using the `useSearchParams` hook, which functions similarly to React's standard `useState`.

Inside [Products.js](file:///c:/Users/P21-0066/Documents/ReactPractice/react_practice/src/pages/Products.js):
```javascript
import { useSearchParams } from 'react-router-dom';

const [searchParams, setSearchParams] = useSearchParams();

// 1. Read query parameters
const category = searchParams.get('category') || 'All';

// 2. Update query parameters in the URL
const handleCategoryChange = (newCategory) => {
  const newParams = new URLSearchParams(searchParams);
  newParams.set('category', newCategory);
  setSearchParams(newParams); // Updates URL to: /products?category=newCategory
};
```

---

## 🗂️ Step 6: Nested Routes & Layouts (`Dashboard.js`)
Nested routes let you build complex multi-layered interfaces (like dashboards or admin workspaces) where child elements are rendered inside a parent layout.
We configure nested routes inside [App.js](file:///c:/Users/P21-0066/Documents/ReactPractice/react_practice/src/App.js):
```javascript
<Route path="/dashboard" element={<Dashboard />}>
  <Route path="profile" element={<DashboardProfile />} />
  <Route path="settings" element={<DashboardSettings />} />
</Route>
```

To tell the parent component where to display the children, we place the `<Outlet />` component inside [Dashboard.js](file:///c:/Users/P21-0066/Documents/ReactPractice/react_practice/src/pages/Dashboard.js):
```javascript
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-content">
        {/* Child components (Profile or Settings) mount here */}
        <Outlet />
      </main>
    </div>
  );
}
```

---

## 🔒 Step 7: Protected Routes (Auth Guards)
You can restrict specific parts of your application from public access (e.g. Dashboard) by using a Route Guard component.
We wrap the protected page with a custom `<ProtectedRoute>` component inside [App.js](file:///c:/Users/P21-0066/Documents/ReactPractice/react_practice/src/App.js):
```javascript
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### The Redirect-Back Pattern:
Inside [ProtectedRoute.js](file:///c:/Users/P21-0066/Documents/ReactPractice/react_practice/src/components/ProtectedRoute.js), if the user is unauthenticated, we redirect them to `/login`, but we pass their current location in the navigation state:
```javascript
import { Navigate, useLocation } from 'react-router-dom';

const location = useLocation();
if (!isAuthenticated) {
  return <Navigate to="/login" state={{ from: location }} replace />;
}
```

Inside [Login.js](file:///c:/Users/P21-0066/Documents/ReactPractice/react_practice/src/pages/Login.js), once authentication succeeds, we navigate the user back to the route they initially wanted to visit:
```javascript
const location = useLocation();
const from = location.state?.from?.pathname || '/dashboard';

const handleLoginSuccess = () => {
  // Redirect back and use replace:true so the /login page is removed from history
  navigate(from, { replace: true });
};
```

---

## ⚠️ Step 8: Catch-All 404 Pages (`NotFound.js`)
To handle instances where a user enters an invalid URL, we place a wildcard route at the very bottom of our routing definitions in [App.js](file:///c:/Users/P21-0066/Documents/ReactPractice/react_practice/src/App.js):
```javascript
<Route path="*" element={<NotFound />} />
```
The asterisk (`*`) acts as a catch-all that matches any path that wasn't captured by the routes above it.

---

## 🎮 Playground Testing & Verification Instructions

To test your application locally, launch the development server:
```bash
npm start
```

1. **Verify Navbar Active State:** Click around Home, About, and Products. Notice the header buttons change styles.
2. **Verify query strings:** Go to **Products** and click "Tech" or "Fashion". Notice the URL address bar updates instantly without reloading, and only matching cards display.
3. **Verify Route Params:** Click "View Details" on a product. Check the details page and verify that the URL matches `/products/101`, etc.
4. **Verify Auth Redirect Guard:** Log out (if logged in) and click **Dashboard** in the header. Notice that the page instantly blocks access and redirects you to `/login`.
5. **Verify Redirect-Back:** In the login form, type `admin` for the username and `password` for the password, then click Authenticate. The app will log you in and redirect you directly to the protected dashboard page.
6. **Verify 404 Fallback:** Enter a random address in the browser bar, e.g. `http://localhost:3001/invalid-route`. The 404 Catch-All Page will display.

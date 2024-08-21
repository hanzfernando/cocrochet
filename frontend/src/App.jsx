import MainLayout from "./layouts/MainLayout.jsx"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from "react-router-dom"

// User
import HomePage from "./pages/HomePage.jsx"
import ShopPage from "./pages/ShopPage.jsx"
import ProductPage from "./pages/ProductPage.jsx"
import CartPage from "./pages/CartPage.jsx"

// Auth
import LoginPage from "./pages/LoginPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"

// Admin
import ProductManagementPage from "./pages/ProductManagementPage.jsx"

import { useAuthContext } from "./hooks/useAuthContext.js"

const App = () => {
  const { user } = useAuthContext()

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />} >
        <Route index path="/" element={<HomePage />}/>
        <Route path="/shop" element={<ShopPage />}/>
        <Route path="/shop/:productId" element={<ProductPage />} />
        <Route path="/cart" element={!user ? <LoginPage /> : <CartPage />} />

        {/* Auth */}
        <Route path="/login" element={!user ?  <LoginPage /> : <Navigate to='/' />} />
        <Route path="/signup" element={!user ?  <SignupPage /> : <Navigate to='/' />} />

        {/* Admin */}
        <Route path="/product-management" element={user && user.role === 'admin' ? <ProductManagementPage /> : <Navigate to='/login' />} />

        
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
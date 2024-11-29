import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SlideInfinito from "./components/slideInfinito/SlideInfinto";
import Navbar from "./layout/navbar/Navbar";
import Home from "./components/home/Home";
import Todos from "./pages/Todos";
import ProductList from "./components/card/ProductList";
import DetailProduct from "./pages/DetailProduct";
import PageNotFound from "./pages/PageNotFound";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Footer from "./layout/footer/Footer";
import MyAccount from "./pages/MyAccount";
import OrderConfirmation from "./pages/OrderConfirmation";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <SlideInfinito />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/todos" element={<Todos />} />
              <Route path="/carteras" element={<ProductList />} />
              <Route path="/billeteras" element={<ProductList />} />
              <Route path="/mochilas" element={<ProductList />} />
              <Route path="/riñoneras" element={<ProductList />} />
              <Route path="/product/:id" element={<DetailProduct />} />
              {/* Rutas públicas */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Rutas protegidas */}
              <Route
                path="/mi-cuenta"
                element={
                  <ProtectedRoute>
                    <MyAccount />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-confirmation/:orderId"
                element={
                  <ProtectedRoute>
                    <OrderConfirmation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/carrito"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

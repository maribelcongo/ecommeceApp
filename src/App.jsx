// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import SlideInfinito from "./components/slideInfinito/SlideInfinto";
// import Navbar from "./layout/navbar/Navbar";
// import Home from "./components/home/Home";
// import Todos from "./pages/Todos";
// import ProductList from "./components/card/ProductList";
// import DetailProduct from "./pages/DetailProduct";
// import PageNotFound from "./pages/PageNotFound";
// import Checkout from "./pages/Checkout";
// import Login from "./pages/Login";
// import Footer from "./layout/footer/Footer";
// import MyAccount from "./pages/MyAccount";
// import OrderConfirmation from "./pages/OrderConfirmation";
// import Cart from "./pages/Cart";
// import Register from "./pages/Register";
// import ProtectedRoute from "./context/ProtectedRoute";
// import MyOrders from "./pages/MyOrders";
// import { NotificationProvider } from "./context/NotificationContext";

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <div className="app-container">
//           <SlideInfinito />
//           <Navbar />
//           <main>
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/todos" element={<Todos />} />
//               <Route path="/carteras" element={<ProductList />} />
//               <Route path="/billeteras" element={<ProductList />} />
//               <Route path="/mochilas" element={<ProductList />} />
//               <Route path="/riñoneras" element={<ProductList />} />
//               <Route path="/product/:id" element={<DetailProduct />} />
//               {/* Rutas públicas */}
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />

//               {/* Rutas protegidas */}
//               <Route
//                 path="/mi-cuenta"
//                 element={
//                   <ProtectedRoute>
//                     <MyAccount />
//                   </ProtectedRoute>
//                 }
//               />
//               {/* Ruta para ver las órdenes */}
//               <Route
//                 path="/ordenes"
//                 element={
//                   <ProtectedRoute>
//                     <MyOrders />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/checkout"
//                 element={
//                   <ProtectedRoute>
//                     <Checkout />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/order-confirmation/:orderId"
//                 element={
//                   <ProtectedRoute>
//                     <OrderConfirmation />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route path="/carrito" element={<Cart />} />

//               <Route path="*" element={<PageNotFound />} />
//             </Routes>
//           </main>
//           <Footer />
//         </div>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext"; // Asegúrate de importar NotificationProvider

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
import MyOrders from "./pages/MyOrders";

function App() {
  return (
    <Router>
      <NotificationProvider>
        {" "}
        {/* Envolver la aplicación en NotificationProvider */}
        <AuthProvider>
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
                  path="/ordenes"
                  element={
                    <ProtectedRoute>
                      <MyOrders />
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
                <Route path="/carrito" element={<Cart />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </NotificationProvider>{" "}
      {/* Cerrar el NotificationProvider */}
    </Router>
  );
}

export default App;

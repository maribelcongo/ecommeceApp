import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SlideInfinito from "./components/slideInfinito/SlideInfinto";
import Navbar from "./layout/navbar/Navbar";
import Home from "./components/home/Home";
import Carteras from "./pages/Carteras";
import Billeteras from "./pages/Billeteras";
import Mochilas from "./pages/Mochilas";
import Riñoneras from "./pages/Riñoneras";
import PageNotFound from "./pages/PageNotFound";
import ProductList from "./components/card/ProductList";
import Footer from "./layout/footer/Footer";
import MyAccount from "./pages/MyAccount"; 

function App() {
	return (
		<AuthProvider>
			<Router>
				<div>
					<SlideInfinito />
					<Navbar />
				</div>

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Todos" element={<ProductList />} />
				<Route path="/carteras" element={<ProductList />} />
				<Route path="/billeteras" element={<ProductList />} />
				<Route path="/mochilas" element={<ProductList />} />
				<Route path="/riñoneras" element={<ProductList />} />
					<Route path="/mi-cuenta" element={<MyAccount />} />
					<Route path="*" element={<PageNotFound />} /> {/* Página 404 */}
				</Routes>

				<Footer />
			</Router>
		</AuthProvider>
	);
}

export default App;


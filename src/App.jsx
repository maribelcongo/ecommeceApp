import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Carousel from "./components/home/carousel";
import SlideInfinito from "./components/slideInfinito/SlideInfinto";
import Navbar from "./layout/navbar/Navbar";
import Home from "./components/home/Home";
import Carteras from "./pages/Carteras";
import Billeteras from "./pages/Billeteras";
import Mochilas from "./pages/Mochilas";
import Riñoneras from "./pages/Riñoneras";
import Footer from "./layout/footer/footer";
import PageNotFound from "./pages/PageNotFound";
import ProductList from "./components/card/ProductList";

function App() {
	return (
		<Router>
			<div>
				<SlideInfinito />
			</div>
			<div>
				<Navbar />
			</div>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/Todos" element={<ProductList />} />
				<Route path="/carteras" element={<ProductList />} />
				<Route path="/billeteras" element={<ProductList />} />
				<Route path="/mochilas" element={<ProductList />} />
				<Route path="/riñoneras" element={<ProductList />} />
				<Route path="*" element={<PageNotFound />} /> {/* Página 404 */}
			</Routes>

			<Footer />
		</Router>
	);
}

export default App;

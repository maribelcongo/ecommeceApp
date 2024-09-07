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

function App() {
	return (
		<>
			<Router>
				<div>
					<SlideInfinito />
				</div>
				<div>
					<Navbar />
				</div>
				<div>
					<Carousel />
				</div>

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/carteras" element={<Carteras />} />
					<Route path="/billeteras" element={<Billeteras />} />
					<Route path="/mochilas" element={<Mochilas />} />
					<Route path="/riñoneras" element={<Riñoneras />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</Router>
			<Footer />
		</>
	);
}

export default App;

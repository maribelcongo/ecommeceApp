import "./slideInfinito.css";
import { FaTruckFast } from "react-icons/fa6";
import { FaShoppingCart, FaGift } from "react-icons/fa";

export const SlideInfinito = () => {
	return (
		<div className="container">
			<ul className="list list1">
				<li>
					{" "}
					<FaGift style={{ marginRight: "5px" }} />
					Promociones
				</li>
				<li>
					<FaTruckFast /> Envío gratis a todo el pais
				</li>
				<li> disfruta de 3 , 6 ,9 Cuotas sin interés</li>

				<li>
					<FaShoppingCart style={{ marginRight: "5px" }} />
					muchas cositas lindas
				</li>
				<li>
					<FaGift style={{ marginRight: "5px" }} />
					Promociones
				</li>
				<li>
					<FaTruckFast /> Envío gratis a todo el pais
				</li>
				<li> disfruta de 3 , 6 ,9 Cuotas sin interés</li>

				<li>
					<FaShoppingCart style={{ marginRight: "5px" }} />
					muchas cositas lindas
				</li>
			</ul>
		</div>
	);
};

export default SlideInfinito;

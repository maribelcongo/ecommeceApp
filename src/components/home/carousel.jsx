import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "./carousel.css";

import carousel2 from "../../assets/carousel_b.jpg";
import carousel3 from "../../assets/carousel_c.jpg";
import carousel4 from "../../assets/carousel_a.jpg";
const Carousel = () => {
	const images = [
		{ src: carousel4, alt: "envio", className: "carousel_img" },
		{ src: carousel2, alt: "cartel", className: "carousel_img" },
		{ src: carousel3, alt: "cartel", className: "carousel_img" },
	];

	return (
		<div className="carousel-container">
			<Splide
				options={{
					type: "loop",
					perPage: 1,
					autoplay: true,
					interval: 3000,
					arrows: true,
					pagination: true,
				}}
			>
				{images.map((image, index) => (
					<SplideSlide key={index}>
						<img
							src={image.src}
							alt={image.alt}
							className={`carousel-image ${image.className}`}
						/>
					</SplideSlide>
				))}
			</Splide>
		</div>
	);
};

export default Carousel;

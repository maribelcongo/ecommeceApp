import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

import carousel1 from "../../assets/carouselb.jpg";
import carousel2 from "../../assets/carouselc.jpg";
import carousel3 from "../../assets/carousela.jpg";
import "./carousel_home.css";

const Carousel_home = () => {
  const images = [
    { src: carousel1, alt: "envio", className: "carousel_img" },
    { src: carousel2, alt: "cartel", className: "carousel_img" },
    { src: carousel3, alt: "cartel", className: "carousel_img" },
  ];

  return (
    <div className="carousel-box">
      <Splide
        options={{
          type: "loop",
          perPage: 1,
          autoplay: true,
          interval: 3000,
          arrows: false,
          pagination: false,
        }}
      >
        {images.map((image, index) => (
          <SplideSlide key={index}>
            <img
              src={image.src}
              alt={image.alt}
              className={`carousel-home ${image.className}`}
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Carousel_home;

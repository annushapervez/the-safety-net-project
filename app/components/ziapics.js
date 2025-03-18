"use client";

import { Box, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// List all images manually from the "photos" folder in public
const imagePaths = Array.from({ length: 35 }, (_, index) => `/zia/${index + 1}.png`);

const PhotoSlider = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 4 pictures at a time
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />, // Custom next arrow
    prevArrow: <SamplePrevArrow />, // Custom previous arrow
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <Box w="100%" overflow="visible" >
      <Slider key={imagePaths.length} {...settings}>
        {imagePaths.map((src, index) => (
          <Box key={index} mx={2} >
            <Image
              src={src}
              alt={`Photo ${index + 1}`}
              width="250px"
              height="350px"
              objectFit="cover"
              borderRadius="md"
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

// Custom Arrow Components
const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        zIndex: 1,
        position: "absolute",
        right: "0px", // Position to the right
        top: "50%",
        transform: "translateY(-50%)", // Center vertically
        fontSize: "24px", // Adjust size
        color: "#2c3d90", // Color of the arrow
        cursor: "pointer",
      }}
      
    >
<img src="/right.png" alt="Next" style={{ width: "30px", height: "30px" }} />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        zIndex: 1,
        position: "absolute",
        left: "-35px", // Position to the left
        top: "50%",
        transform: "translateY(-50%)", // Center vertically
        fontSize: "24px", // Adjust size
        color: "#2c3d90", // Color of the arrow
        cursor: "pointer",
      }}
    >
<img src="/left.png" alt="Next" style={{ width: "30px", height: "30px" }} />
    </div>
  );
};

export default PhotoSlider;

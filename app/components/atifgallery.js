"use client";

import { Box } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideUpWhenVisible from '../components/SlideUpwhenVisible.js'; // Ensure the path is correct
import Image from "next/image"; // Use Next.js Image


// List all images manually from the "photos" folder in public
const imagePaths = [
    "/atif/DSC_6452.jpg",
    "/atif/DSC_6458.jpg",
    "/atif/DSC_6459.jpg",
    "/atif/DSC_6467.jpg",
    "/atif/DSC_6468.jpg",
    "/atif/DSC_6476.jpg",
    "/atif/DSC_6478.jpg",
    "/atif/DSC_6480.jpg",
    "/atif/DSC_6484.jpg",
    "/atif/DSC_6489.jpg",
    "/atif/DSC_6490.jpg",
    "/atif/DSC_6492.jpg",
    "/atif/DSC_6494.jpg",
    "/atif/DSC_6500.jpg",
    "/atif/DSC_6502.jpg",
    "/atif/DSC_6505.jpg",
    "/atif/DSC_6510.jpg",
    "/atif/DSC_6516.jpg",
    "/atif/DSC_6524.jpg",
    "/atif/DSC_6531.jpg",
    "/atif/DSC_6533.jpg",
    "/atif/DSC_6538.jpg",
    "/atif/DSC_6541.jpg",
    "/atif/DSC_6547.jpg",
    "/atif/DSC_6558.jpg",
    "/atif/DSC_6564.jpg",
    "/atif/DSC_6568.jpg",
    "/atif/DSC_6570.jpg",
    "/atif/DSC_6572.jpg",
    "/atif/DSC_6578.jpg",
    "/atif/DSC_6581.jpg",
    "/atif/DSC_6589.jpg",
    "/atif/DSC_6599.jpg",
    "/atif/DSC_6603.jpg",
    "/atif/DSC_6608.jpg",
    "/atif/DSC_6610.jpg",
    "/atif/DSC_6617.jpg",
    "/atif/DSC_6626.jpg",
    "/atif/DSC_6629.jpg",
    "/atif/DSC_6643.jpg",
    "/atif/DSC_6650.jpg",
    "/atif/DSC_6660.jpg",
    "/atif/DSC_6664.jpg",
    "/atif/DSC_6667.jpg",
    "/atif/DSC_6670.jpg",
    "/atif/DSC_6681.jpg",
    "/atif/DSC_6685.jpg",
    "/atif/DSC_6689.jpg",
    "/atif/DSC_6697.jpg",
    "/atif/DSC_6707.jpg",
    "/atif/DSC_6720.jpg",
    "/atif/DSC_6723.jpg",
    "/atif/DSC_6727.jpg",
    "/atif/DSC_6728.jpg",
    "/atif/DSC_6730.jpg",
    "/atif/DSC_6735.jpg",
  ];
  
const PhotoSlider = () => {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 4, // Show 4 pictures at a time
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />, // Custom next arrow
    prevArrow: <SamplePrevArrow />, // Custom previous arrow
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <Box w="100%" overflow="visible" align="center">
    <SlideUpWhenVisible>
      <Slider key={imagePaths.length} {...settings}>
        {imagePaths.map((src, index) => (
          <Box key={index} mx={2}>
           <Image
  src={src}
  alt={`Photo ${index + 1}`}
  width={300} // ✅ Use explicit width
  height={450} // ✅ Use explicit height
  style={{ 
    objectFit: "cover", // Ensures the image fills the box
    height: "450px", // ✅ Forces height
    borderRadius: "8px"
  }}   
  loading="lazy"
/>
          </Box>
        ))}
      </Slider>
    </SlideUpWhenVisible>
  </Box>
  
  )
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
        right: "-30px", // Position to the right
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
        left: "-10px", // Position to the left
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

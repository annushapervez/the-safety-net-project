"use client";

import { Box, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideUpWhenVisible from '../components/SlideUpwhenVisible.js';
import { useMediaQuery } from "@chakra-ui/react";

const excludeIndices = [6,10,12,13,15,17,19,20,22];
const firstSlideImages = [24, 14, 21, 35]; 

const imagePaths = [
  ...firstSlideImages.map(num => `/zia/${num}.png`),
  ...Array.from({ length: 35 }, (_, index) => index + 1)
    .filter(num => !excludeIndices.includes(num) && !firstSlideImages.includes(num))
    .map(num => `/zia/${num}.png`)
];
const PhotoSlider = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 4, 
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />, 
    responsive: [
      {
        breakpoint: 1400, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box w="100%" maxW="95%" mx="auto" position="relative">
    <SlideUpWhenVisible>
      <Slider key={imagePaths.length} {...settings}>
        {imagePaths.map((src, index) => (
          <Box key={index} px={isMobile ? 1 : 3}> 
            <Image
              src={src}
              alt={`Photo ${index + 1}`}
              width={300}
              height={450}
              style={{
                objectFit: "cover",
                height: "450px",
                borderRadius: "8px",
                width: "100%", 
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
    
    const SampleNextArrow = (props) => {
      const { onClick } = props; 
    
      return (
        <div
          onClick={onClick}
          style={{
            zIndex: 1,
            position: "absolute",
            right: "-30px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "24px",
            color: "#2c3d90",
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
            left: "-30px", 
            top: "50%",
            transform: "translateY(-50%)", 
            fontSize: "24px",
            color: "#2c3d90", 
            cursor: "pointer",
          }}
        >
    <img src="/left.png" alt="Next" style={{ width: "30px", height: "30px" }} />
        </div>
      );
    };
    
    export default PhotoSlider;
    
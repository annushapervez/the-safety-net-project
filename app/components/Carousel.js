import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Flex, Text } from "@chakra-ui/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Button } from "@chakra-ui/react";

import { Autoplay } from "swiper/modules";

const ImageCarousel = () => {
  return (
    <Flex direction={{ base: "column", md: "row" }} width="100%" height="520px" >
      {/* Left Side: Text (1/3 width) */}
      <Box
        flex="1"
        p={4}
        bg="gray.50"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center" // Center horizontally
        textAlign="center" // Center text
      >
        <Text 
          fontSize="4xl" 
          fontWeight="500" 
          color="#2c3d90" 
          letterSpacing="-2px" // Reduces space between letters
          lineHeight="1.2" // Slightly reduces line spacing
          fontFamily="'Open Sauce One', sans-serif"
        >
          “We are not what we know but what we are willing to learn”
        </Text>
        <Text 
          fontSize="xl" 
          color="#2c3d90" 
          letterSpacing="-1.5px"  
          fontFamily="'Open Sauce One', sans-serif" 
          mt={5}
        >
          Welcome to our new website. The Safety Net Project is a non-profit organization dedicated to providing support and safety for children around the world. This website acts as our virtual headquarters where we will discuss projects, ideas, and resources.
        </Text>
      { /* <Flex justifyContent="center" mt={4}>
          <Button 
            mt={4} // Adds spacing from text
            px={12} // Horizontal padding
            py={6} // Vertical padding
            fontSize="lg"
            fontWeight="bold"
            color="#2c3d90"
            border="2px" 
            bg="transparent" // Transparent background
            borderRadius="0" // Sharp edges like the first image
            width="fit-content" // Makes width match text size
            _hover={{ bg: "#2c3d90", color: "white" }} // Hover effect
          >
            LEARN MORE
          </Button> 
        </Flex>*/}
      </Box>

      {/* Right Side: Carousel (2/3 width) */}
      <Box flex="2.5" minW="0"> {/* ✅ Ensures Swiper gets correct width */}
        <Swiper
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={900}
          loop={true}
          effect="slide" // Keep the slide effect (no fading)

          loopAdditionalSlides={0}
          modules={[Autoplay]}
          style={{ width: "100%", height: "100%" }}
        >
          {[1, 2, 3].map((num, index) => (
            <SwiperSlide key={index}>
              <img
                src={`/${num}.jpg`}
                alt={`Image ${num}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Flex>
  );
};

export default ImageCarousel;

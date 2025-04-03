import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Flex, Text, Link} from "@chakra-ui/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Button } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

import { Autoplay } from "swiper/modules";

const ImageCarousel = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)"); // ✅ Move inside the component

  return (
    <Flex direction={{ base: "column", md: "row" }} width="100%" height="520px">
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
         mt={{base:3, md:0}}
          fontSize={{base: "2.1rem", md:"4xl"}}
          fontWeight="500" 
          color="#2c3d90" 
          maxW={{ base: "95%", md: "100%" }}
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
          mt={3}
        >
          Welcome to our new website. The Safety Net Project is a non-profit organization dedicated to providing support and safety for children around the world. This website acts as our virtual headquarters where we will discuss projects, ideas, and resources.
        </Text>
        <Link  href="/our-team" _hover={{ textDecoration: "none" }}> 
    <Flex justifyContent="center" mt={4}>
    <Button
  mt={isMobile ? 0 : 4}// Horizontal padding changes based on screen size
  px={isMobile ? 10 : 12}// Horizontal padding changes based on screen size
  py= {6 }  // Vertical padding changes based on screen size
  fontSize={isMobile ? "md" : "lg"}// Font size adjusts for mobile and desktop
  fontWeight="bold"
  color="#2c3d90"
  border="2px"
  bg="transparent"
  borderRadius="0"
  _hover={{ bg: "#2c3d90", color: "white" }}
  display="flex"  // Ensures button content is aligned correctly vertically
  mx={isMobile ? "auto" : "0"}// Centers on mobile, left-aligned on desktop
  mb={isMobile ? 3: 0}
>
            OUR TEAM
          </Button> 
        </Flex>
        </Link>
      </Box>

      {/* Right Side: Carousel (2/3 width) */}
      <Box flex="2.5" minW="0"> {/* ✅ Ensures Swiper gets correct width */}
        <Swiper
          slidesPerView={1}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
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

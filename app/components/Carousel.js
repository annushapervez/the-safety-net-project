import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Flex, Text, Link} from "@chakra-ui/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Button } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

import { Autoplay } from "swiper/modules";

const ImageCarousel = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <Flex direction={{ base: "column", md: "row" }} width="100%" height="520px">
      <Box
        flex="1"
        p={4}
        bg="gray.50"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center" 
        textAlign="center"
      >
        <Text 
         mt={{base:3, md:0}}
          fontSize={{base: "2.1rem", md:"3xl", xl:"4xl"}}
          fontWeight="500" 
          color="#2c3d90" 
          maxW={{ base: "95%", md: "100%" }}
          letterSpacing="-2px" 
          lineHeight="1.2" 
          fontFamily="'Open Sauce One', sans-serif"
        >
          “We are not what we know but what we are willing to learn”
        </Text>
        <Text 
          fontSize={{base: "xl", md:"lg", xl:"xl"}}
          color="#2c3d90" 
          letterSpacing="-1.5px"  
          fontFamily="'Open Sauce One', sans-serif" 
          mt={3}
        >
          Welcome to our new website. The Safety Net Project is a non-profit organization dedicated to providing support and safety for children around the world. This website acts as our virtual headquarters where we will discuss projects, ideas, and resources.
        </Text>
        <Link  href="/Explore" _hover={{ textDecoration: "none" }}> 
    <Flex justifyContent="center" mt={4}>
    <Button
  mt={isMobile ? 0 : 4}
  px={isMobile ? 10 : 12}
  py= {6 } 
  fontSize={isMobile ? "md" : "lg"}
  fontWeight="bold"
  color="#2c3d90"
  border="2px"
  bg="transparent"
  borderRadius="0"
  _hover={{ bg: "#2c3d90", color: "white" }}
  display="flex" 
  mx={isMobile ? "auto" : "0"}
  mb={isMobile ? 3: 0}
>
            EXPLORE
          </Button> 
        </Flex>
        </Link>
      </Box>

      <Box flex="2.5" minW="0"> 
        <Swiper
          slidesPerView={1}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          speed={900}
          loop={true}
          effect="slide"

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

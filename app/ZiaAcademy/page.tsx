"use client";
import {
  Box,
  Text,
  Heading,
  Image,
  Flex,
  VStack,
  HStack,
  ChakraProvider,
} from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PhotoSlider from "../components/atifgallery"; // Import the new component
import Ziaslider from "../components/ziapics"; // Import the new component

import FundAllocation from "../components/FundAllocation"; // Import the FundAllocation component




const ZiaAcademyPage = () => {
  return (
    <ChakraProvider>
      <>
        <Header />
        <Flex direction="column" align="center" justify="center" p={8} bg="gray.100">
          {/* About Section */}
          <Flex
            direction={{ base: "column", md: "row" }}
            align="stretch"
            justify="center"
            w="100%"
            maxW="1200px"
            gap={0}
          >
            {/* Image Box */}
            <Box flex="1" position="relative">
              <Image
                src="/about.jpg"
                alt="Young girl with face paint"
                objectFit="cover"
                width="100%"
                height="100%"
                boxShadow="lg"
                borderTopLeftRadius="lg"
                borderBottomLeftRadius="lg"
              />
            </Box>

            {/* Text Box */}
            <VStack
              flex="1"
              align="start"
              spacing={4}
              p={{ base: 6, md: 8 }}
              bg="white"
              borderTopRightRadius="lg"
              borderBottomRightRadius="lg"
              boxShadow="lg"
            >
              <HStack>
                <Image src="/logo.jpg" alt="The Safety Net Project Logo" boxSize="50px" />
                <Heading as="h2" size="2xl" fontWeight="400" letterSpacing="-2px" lineHeight="1.2" color="#2c3d90">
                  About
                </Heading>
              </HStack>
              <Text
            fontSize="xl"
            fontFamily="Open Sauce One, sans-serif"
            fontWeight="400"
            color="#5F5D5D"
            letterSpacing="-1.2px">
                The Zia Academy is an educational institution that doubles as a home for over 70 girls. These girls are from rural areas spread throughout Balochistan, Quetta, Kashmir, and more. The teachers working here exemplify multifaceted talents by not only taking on an educational role but also providing support and comfort to the students.
              </Text>
              <Text
            fontSize="xl"
            fontFamily="Open Sauce One, sans-serif"
            fontWeight="400"
            color="#5F5D5D"
            letterSpacing="-1.2px">
                              The Safety Net Project was founded with a simple desire to bridge the gap for marginalized people from rural communities. Our goal is to support youth and serve as a safety net for those who need it. On average, donations, especially those distributed from the USA, tend to get distributed amongst popular urban areas. This creates a gap in the resources provided to those who are situated in the most inconvenient, “middle of nowhere,” and ultimately rural areas. Our goal is to change this.
              </Text>
              <Text
            fontSize="xl"
            fontFamily="Open Sauce One, sans-serif"
            fontWeight="400"
            color="#5F5D5D"
            letterSpacing="-1.2px">
                           Our goal is not only to support essential living conditions when we approach this collaboration with The Zia Academy but to also provide resources that can empower the girls to build their own careers and achieve self-sufficiency down the road.
              </Text>
            </VStack>
          </Flex>
 {/* Photographs Section */}
 
 <VStack mt={12} w="100%" maxW="1200px" >
 <Heading as="h2" size="2xl" fontWeight="400" letterSpacing="-2px" lineHeight="1.2" color="#2c3d90">             
  Photographs
            </Heading>
            <Text fontSize="xl" color="#5F5D5D" mb={6} fontWeight="400" letterSpacing="-1.2px">
              Atif Productions 2025
            </Text>
            {/* Use the PhotoSlider component here */}
            <PhotoSlider />
          </VStack>
           {/* Fund Allocation Section */}
           <VStack mt={16} w="100%" maxW="1200px">
            <FundAllocation />
          </VStack>
          <VStack mt={12} w="100%" maxW="1200px" >

          <Heading as="h2" size="2xl" fontWeight="400" letterSpacing="-2px" lineHeight="1.2" color="#2c3d90">             
  Photographs
            </Heading>
            <Text fontSize="xl" color="#5F5D5D" mb={6} fontWeight="400" letterSpacing="-1.2px">
            The Zia Academy Throughout the Years
            </Text>
            <Ziaslider />
            </VStack>


        </Flex>
        <Footer />
      </>
    </ChakraProvider>
  );
};

export default ZiaAcademyPage;

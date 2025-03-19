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
  Link,
} from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PhotoSlider from "../components/atifgallery"; // Import the new component
import Ziaslider from "../components/ziapics"; // Import the new component
import FundAllocation from "../components/FundAllocation"; // Import the FundAllocation component
import SlideUpWhenVisible from '../components/SlideUpwhenVisible.js'; // Ensure the path is correct



const ZiaAcademyPage = () => {
  // Function to handle smooth scrolling
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjust this value based on the height of your sticky navigation bar
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };
  
  return (
    <ChakraProvider>
      <>
        <Header />
        {/* Sticky Navigation Bar */}
        <Box
          position="sticky"
          top={0}
          zIndex={1000}
          bg="white"
          boxShadow="md"
          py={4}
          px={8}
        >
          <HStack spacing={8} justify="center">
            <Link
              onClick={() => scrollToSection("about")}
              fontSize="lg"
              fontWeight="500"
              color="#2c3d90"
              _hover={{ textDecoration: "underline" }}
            >
              About
            </Link>
            <Link
              onClick={() => scrollToSection("photographs-atif")}
              fontSize="lg"
              fontWeight="500"
              color="#2c3d90"
              _hover={{ textDecoration: "underline" }}
            >
              Atif Productions
            </Link>
            <Link
              onClick={() => scrollToSection("fund-allocation")}
              fontSize="lg"
              fontWeight="500"
              color="#2c3d90"
              _hover={{ textDecoration: "underline" }}
            >
              Fund Allocation
            </Link>
            <Link
              onClick={() => scrollToSection("photographs-zia")}
              fontSize="lg"
              fontWeight="500"
              color="#2c3d90"
              _hover={{ textDecoration: "underline" }}
            >
              Zia Academy Photos
            </Link>
            <Link
              onClick={() => scrollToSection("donate")}
              fontSize="lg"
              fontWeight="500"
              color="#2c3d90"
              _hover={{ textDecoration: "underline" }}
            >
              Donate
            </Link>
          </HStack>
        </Box>

        {/* Main Content */}
        <Flex direction="column" align="center" justify="center" p={8} bg="gray.100">

        <SlideUpWhenVisible threshold={0.35}>

          {/* About Section */}
          <Flex
            id="about"
            direction={{ base: "column", md: "row" }}
            align="stretch"
            justify="center"
            w="100%"
            maxW="95%"
            gap={0}
            mt={8}
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
              <Text fontSize="xl" fontFamily="Open Sauce One, sans-serif" fontWeight="400" color="#5F5D5D" letterSpacing="-1.2px">
                The Zia Academy is an educational institution that doubles as a home for over 70 girls. These girls are from rural areas spread throughout Balochistan, Quetta, Kashmir, and more. The teachers working here exemplify multifaceted talents by not only taking on an educational role but also providing support and comfort to the students.
              </Text>
              <Text fontSize="xl" fontFamily="Open Sauce One, sans-serif" fontWeight="400" color="#5F5D5D" letterSpacing="-1.2px">
                The Safety Net Project was founded with a simple desire to bridge the gap for marginalized people from rural communities. Our goal is to support youth and serve as a safety net for those who need it. On average, donations, especially those distributed from the USA, tend to get distributed amongst popular urban areas. This creates a gap in the resources provided to those who are situated in the most inconvenient, “middle of nowhere,” and ultimately rural areas. Our goal is to change this.
              </Text>
              <Text fontSize="xl" fontFamily="Open Sauce One, sans-serif" fontWeight="400" color="#5F5D5D" letterSpacing="-1.2px">
                Our goal is not only to support essential living conditions when we approach this collaboration with The Zia Academy but to also provide resources that can empower the girls to build their own careers and achieve self-sufficiency down the road.
              </Text>

            </VStack>

          </Flex>
          </SlideUpWhenVisible>


          {/* Photographs Section - Atif Productions */}

          <VStack id="photographs-atif" mt={12} w="100%"  maxW="95%" align="center"
>

            <Heading as="h2" size="2xl" fontWeight="400" letterSpacing="-2px" lineHeight="1.2" color="#2c3d90">
              Photographs
            </Heading>
            <Text fontSize="xl" color="#5F5D5D" mb={6} fontWeight="400" letterSpacing="-1.2px">
              Atif Productions 2025
            </Text>
            <PhotoSlider />
          </VStack>


          {/* Fund Allocation Section */}
          <VStack id="fund-allocation" mt={16} w="100%"  maxW="95%" align="center"
>
            <FundAllocation />
          </VStack>

          {/* Photographs Section - Zia Academy */}
          <VStack id="photographs-zia" mt={12} w="100%"   maxW="95%" align="center">  
            <Heading as="h2" size="2xl" fontWeight="400" letterSpacing="-2px" lineHeight="1.2" color="#2c3d90">
              Photographs
            </Heading>
            <Text fontSize="xl" color="#5F5D5D" mb={6} fontWeight="400" letterSpacing="-1.2px">
              The Zia Academy Throughout the Years
            </Text>
            <Ziaslider />
          </VStack>

          {/* Donate Section */}
          <VStack id="donate" my={16} p={12} w="100%"   maxW="95%" textAlign="center" bg="white" borderRadius="md" boxShadow="lg" align="center">
          <SlideUpWhenVisible threshold={.35}>
          <HStack>
                <Image src="/logo.jpg" alt="The Safety Net Project Logo" boxSize="50px" />
                <Heading as="h2" size="2xl" fontWeight="400" letterSpacing="-2px" lineHeight="1.2" color="#2c3d90">
                  Donate
                </Heading>
              </HStack>
            </SlideUpWhenVisible>

            <SlideUpWhenVisible threshold={.35}>

            <Text fontSize="xl" color="#5F5D5D" mb={6} fontWeight="400" letterSpacing="-1.2px">
              Your generosity helps support the girls at Zia Academy and ensures they have access to essential resources.
            </Text>
            </SlideUpWhenVisible>

            {/* Donation Options - Horizontally Stacked */}
            <HStack spacing={6} w="100%" align="stretch" fontFamily="Open Sauce One, sans-serif">
              {/* Direct Wire Transfer */}

              <Box p={6} bg="gray.50" boxShadow="md" borderRadius="lg" flex="1">
              <SlideUpWhenVisible threshold={.35}>

                <Heading as="h3" size="lg" color="#2c3d90" mb={4} fontWeight="400" letterSpacing="-1.2px">
                  Direct Wire Transfer
                </Heading>
                <Text fontSize="md" fontWeight="500" mb={2} letterSpacing="-1px">
                  Western Union is recommended
                </Text>
                <VStack align="start" spacing={2} letterSpacing="-1px">
                  <Text fontSize="md"><strong>Bank Branch:</strong> UBL Azam Basti</Text>
                  <Text fontSize="md"><strong>Account Title:</strong> M.D. ZiaUlQuran Sulemania</Text>
                  <Text fontSize="md"><strong>Account #:</strong> 0102806-0</Text>
                  <Text fontSize="md"><strong>Branch Code:</strong> 1541</Text>
                </VStack>
                </SlideUpWhenVisible>

              </Box>
              


              {/* LaunchGood */}

              <Box p={6} bg="gray.50" boxShadow="md" borderRadius="lg" flex="1">
              <SlideUpWhenVisible threshold={.35}>

                <Heading as="h3" size="lg" color="#2c3d90" mb={4} fontWeight="400" letterSpacing="-1.2px">
                  LaunchGood
                </Heading>
                <Text fontSize="md" letterSpacing="-1px">
                  We wire funds to the academy through our platform and manage distribution on an as-needed basis.
                </Text>
                </SlideUpWhenVisible>

              </Box>

              {/* Additional Resources */}
              <Box p={6} bg="gray.50" boxShadow="md" borderRadius="lg" flex="1">
              <SlideUpWhenVisible threshold={.35}>
                <Heading as="h3" size="lg" color="#2c3d90" mb={4} fontWeight="400" letterSpacing="-1.2px">
                  Additional Resources
                </Heading>
                <Text fontSize="md" mb={4} letterSpacing="-1px">
                  If you have clothing, books, old laptops, or any items that may be of productive use to the academy, you can drop them off or ship them to us for delivery to the school.
                </Text>
                <Text fontSize="md" fontWeight="500" letterSpacing="-1px">
                  Contact:{" "}
                  <a href="mailto:SAFETYNETPROJECTS@GMAIL.COM" style={{ color: "#2c3d90" }}>
                    SAFETYNETPROJECTS@GMAIL.COM
                  </a>
                </Text>
                </SlideUpWhenVisible>

              </Box>
            </HStack>
          </VStack>
        </Flex>
        <Footer />
      </>
    </ChakraProvider>
  );
};

export default ZiaAcademyPage;
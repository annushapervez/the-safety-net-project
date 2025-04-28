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
  Stack, 
  MenuItem, 
  Menu, 
  MenuList,
  Button,
  Collapse,
  MenuButton, 
} from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PhotoSlider from "../components/atifgallery"; 
import Ziaslider from "../components/ziapics"; 
import FundAllocation from "../components/FundAllocation"; 
import SlideUpWhenVisible from '../components/SlideUpwhenVisible.js';
import HamburgerMenu from '../components/HamburgerMenu';
import { useMediaQuery } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";



const ZiaAcademyPage = () => {
  const [isMobile] = useMediaQuery("(max-width: 1024px)"); 
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; 
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);


  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <ChakraProvider>
      <>
      <Footer >

      {isMobile ? <HamburgerMenu /> : <Header />}
        <Box position="sticky" top={0} zIndex={1000} bg="white" boxShadow="md" py={isMobile ? 2 : 4} px={isMobile ? 4 : 8}>
        {isMobile ? (
          
          <>
<Box position="sticky" top={0} zIndex={1000} bg="white"  
     display="flex" justifyContent="center" alignItems="center">
  <Button onClick={() => setIsOpen(!isOpen)} variant="ghost" color="#2c3d90" 
          rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}>
    Navigate
  </Button>
</Box>

          <Collapse in={isOpen} animateOpacity>
            <VStack spacing={4} align="center" mt={2}>
              <Link onClick={() => scrollToSection("about")} fontSize="md" fontWeight="500" color="#2c3d90" _hover={{ textDecoration: "underline" }}>About</Link>
              <Link onClick={() => scrollToSection("photographs-atif")} fontSize="md" fontWeight="500" color="#2c3d90" _hover={{ textDecoration: "underline" }}>Atif Productions</Link>
              <Link onClick={() => scrollToSection("fund-allocation")} fontSize="md" fontWeight="500" color="#2c3d90" _hover={{ textDecoration: "underline" }}>Fund Allocation</Link>
              <Link onClick={() => scrollToSection("photographs-zia")} fontSize="md" fontWeight="500" color="#2c3d90" _hover={{ textDecoration: "underline" }}>Zia Academy Photos</Link>
              <Link onClick={() => scrollToSection("donate")} fontSize="md" fontWeight="500" color="#2c3d90" _hover={{ textDecoration: "underline" }}>Donate</Link>
            </VStack>
          </Collapse>
        </>
      ) : (
        <HStack spacing={8} justify="center">
          <Link onClick={() => scrollToSection("about")} fontSize="lg" fontWeight="500" color="#2c3d90" _hover={{ textDecoration: "underline" }}>About</Link>
          <Link onClick={() => scrollToSection("photographs-atif")} fontSize="lg" fontWeight="500" color="#2c3d90" _hover={{ textDecoration: "underline" }}>Atif Productions</Link>
          <Link onClick={() => scrollToSection("fund-allocation")} fontSize="lg" fontWeight="500" color="#2c3d90" _hover={{ textDecoration: "underline" }}>Fund Allocation</Link>
          <Link onClick={() => scrollToSection("photographs-zia")} fontSize="lg" fontWeight="500" color="#2c3d90" _hover={{ textDecoration: "underline" }}>Zia Academy Photos</Link>
          <Link onClick={() => scrollToSection("donate")} fontSize="lg" fontWeight="500" color="#2c3d90" _hover={{ textDecoration: "underline" }}>Donate</Link>
        </HStack>
      )}
</Box>

        <Flex direction="column" align="center" justify="center" py={ isMobile? 10 : 0 }  p={ isMobile? 4 : 8 } bg="gray.100">

        <SlideUpWhenVisible threshold={0.35}>

          <VStack w="100%" align="center" justify="center" >

          <Flex
            id="about"
            direction={{ base: "column", md: "column", lg:"row"}}
            align="stretch"
            justify="center"
            w="100%"
            maxW="95%"
            gap={0}
            mt={ isMobile? 3 : 6 }
          >

            <Box flex="1" position="relative">
              <Image
                src="/about.jpg"
                alt="Young girl with face paint"
                objectFit="cover"
                width="100%"
                height="100%"
                boxShadow={{base:"0", lg:"lg"}}
                borderTopLeftRadius="lg"
                borderBottomLeftRadius={{base:"0", lg:"lg"}}
                borderTopRightRadius={{base:"lg", lg:"0"}}

              />
            </Box>

            <VStack
  flex="1"
  align={{base:"center", lg:"start"}}
  spacing={4}
  p={{ base: 6, lg: 8 }}
  bg="white"
  borderTopRightRadius={{base:"0", lg:"lg"}}
  borderBottomRightRadius="lg"
  borderBottomLeftRadius={{base:"lg", lg:"0"}}
  boxShadow="lg"
  textAlign={{base:"center", lg:"left"}}
  w="100%" 
>
              <HStack  align="center"  justify={isMobile ? "center" : "flex-start"}>
                <Image src="/logo.jpg" alt="The Safety Net Project Logo" boxSize={isMobile ? "45px" : "50px"} />
                <Heading as="h2" size="2xl" fontWeight="400" letterSpacing="-2px" lineHeight="1.2" color="#2c3d90">
                  About
                </Heading>
              </HStack>
              <Text fontSize={{base:"lg", md:"xl"}}   fontFamily="Open Sauce One, sans-serif" fontWeight="400" color="#5F5D5D" letterSpacing="-1.2px">
                The Zia Academy is an educational institution that doubles as a home for over 70 girls. These girls are from rural areas spread throughout Balochistan, Quetta, Kashmir, and more. The teachers working here exemplify multifaceted talents by not only taking on an educational role but also providing support and comfort to the students.
              </Text>
              <Text fontSize={{base:"lg", md:"xl"}} fontFamily="Open Sauce One, sans-serif" fontWeight="400" color="#5F5D5D" letterSpacing="-1.2px">
                The Safety Net Project was founded with a simple desire to bridge the gap for marginalized people from rural communities. Our goal is to support youth and serve as a safety net for those who need it. On average, donations, especially those distributed from the USA, tend to get distributed amongst popular urban areas. This creates a gap in the resources provided to those who are situated in the most inconvenient, “middle of nowhere,” and ultimately rural areas. Our goal is to change this.
              </Text>
              <Text fontSize={{base:"lg", md:"xl"}} fontFamily="Open Sauce One, sans-serif" fontWeight="400" color="#5F5D5D" letterSpacing="-1.2px">
                Our goal is not only to support essential living conditions when we approach this collaboration with The Zia Academy but to also provide resources that can empower the girls to build their own careers and achieve self-sufficiency down the road.
              </Text>

            </VStack>

          </Flex>
          </VStack>

          </SlideUpWhenVisible>



          <VStack id="photographs-atif" mt={isMobile ? 6 : 12} w="100%"  maxW="95%" align="center"
>

            <Heading as="h2" size="2xl" fontWeight="400" letterSpacing="-2px" lineHeight="1.2" color="#2c3d90">
              Photographs
            </Heading>
            <Text fontSize="xl" color="#5F5D5D" mb={isMobile ? 3 : 6} fontWeight="400" letterSpacing="-1.2px">
              Atif Productions 2025
            </Text>
            <PhotoSlider />
          </VStack>


          <VStack id="fund-allocation" mt={isMobile ? 8 : 16} w="100%"  maxW="95%" align="center">
<Box w="100%" maxW= "100%">
    <FundAllocation />
  </Box>
          </VStack>

          <VStack id="photographs-zia"mt={isMobile ? 6 : 12} w="100%"   maxW="95%" align="center">  
            <Heading as="h2" size="2xl" fontWeight="400" letterSpacing="-2px" lineHeight="1.2" color="#2c3d90">
              Photographs
            </Heading>
            <Text fontSize="xl" color="#5F5D5D" mb={isMobile ? 3 : 6} fontWeight="400" letterSpacing="-1.2px">
              The Zia Academy Throughout the Years
            </Text>
            <Ziaslider />
          </VStack>

          <VStack 
  id="donate" 
  mt={isMobile ? 8 : 16}
  mb={ 6}

    p={isMobile ? 6 : 12} 
  w="100%" 
  maxW="95%" 
  textAlign="center" 
  bg="white" 
  borderRadius="md" 
  boxShadow="lg" 
  align="center"
>
  <SlideUpWhenVisible threshold={0.35}>
    <HStack spacing={3}>
      <Image src="/logo.jpg" alt="The Safety Net Project Logo" boxSize={isMobile ? "45px" : "60px"}/>
      <Heading 
        as="h2" 
        size="2xl" 
        fontWeight="400" 
        letterSpacing="-2px" 
        lineHeight="1.2" 
        color="#2c3d90"
      >
        Donate
      </Heading>
    </HStack>
  </SlideUpWhenVisible>

  <SlideUpWhenVisible threshold={0.35}>
    <Text 
      fontSize={{base:"lg", md:"xl"}}
      color="#5F5D5D" 
      mb={isMobile ? 3 : 6} 
      fontWeight="400" 
      letterSpacing="-1.2px"
    >
      Your generosity helps support the girls at Zia Academy and ensures they have access to essential resources.
    </Text>
  </SlideUpWhenVisible>

  <Stack 
    direction={{base:"column", lg:"row"}}
    spacing={6} 
    w="100%" 
    align="stretch" 
    fontFamily="Open Sauce One, sans-serif"
  >
    <Box p={isMobile ? 4 : 6}  bg="gray.50" boxShadow="md" borderRadius="lg" flex="1">
      <SlideUpWhenVisible threshold={0.35}>
        <Heading 
          as="h3" 
          size= "lg"
          color="#2c3d90" 
          mb={isMobile ? 2 : 4}  
          fontWeight= "400"
          letterSpacing="-1.2px"
        >
          Direct Wire Transfer
        </Heading>
        <Text fontSize= "md" fontWeight="500" mb={2} letterSpacing="-1px">
          Western Union is recommended
        </Text>
        <VStack align="center" spacing={2} letterSpacing="-1px">
          <Text fontSize={{base:"sm", md:"md"}}><strong>Bank Branch:</strong> UBL Azam Basti</Text>
          <Text fontSize={{base:"sm", md:"md"}}><strong>Account Title:</strong> M.D. ZiaUlQuran Sulemania</Text>
          <Text fontSize={{base:"sm", md:"md"}}><strong>Account #:</strong> 0102806-0</Text>
          <Text fontSize={{base:"sm", md:"md"}}><strong>Branch Code:</strong> 1541</Text>
        </VStack>
      </SlideUpWhenVisible>
    </Box>

    <Box p={isMobile ? 4 : 6} bg="gray.50" boxShadow="md" borderRadius="lg" flex="1">
      <SlideUpWhenVisible threshold={0.35}>
        <Heading 
          as="h3" 
          size= "lg"
          color="#2c3d90" 
          mb={isMobile ? 2 : 4}   
          fontWeight= "400"
          letterSpacing="-1.2px"
        >
          LaunchGood
        </Heading>
        <Text fontSize= "md" letterSpacing="-1px">
          We wire funds to the academy through our platform and manage distribution on an as-needed basis.
        </Text>
        <Button 
      as="a"
      href="https://www.launchgood.com/v4/campaign/help_support_an_orphanage_in_pakistan_the_zia_academy_1?src=1830346"
      target="_blank"
      rel="noopener noreferrer"
      mt={4}
      px={isMobile ? 8 : 10}
      py= {5 } 
      fontSize={isMobile ? "sm" : "md"}
      fontWeight="bold"
      color="#2c3d90"
      border="2px"
      bg="transparent"
      borderRadius="0"
      _hover={{ bg: "#2c3d90", color: "white" }}
      mx={isMobile ? "auto" : "0"}
    >
      
      DONATE
    </Button>
      </SlideUpWhenVisible>
    </Box>

    <Box p={isMobile ? 4 : 6} bg="gray.50" boxShadow="md" borderRadius="lg" flex="1">
      <SlideUpWhenVisible threshold={0.35}>
        <Heading 
          as="h3" 
          size= "lg"
          color="#2c3d90" 
          mb={isMobile ? 2 : 4}  
          fontWeight= "400"
          letterSpacing="-1.2px"
        >
          Additional Resources
        </Heading>
        <Text fontSize="md" mb={isMobile ? 2 : 4} letterSpacing="-1px">
          If you have clothing, books, old laptops, or any items that may be of productive use to the academy, you can drop them off or ship them to us for delivery to the school.
        </Text>
        <Text fontSize={{base:"sm", md:"md"}} fontWeight="500" letterSpacing="-1px">
          Contact:{" "}
          <a href="mailto:SAFETYNETPROJECTS@GMAIL.COM" style={{ color: "#2c3d90" }}>
            SAFETYNETPROJECTS@GMAIL.COM
          </a>
        </Text>
      </SlideUpWhenVisible>
    </Box>
  </Stack>
</VStack>
        </Flex>
        </Footer >
      </>
    </ChakraProvider>
  );
};

export default ZiaAcademyPage;
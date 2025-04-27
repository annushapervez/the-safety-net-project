import React from 'react';
import { extendTheme, Heading, Text, Box, SimpleGrid, Stat, StatLabel, StatNumber, Icon, Button, Image, Flex, Link, HStack, VStack, Divider } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SlideUpWhenVisible from '../components/SlideUpwhenVisible.js'; 
import { useMediaQuery } from "@chakra-ui/react";

const AnimatedStatNumber = motion(StatNumber);

const MainContent = () => {
  const [isMobile] = useMediaQuery("(max-width: 1024px)"); 
  const [moneyCount, setMoneyCount] = useState(0);
  const [hugCount, setHugCount] = useState(0);
  const [girlCount, setGirlCount] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const countUp = (target, setter) => {
    let current = 0;
    const increment = Math.ceil(target / 100);
    const interval = setInterval(() => {
      if (current >= target) {
        clearInterval(interval);
      } else {
        current += increment;
        setter(current);
      }
    }, 30);
  };

  useEffect(() => {
    if (isInView) {
      countUp(8000, setMoneyCount); 
      countUp(100, setHugCount);    
      countUp(70, setGirlCount);   
    }
  }, [isInView]);

  const handleIntersection = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setIsInView(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, 
    });
    const sectionElement = document.getElementById('count-section');
    if (sectionElement) {
      observer.observe(sectionElement);
    }
    return () => observer.disconnect(); 
  }, []);
  return (
    <>
    <Box 
      p={8}
      borderRadius="md"
      mx="auto"
      maxW="95%"
      display="flex"
      fontFamily="Open Sauce One, sans-serif"
      flexDirection={isMobile ? "column" : "row"}
      alignItems="center"
    >
      <Box 
                mt={isMobile ? 5 : 4}
        flex="1" 
        pr={isMobile ? 0 : 8}
        textAlign={isMobile ? "center" : "left"} 
      >
        <HStack spacing={isMobile ? 1 : 4} align="center" justify={isMobile ? "center" : "flex-start"}>
          <Image src="/logo.jpg" alt="The Safety Net Project Logo" boxSize={isMobile ? "45px" : "60px"} />
          <Heading
            as="h2"
            size="2xl"
            fontWeight="400"
            letterSpacing="-2px"
            lineHeight="1.2"
            color="#2c3d90"
          >
            Purpose
          </Heading>
        </HStack>

        <SlideUpWhenVisible>
          <Text
          fontSize={{base:"xl", md:"2xl"}}
            mt={4}
            mb={6}
            fontFamily="Open Sauce One, sans-serif"
            fontWeight="400"
            color="#2c3d90"
            letterSpacing="-1.5px"
          >
            The Safety Net Project was formed with the intention of bridging the gap
            between marginalized communities.
          </Text>
        </SlideUpWhenVisible>

        <VStack 
          align={isMobile ? "center" : "start"} 
          spacing={6} 
          textAlign={isMobile ? "center" : "left"}
        >
          <SlideUpWhenVisible>
            <Box pl={isMobile ? 0 : 200}> 
              <Heading as="h2" size="lg" fontWeight="400" color="#2c3d90" letterSpacing="-1.2px">
                01 A Strong Foundation
              </Heading>
              <Text fontSize="xl" color="#5F5D5D" mt={2} fontWeight="400" letterSpacing="-1.2px">
                Our first priority is to assure appropriate living accommodations and
                food services are readily accessible to those who need them.
              </Text>
            </Box>
          </SlideUpWhenVisible>

          <Divider style={{ borderTop: '4px dotted #1F3A93' }} />

          <SlideUpWhenVisible>
            <Box pl={isMobile ? 0 : 200}> 
              <Heading as="h2" size="lg" fontWeight="400" color="#2c3d90" letterSpacing="-1.2px">
                02 Empowerment
              </Heading>
              <Text fontSize="xl" color="#5F5D5D" mt={2} fontWeight="400" letterSpacing="-1.2px">
                The next goal is to provide educational resources to help them build
                towards a stable and successful future for themselves.
              </Text>
            </Box>
          </SlideUpWhenVisible>
        </VStack>
      </Box>

      <Box flex="1" mt={isMobile ? 0 : 12} display="flex" justifyContent="center">
        <Image
        mt={isMobile ? 10 : 20}
          src="/purpose.jpg"
          ml={4}
          alt="Bookshelf with READ letters"
          boxShadow="lg"
          borderRadius="md"
          width={"100%"} 
          maxWidth="600px"
          height="auto"
        />
      </Box>
    </Box>
      <SlideUpWhenVisible>
        <Box 
          id="count-section"
          p={4} 
          bg="gray.50" 
          mt={4} 
          borderRadius="md"
                 boxShadow="md"

          maxW="95%" 
          mx="auto" 
          fontFamily="Open Sauce One, sans-serif"
        >
          <Heading as="h2" size="2xl" textAlign="center" mb={2} mt={8} fontFamily="Open Sauce One, sans-serif" fontWeight="400" letterSpacing="-2px" lineHeight="1.2" color="#2c3d90">
            How You're Helping
          </Heading>
          <Text fontSize="lg" fontFamily="Open Sauce One, sans-serif" fontWeight="400" color="#5F5D5D" letterSpacing="-1.1px" mt={isMobile ? 5 : 0}  mb={isMobile ? 10 : 14} textAlign="center">
          Your generosity builds confidence, resilience, and belonging—impacting lives beyond the numbers.          </Text>
          <SimpleGrid columns={[1, 1, 3]} spacing={isMobile ? 5 : 10} >
            <Stat textAlign="center">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image src="/donate.png" alt="Description of image" width={20} height={20} mb={6} />
              </Box>
              <AnimatedStatNumber fontSize="2xl" color="#2c3d90" isNumeric>
                ${moneyCount.toLocaleString()}+
              </AnimatedStatNumber>
              <StatLabel fontSize="lg" fontWeight={500} color="#5F5D5D" letterSpacing="-1.2px">
                Funds Distributed
              </StatLabel>
              <Text fontSize="lg" fontFamily="Open Sauce One, sans-serif" fontWeight="400" color="#5F5D5D" letterSpacing="-1.1px" mb={6}>
                Over $8,000 distributed to support the education and care of girls, creating lasting change in their lives.
              </Text>
            </Stat>
            <Stat textAlign="center">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image src="/hig.png" alt="Description of image" width={28} height={28} />
              </Box>
              <AnimatedStatNumber fontSize="2xl" color="#2c3d90" isNumeric>
                {hugCount}%
              </AnimatedStatNumber>
              <StatLabel fontSize="lg" fontWeight={500} color="#5F5D5D" letterSpacing="-1.2px">
                Hugs
              </StatLabel>
              <Text fontSize="lg" fontFamily="Open Sauce One, sans-serif" fontWeight="400" color="#5F5D5D" letterSpacing="-1.1px" mb={6}>
                All the girls we serve come from historically underrepresented groups.
              </Text>
            </Stat>
            <Stat textAlign="center">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image src="/girls.png" alt="Description of image" width={20} height={20} mb={6} />
              </Box>
              <AnimatedStatNumber fontSize="2xl" color="#2c3d90" isNumeric>
                {girlCount}+
              </AnimatedStatNumber>
              <StatLabel fontSize="lg" fontWeight={500} color="#5F5D5D" letterSpacing="-1.2px">
                Girls Served
              </StatLabel>
              <Text fontSize="lg" fontFamily="Open Sauce One, sans-serif" fontWeight="400" color="#5F5D5D" letterSpacing="-1.1px" mb={6}>
                We’ve empowered girls with education, safety, and the tools to transform their lives.
              </Text>
            </Stat>
          </SimpleGrid>
        </Box>
      </SlideUpWhenVisible>

      <Flex
        bg="#FFFFFF"
        p={isMobile ? 4 : 8}
        mt={8}
        mb={8}
        borderRadius="md"
        maxW="95%"
        mx="auto"
        align="center"
        justify="space-between"
        flexDirection={{base:"column", md:"row"}} 
        >
      <Box flex="1" mr={isMobile ? 0: 8} mb={isMobile ? 6 : 0}>
        <SlideUpWhenVisible>

          <Heading
          as="h2"
          size="2xl"
          fontWeight="400"
          letterSpacing="-2px"
          lineHeight="1.2"
          color="#2c3d90"
          textAlign={isMobile ? "center" : "left"} 

            mb={4}
          >
  Our First Project:&nbsp;
  <Text
    as="span"
    display={isMobile ? "block" : "inline"}
  >
    The Zia Academy
  </Text>
          </Heading>
          </SlideUpWhenVisible>
          <SlideUpWhenVisible>

          <Text
fontSize={{base:"lg", md:"xl"}}
            fontFamily="Open Sauce One, sans-serif"
            fontWeight="400"
            letterSpacing="-1.2px"
            textAlign={isMobile ? "center" : "left"}
            color="#5F5D5D"
            mb={6}
          >

            The Zia Academy provides a safe haven and education for 70 girls from remote areas of Pakistan and Afghanistan, offering them a chance to escape the hardships of their past. Many of these girls were abandoned or unable to be cared for by their families, often facing the risk of abuse, exploitation, and forced marriages. At the academy, they are given the protection, care, and opportunities they deserve to build brighter futures, with the hope of empowering them to break free from the cycle of hardship and realize their full potential.
          </Text>
          </SlideUpWhenVisible>
          <SlideUpWhenVisible>

<Link href="/ZiaAcademy" _hover={{ textDecoration: "none" }}>

<Button
  mt={4}
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
>

  LEARN MORE
</Button>

          </Link>
          </SlideUpWhenVisible>

        </Box>

        <Box flex="1">
          <Image
            src="/zia.jpg" 
            alt="Zia Academy"
            borderRadius="md"
            boxShadow="lg"
            maxW= {{base:"60%", md:"80%", xl:"60%"}} 
            mx="auto"  
            mt={isMobile ? 3 : 0}

          />
        </Box>
      </Flex>


    
    </>
  );
};

export default MainContent;

"use client";
import React, { useState, useEffect } from 'react';
import {
  Box, Flex, Heading, Text, FormControl, FormLabel, Input, Select, Button, SimpleGrid,
} from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChakraProvider } from '@chakra-ui/react';
import { db } from "../firebaseConfig.js"; // Import Firestore
import { collection, addDoc } from "firebase/firestore";
import SlideUpWhenVisible from '../components/SlideUpwhenVisible.js'; // Ensure the path is correct
import HamburgerMenu from '../components/HamburgerMenu';
import { useMediaQuery } from "@chakra-ui/react";

const VolunteerPage = () => {
  const [isMobile] = useMediaQuery("(max-width: 1024px)");

  // State for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    volunteerType: '',
  });

  const [message, setMessage] = useState('');

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "volunteers"), formData);
      setMessage("Volunteer submission successful!");
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        volunteerType: '',
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      setMessage("Error submitting form. Please try again.");
    }
  };
  const [hasMounted, setHasMounted] = useState(false);

  // Media query to detect mobile devices

  useEffect(() => {
    // Set hasMounted to true after the component mounts
    setHasMounted(true);
  }, []);

  // If the component hasn't mounted, render nothing to prevent flicker
  if (!hasMounted) {
    return null;
  }

  return (
    <ChakraProvider>
      <>
      <Footer >

      {isMobile ? <HamburgerMenu /> : <Header />}
        <SlideUpWhenVisible threshold={0.35}>

        <Box
          bg="#F1F6FB"
          minHeight="100vh"          py={10}
          px={{ base: 4, md: 10 }}
          fontFamily="'Open Sauce One', sans-serif" // Apply font to the entire container
        >
          <Flex
            maxW="95%"
            mx="auto"
            bg="white"
            boxShadow="md"
            rounded="lg"
            overflow="hidden"
            flexDirection={{ base: 'column', xl: 'row' }}
            alignItems="center" // Center the children vertically
          >
            {/* Left Section */}
            <Box flex="1" p={{base:5, md:10}}  bg="white"  textAlign={{base:"center", md:"center", xl: "left"}}  // Center on mobile, left on larger screens
>
              <Heading
                as="h2"
                size="xl"
                fontWeight="400"
                letterSpacing="-2px"
                lineHeight="1.2"
                color="#2c3d90"
                mb="4"
              
              >
                Volunteer
              </Heading>
              <Text
                fontSize="lg"
                color="#5F5D5D"
                mb={2}
                fontWeight="400"
                letterSpacing="-1.2px"
              >
                At the Safety Net Project, we understand that not everyone has the financial means to contribute to our cause. However, we still believe that everyone can make a difference in their own unique way. That's why we're excited to offer a volunteer program that not only benefits our organization but also benefits you.
              </Text>
              <Text
                fontSize="lg"
                color="#5F5D5D"
                mb={2}
                fontWeight="400"
                letterSpacing="-1.2px"
              >
                By becoming a volunteer with us, you'll have the opportunity to make a meaningful impact on the community we serve. Since our non-profit is officially registered, you'll be able to showcase your dedication to social responsibility by adding this experience to your resume. And if you need a recommendation letter in the future, we're happy to provide one based on your contributions.
              </Text>
              <Text
                fontSize="lg"
                color="#5F5D5D"
                fontWeight="400"
                letterSpacing="-1.2px"
              >
                As a volunteer, you'll be involved in the essentials of our organization, such as outreach, idea pitching, and planning. But beyond that, you'll be part of a community of like-minded individuals who share your passion for making a difference. Together, we can support and uplift each other as we work towards our common goals.
              </Text>
            </Box>

          {/* Right Section - Form */}
          <Box flex="1"  p={{base:5, md:10}}  bg="white" fontWeight="400" color="#2c3d90" letterSpacing="-1.2px" textAlign={{base:"center", md:"center", xl: "left"}}>
              <form onSubmit={handleSubmit}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl id="firstName" isRequired>
                    <FormLabel  textAlign={{base:"center", md:"center", xl: "left"}}  // Center on mobile, left on larger screens
>First Name</FormLabel>
                    <Input textAlign={{base:"center", md:"center", xl: "left"}} type="text" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                  </FormControl>
                  <FormControl id="lastName" isRequired>
                    <FormLabel textAlign={{base:"center", md:"center", xl: "left"}}>Last Name</FormLabel>
                    <Input textAlign={{base:"center", md:"center", xl: "left"}}type="text" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                  </FormControl>
                </SimpleGrid>

                <FormControl id="email" isRequired mt={4}>
                  <FormLabel textAlign={{base:"center", md:"center", xl: "left"}}>Email</FormLabel>
                  <Input textAlign={{base:"center", md:"center", xl: "left"}}type="email" placeholder="Your Email Address" value={formData.email} onChange={handleChange} />
                </FormControl>

                <FormControl id="phone" mt={4}>
                  <FormLabel textAlign={{base:"center", md:"center", xl: "left"}}>Phone</FormLabel>
                  <Input textAlign={{base:"center", md:"center", xl: "left"}}type="tel" placeholder="Your Phone Number" value={formData.phone} onChange={handleChange} />
                </FormControl>

                <FormControl id="volunteerType" isRequired mt={4}>
                  <FormLabel textAlign={{base:"center", md:"center", xl: "left"}}>What type of volunteer work would you be interested in?</FormLabel>
                  <Select textAlign={{base:"center", md:"center", xl: "left"}}placeholder="Select an option" color="gray.500" value={formData.volunteerType} onChange={handleChange}>
                    <option>Outreach</option>
                    <option>Event Planning</option>
                    <option>Fundraising</option>
                    <option>Administrative Work</option>
                  </Select>
                </FormControl>

                <Button type="submit" mt={6} px={8} py={4} fontSize="md" fontWeight="bold" color="#2c3d90" border="2px" bg="transparent" borderRadius="0" width="fit-content" _hover={{ bg: "#2c3d90", color: "white" }}>
                  SEND
                </Button>
              </form>
              {message && <Text mt={4} color="green.500">{message}</Text>}
            </Box>
          </Flex>
        </Box>
        </SlideUpWhenVisible >

        </Footer >
      </>
    </ChakraProvider>
  );
};

export default VolunteerPage;

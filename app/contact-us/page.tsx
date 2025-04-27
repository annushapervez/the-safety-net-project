"use client";
import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Text, Input, Textarea, Button, FormLabel, FormControl, Container, Flex, SimpleGrid, Heading } from "@chakra-ui/react";
import { db } from "../firebaseConfig.js"; 
import { collection, addDoc } from "firebase/firestore";import Header from "../components/Header";
import Footer from "../components/Footer";
import SlideUpWhenVisible from '../components/SlideUpwhenVisible.js';
import HamburgerMenu from '../components/HamburgerMenu';
import { useMediaQuery } from "@chakra-ui/react";

function ContactForm() {
  const [isMobile] = useMediaQuery("(max-width: 1024px)");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [messageStatus, setMessageStatus] = useState(""); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contacts"), formData);
      setMessageStatus("Message sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error) {
      setMessageStatus("Error sending message. Please try again.");
      console.error("Error adding document: ", error);
    }
  };
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
        <SlideUpWhenVisible threshold={.35}>

        <Box  
 bg="#F1F6FB" py={10} px={isMobile ? 4 : 10} minHeight="100vh" >
          <Flex
            maxW="1200px"
            mx="auto"
            bg="white"
            boxShadow="md"
            rounded="lg"
            overflow="hidden"
            flexDirection={{ base: "column", xl: "row" }}
          >
            <Box flex="1" p={isMobile ? 5 : 10}  bg="white"  textAlign={isMobile ? "center" : "left"}>
              <Heading as="h2" size="xl" fontWeight="400" letterSpacing="-2px" lineHeight="1.2" color="#2c3d90" mb="4">
                Contact Us
              </Heading>
              <Text fontSize="xl" fontFamily="Open Sauce One, sans-serif" fontWeight="400" color="#5F5D5D" letterSpacing="-1.2px">
                We’d love to hear from you! For any questions or ideas please feel free to contact us.
              </Text>
              <Heading as="h1" size="md" fontWeight="400" color="#2c3d90" letterSpacing="-1.2px" mt={4}>
                safetynetprojects@gmail.com
              </Heading>
              <Heading as="h1" size="sm" fontWeight="400" color="#5F5D5D" letterSpacing="-1.2px" mt={2}>
                Located in New York City
              </Heading>
            </Box>

            <Box flex="1" p ={isMobile ? 5 : 10} bg="white" fontWeight="400" color="#2c3d90" letterSpacing="-1.2px"  textAlign={{base:"center", md:"center", xl: "left"}}>
              <form onSubmit={handleSubmit}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl id="first-name" isRequired>
                    <FormLabel  textAlign={{base:"center", md:"center", xl: "left"}} 
>First Name</FormLabel>
                    <Input textAlign={{base:"center", md:"center", xl: "left"}} type="text" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                  </FormControl>
                  <FormControl id="last-name" isRequired>
                    <FormLabel textAlign={{base:"center", md:"center", xl: "left"}}>Last Name</FormLabel>
                    <Input textAlign={{base:"center", md:"center", xl: "left"}}type="text" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                  </FormControl>
                </SimpleGrid>

                <FormControl id="email" isRequired mt={4}>
                  <FormLabel textAlign={{base:"center", md:"center", xl: "left"}}>Email</FormLabel>
                  <Input textAlign={{base:"center", md:"center", xl: "left"}}type="email" placeholder="Your Email Address" value={formData.email} onChange={handleChange} />
                </FormControl>

                <FormControl id="message" isRequired mt={4}>
                  <FormLabel textAlign={{base:"center", md:"center", xl: "left"}}>Message</FormLabel>
                  <Textarea  textAlign={{base:"center", md:"center", xl: "left"}} name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" />
                </FormControl>

                <Button
                  mt={6}
                  px={8}
                  py={4}
                  fontSize="md"
                  fontWeight="bold"
                  color="#2c3d90"
                  border="2px"
                  bg="transparent"
                  borderRadius="0"
                  width="fit-content"
                  _hover={{ bg: "#2c3d90", color: "white" }}
                  type="submit"
                >
                  SEND
                </Button>

                {messageStatus && (
                  <Text mt={4} color={messageStatus.includes("Error") ? "red.500" : "green.500"}>
                    {messageStatus}
                  </Text>
                )}
              </form>
            </Box>
          </Flex>
        </Box>
        </SlideUpWhenVisible>

        </Footer >
      </>
    </ChakraProvider>
  );
}

export default ContactForm;

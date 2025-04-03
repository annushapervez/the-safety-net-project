"use client";
import React, { useState } from "react";
import { ChakraProvider, Box, Text, Input, Textarea, Button, FormLabel, FormControl, Container, Flex, SimpleGrid, Heading } from "@chakra-ui/react";
import { db } from "../firebaseConfig.js"; // Import Firestore
import { collection, addDoc } from "firebase/firestore";import Header from "../components/Header";
import Layout from "../components/Footer";
import SlideUpWhenVisible from '../components/SlideUpwhenVisible.js'; // Ensure the path is correct
import HamburgerMenu from '../components/HamburgerMenu';
import { useMediaQuery } from "@chakra-ui/react";

function ContactForm() {
  const [isMobile] = useMediaQuery("(max-width: 768px)"); // ✅ Move inside the component
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [messageStatus, setMessageStatus] = useState(""); // Feedback message

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
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

  return (
    <ChakraProvider>
      <>
      <Layout >

      {isMobile ? <HamburgerMenu /> : <Header />}
        <SlideUpWhenVisible threshold={.35}>

        <Box bg="#F1F6FB" py={10} px={isMobile ? 4 : 10}>
          <Flex
            maxW="1200px"
            mx="auto"
            bg="white"
            boxShadow="md"
            rounded="lg"
            overflow="hidden"
            flexDirection={{ base: "column", lg: "row" }}
          >
            {/* Left Section */}
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

            {/* Right Section - Contact Form */}
            <Box flex="1" p ={isMobile ? 5 : 10} bg="white" fontWeight="400" color="#2c3d90" letterSpacing="-1.2px"  textAlign={isMobile ? "center" : "left"}>
              <form onSubmit={handleSubmit}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {/* First Name */}
                  <FormControl id="first-name" isRequired>
                    <FormLabel  textAlign={isMobile ? "center" : "left"}>First Name</FormLabel>
                    <Input  textAlign={isMobile ? "center" : "left"} type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                  </FormControl>

                  {/* Last Name */}
                  <FormControl id="last-name" isRequired>
                    <FormLabel  textAlign={isMobile ? "center" : "left"}>Last Name</FormLabel>
                    <Input  textAlign={isMobile ? "center" : "left"} type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                  </FormControl>
                </SimpleGrid>

                {/* Email */}
                <FormControl id="email" isRequired mt={4}>
                  <FormLabel  textAlign={isMobile ? "center" : "left"}>Email</FormLabel>
                  <Input  textAlign={isMobile ? "center" : "left"} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email Address" />
                </FormControl>

                {/* Message */}
                <FormControl id="message" isRequired mt={4}>
                  <FormLabel  textAlign={isMobile ? "center" : "left"}>Message</FormLabel>
                  <Textarea  textAlign={isMobile ? "center" : "left"} name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" />
                </FormControl>

                {/* Submit Button */}
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

                {/* Status Message */}
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

        </Layout >
      </>
    </ChakraProvider>
  );
}

export default ContactForm;

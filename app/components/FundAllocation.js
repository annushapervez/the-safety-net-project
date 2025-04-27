import { Box, Heading, Text, VStack, Stack, HStack, Divider, Tooltip } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SlideUpWhenVisible from '../components/SlideUpwhenVisible.js'; 
import { useMediaQuery } from "@chakra-ui/react";


const MotionBox = motion(Box);

const allocations = [
  { name: "Tuition & Board", amount: 3050 },
  { 
    name: "Recurring Monthly Expenses", 
    amount: 2050, 
    breakdown: [
      { item: "Salaries for the Teachers", cost: "338,000 PKR / 1,100 USD" },
      { item: "Electricity Bill", cost: "150,000 PKR / 500 USD" },
      { item: "Gas", cost: "250,000 PKR / 800 USD" },
      { item: "Tuition and Board per Girl", cost: "6,000 PKR / 21 USD" }
    ] 
  },
  { name: "Building Repairs & Maintenance", amount: 1010 },
  { name: "Computers (6)", amount: 800 },
  { name: "Classroom Supplies", amount: 800 },
  { name: "Projectors (2)", amount: 200 },
  { name: "Additional Expenses", amount: 165 },
];

const maxAmount = 4000;

export default function FundAllocation() {
  const [isMobile] = useMediaQuery("(max-width: 500px)"); 

  const [isInView, setIsInView] = useState(false);

  const handleIntersection = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setIsInView(true);
    }
  };

  useEffect(() => {
    if (isInView) {
    }
  }, [isInView]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, 
    });
    const sectionElement = document.getElementById('motion-section');
    if (sectionElement) {
      observer.observe(sectionElement);
    }
    return () => observer.disconnect(); 
  }, []);

  return (
    <Stack 
    direction={{base:"column", xl:"row"}}
    spacing={{base:5, xl:20}}
    align="center" 
    mx="auto" 
    p={{base:6,  md:12}}
    bg="white" 
    borderRadius="md" 
    boxShadow="lg"
    W="100%"
  >
    <VStack>
      <SlideUpWhenVisible>
        <Heading
          as="h2"
          size={{base:"xl",  md:"2xl"}}
          fontWeight="400"
          letterSpacing="-2px"
          lineHeight="1.2"
          color="#2c3d90"
          textAlign={isMobile ? "center": "left" }
        >
          Fund Allocation To Date
        </Heading>
      </SlideUpWhenVisible>
  
      <Divider style={{ borderTop: '4px dotted #1F3A93' }} my={2} />
  
      <SlideUpWhenVisible>
        <Text
          fontSize={{base:"lg",  md:"xl"}}
          fontFamily="Open Sauce One, sans-serif"
          fontWeight="400"
          color="#5F5D5D"
          maxW="4xl"
          align="center"
          letterSpacing="-1.2px"
        >
          In March 2023, we successfully raised <b>$8,075</b> to support The Zia Academy in its operations.
          The following is an explanation of the allocation of the funds in addition to the recurring expenses we have helped accommodate since March 2023.
        </Text>
      </SlideUpWhenVisible>
  
      <Divider style={{ borderTop: '4px dotted #1F3A93' }} my={2}/>
    </VStack>
  
    <VStack spacing={4} w="full" id="motion-section">
      {allocations.map((item, index) => (
        <HStack key={index} w="full" spacing={4}>
          <Text 
            fontFamily="Open Sauce One, sans-serif"
            fontWeight="400"
            letterSpacing="-1px"
            fontSize= "md"
            color={item.name === "Recurring Monthly Expenses" ? "#2c3d90" : "#5F5D5D"}
            minW="215px"
            mr={{base:"0px",  md:"10px"}}
          >
            {item.name === "Recurring Monthly Expenses" ? (
              <Tooltip
                label={
                  <VStack align="start" spacing={2}>
                    {item.breakdown.map((expense, idx) => (
                      <Text key={idx} fontSize="sm" color="#5F5D5D">
                        <span style={{ color: "#5F5D5D" }}>{expense.item}: </span>
                        <span style={{ fontWeight: "bold", color: "#2c3d90" }}>
                          {expense.cost}
                        </span>
                      </Text>
                    ))}
                  </VStack>
                }
                placement={isMobile ? "bottom" : "right"}
                                hasArrow
                bg="white"
                color="white"
                border="2px solid #2c3d90"
                borderRadius="8px"
                p={4}
                boxShadow="lg"
              >
                {item.name}
              </Tooltip>
            ) : (
              item.name
            )}
          </Text>
  
          {isInView && !isMobile && (
  <MotionBox
    initial={{ width: "0%" }}
    animate={{ width: `${(item.amount / maxAmount) * 100}%` }}
    transition={{ duration: 2, ease: 'easeInOut', delay: index * 0.2 }}
    bg="#2c3d90"
    h="7"
    borderRadius="md"
  />
)}
          <Text fontSize="sm" fontWeight="bold" color="#2c3d90"            
>
            ${item.amount}
          </Text>
        </HStack>
      ))}
    </VStack>
  </Stack>
  
  );
}

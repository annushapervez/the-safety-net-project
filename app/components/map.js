import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { useState, useEffect, useRef } from 'react';
import { Box, Heading, Text, Image, VStack, Center, border } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';  
import SlideUpWhenVisible from '../components/SlideUpwhenVisible.js';
import { useMediaQuery } from "@chakra-ui/react";


let DefaultIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const HomeButton = () => {
  const map = useMap(); 
  const [isMobile] = useMediaQuery("(max-width: 768px)"); 
  const topValue = isMobile ? "10px" : "80px";


  const handleHomeClick = () => {
    map.setView([29.3956, 71.6722], 6); 
  };

  return (
    <div
      style={{
        position: "absolute",
        top: topValue,
        left: isMobile ? "auto" : "10px",
        right: isMobile ? "10px" : "auto",        
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <button
        onClick={handleHomeClick}
        style={{
          backgroundColor: "white", 
          border: "2px solid #ccc",
          borderRadius: "8px", 
          padding: "10px", 
          fontSize: "20px",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FaHome size={24} color="#2c3d90" /> 
      </button>
    </div>
  );
};

const places = [
  {
    id: 1,
    lat: 25.8943,
    lng:68.5247,
    name: 'Sindh',
    info: "Sindh, with a population of over 55M is home to some of the earliest civilizations dating back to Mohenjo-Daro, one of the largest settlements of the Indus Valley Civilization (circa 2500 BCE) Today, Sindh remains a center of cultural and educational progress. It houses Pakistan’s first university dedicated to women’s education, advancing opportunities for female students. The region is also where The Zia Academy, our first project, was established. Despite this, challenges persist in 2020, over 50,000 children were living on the streets, vulnerable to STIs, exploitation, and criminal activity, highlighting the persistent need for support.",
    image: "/sindh.jpg",
  },
  {
    id: 2,
    lat: 34.9526,
    lng: 72.3311,
    name: 'Khyber Pakhtunkhwa',
    info: "Khyber Pakhtunkhwa, with a population of over 40 million, has a rich history as a gateway for ancient trade routes, including the Silk Road, and has been home to civilizations like the Gandhara Buddhist Kingdom. Despite its historical significance, KP has faced decades of conflict, displacement, and instability, severely affecting education and social development. Female literacy rates remain low, with many girls facing barriers to schooling due to cultural and security challenges. " ,
     image: "/kb.jpg",
  },

  {
    id: 3,
    lat: 31.1471,
    lng: 75.3412,
    name: 'Punjab',
    info: "Punjab is Pakistan’s most populous province, with over 110 million people, making up more than half of the country’s total population. It is named after its five major rivers: Jhelum, Chenab, Ravi, Beas, and Sutlej. The region boasts the site where the Lahore Resolution was passed in 1940, leading to the creation of Pakistan. Punjab also has Pakistan’s highest literacy rate (over 66%), with urban centers leading in education. Despite advancements, those in rural areas are still subject to disparities and inequality. We are planning for our next project to tackle problems in this region.  ", 
    image: "/punjab.jpg",
  },

  {
    id: 4,
    lat:35.8026,
    lng: 74.9832,
    name: 'Gilgit-Baltistan',
    info: "Gilgit-Baltistan, a region of breathtaking mountains and glaciers, has a small but resilient population of about 1.8 million. Historically, it was a crucial part of the ancient Silk Road, connecting South and Central Asia. While GB has made strides in education, boasting some of the highest female literacy rates in Pakistan (above 60%), many remote areas still lack proper schools and infrastructure. The Zia Academy is committed to expanding access to education in these underserved regions. However, many children, especially orphans, lack stable support systems, leaving them vulnerable to child labor and poverty.",
     image: "/gb.jpg",
  },
  {
    id: 5,
    lat: 28.4907,
    lng: 65.0958,
    name: 'Balochistan',
    info: "Despite its historical significance and vast natural resources, Balochistan faces severe educational and social challenges. The province has Pakistan’s lowest literacy rate, particularly among women, with female literacy estimated at only 24% in some rural areas. Many of the girls we support are from Balochistan. However, the struggle continues thousands of children remain out of school, with many vulnerable to poverty, child labor, and exploitation, underscoring the urgent need for systemic change.",
    image: "/baloch.jpg",
  },


  {
    id: 6,
    lat:33.9259,
    lng: 73.7810,
    name: 'Azad Jammu and Kashmir',
    info: "Azad Jammu & Kashmir, home to over 4 million people, is known for its rich cultural heritage and strategic geopolitical significance. Historically, the region has been at the center of disputes, affecting the stability and development of its people. Education remains a challenge, particularly for girls, as ongoing tensions and limited infrastructure restrict access to schools. " ,
    image: "/ak.jpg",
  },

];

const CustomMarker = ({ number }) => {
  return (
    <Center
      position="relative"
      width="30px"
      height="30px"
      backgroundColor="#CA283B"
      borderRadius="50%"
      color="white"
      fontWeight="bold"
      fontSize="16px"
      zIndex="10"
      style={{ textAlign: 'center', lineHeight: '30px' }}
    >
      {number}
    </Center>
  );
};

function UpdateMapCenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom); 
  }, [center, zoom, map]);
  return null;
}

export default function PakistanMap() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapCenter, setMapCenter] = useState([29.3956, 71.6722]); 

  const panelRef = useRef(null);
  const placeRefs = useRef({});

  useEffect(() => {
    if (!panelRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const placeId = entry.target.getAttribute('data-place-id');
        const place = places.find((p) => p.id === parseInt(placeId));

        if (entry.isIntersecting && place) {
          setSelectedPlace(place); 
        }
      });
    }, { root: panelRef.current, threshold: 0.5 });

    const placeElements = panelRef.current.querySelectorAll('[data-place-id]');
    placeElements.forEach((el) => observer.observe(el));

    return () => {
      placeElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleMarkerClick = (placeId) => {
    const place = places.find((p) => p.id === placeId);
    if (place && placeRefs.current[placeId]) {
      placeRefs.current[placeId].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setSelectedPlace(place); 
    }
  };

  return (
    <SlideUpWhenVisible>

<Box 
      position="absolute" 
      top={0} 
      left={0} 
      right={0} 
      bottom={0} 
      bg={{ base: "gray.50", md: "white" }}
    >

    <Box  position="relative" height={{ base: "30vh", md: "100vh" }}  width="100%" boxShadow={"md"}>
      <MapContainer
        center={[29.3956, 71.6722]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
        />
        {places.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={DefaultIcon}
            eventHandlers={{
              click: () => handleMarkerClick(place.id),
            }}
          >
          </Marker>
        ))}
        {selectedPlace && (
          <UpdateMapCenter
            center={[selectedPlace.lat, selectedPlace.lng]}
            zoom={8}
          />
        )}
                <HomeButton /> 

      </MapContainer>

      <Box

      flex={{ base: 1, md: "none" }}
      overflowY="auto"
       bg={{ base: "gray.50", md: "none" }} 
        ref={panelRef}
        position={{ base: "relative", md: "absolute" }} 
        top={{  md: "0" }} 
        width={{ base: "100%", md: "400px", xl: "350px"}}
        height={{ base: "200%", md:"90vh", lg:"95vh", xl: "80vh" }}
        left={{ base: "0", md: "100px" }} 
        zIndex={{ base: "none", md: "1000" }}
        css={{
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <VStack spacing={{ base: 0, md: 10 }} mb={5} align="stretch" bg={{ base: "gray.50", md: "none" }} fontFamily="Open Sauce One, sans-serif"
        textAlign={{ base: "center", md: "left" }}

>
          {places.map((place) => (
            <Box
              key={place.id}
              ref={(el) => (placeRefs.current[place.id] = el)}
              data-place-id={place.id}
              position="relative"
              padding="12px"
              backgroundColor="rgba(255, 255, 255, 0.8)"
              borderRadius="12px"
              boxShadow="md"
              mt="20px"
              transition="opacity 0.5s ease-in-out"
              opacity={selectedPlace?.id === place.id ? 1 : 0.6}
              _hover={{ opacity: 1 }}
              backdropFilter="blur(10px)"
            >
       
<Center
  position="absolute"
  top={{ base: "10px", sm: "-10px" }} 
  left={{ base: "50%", sm: "10px" }}  
  transform={{ base: "translate(-50%, -50%)", sm: "none" }} 
  zIndex="10"
>
                <CustomMarker number={place.id} />
              </Center>
              <Image
                src={place.image}
                alt={place.name}
                borderRadius="8px"
                mb="12px"
                width="100%"
                height="150px"
                objectFit="cover"
              />
              <Heading color="#2c3d90" as="h2"  mb="8px"
               size="lg"
               fontWeight="400"
               letterSpacing="-1px"
              
              >{place.name}</Heading>
              <Text color="#5F5D5D" 

              fontSize={{ base: "md", md: "xl", xl: "md"}}
              fontWeight="400"
              letterSpacing="-.5px"
              
              >{place.info}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
    </Box>

    </SlideUpWhenVisible>
    
     

  );

}
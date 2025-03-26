import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { useState, useEffect, useRef } from 'react';
import { Box, Heading, Text, Image, VStack, Center } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';  // Importing a FontAwesome icon
import SlideUpWhenVisible from '../components/SlideUpwhenVisible.js'; // Ensure the path is correct


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

  const handleHomeClick = () => {
    map.setView([29.3956, 71.6722], 6); 
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "80px",
        left: "10px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <button
        onClick={handleHomeClick}
        style={{
          backgroundColor: "white", // New color
          border: "1px solid #ccc",
          borderRadius: "12px", // Rounded edges
          padding: "10px", // Ensures it has a square shape
          fontSize: "20px",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FaHome size={24} color="#2c3d90" /> {/* White color for icon */}
      </button>
    </div>
  );
};

const places = [
  {
    id: 1,
    lat: 24.8607,
    lng: 67.0011,
    name: 'Karachi',
    info: 'Karachi is the largest city in Pakistan and the twelfth-largest in the world. It is the capital of the Pakistani province of Sindh. Known as the "City of Lights" in the 1960s and 1970s for its vibrant nightlife, Karachi has been a premier financial and industrial center of Pakistan.',
    image: "/zia.jpg",
  },
  {
    id: 2,
    lat: 31.5497,
    lng: 74.3436,
    name: 'Lahore',
    info: 'Lahore is the second-largest city in Pakistan and the capital of the province of Punjab. It is known as the "Heart of Pakistan" for its rich history and culture. Lahore is home to numerous historical landmarks, including the Badshahi Mosque, Lahore Fort, and Shalimar Gardens.',
    image: "/zia.jpg",
  },
  {
    id: 3,
    lat: 33.6844,
    lng: 73.0479,
    name: 'Islamabad',
    info: 'Islamabad is the capital city of Pakistan and is located in the Pothohar Plateau in the northern part of the country. It is known for its high standards of living, safety, and abundant greenery. The city is home to the Faisal Mosque, which is one of the largest mosques in the world.',
    image: "/zia.jpg",
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

// Component to smoothly move the map
function UpdateMapCenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom); // Smooth transition to the new center and zoom level
  }, [center, zoom, map]);
  return null;
}

export default function PakistanMap() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapCenter, setMapCenter] = useState([29.3956, 71.6722]); // Initial center

  const panelRef = useRef(null);
  const placeRefs = useRef({});

  useEffect(() => {
    if (!panelRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const placeId = entry.target.getAttribute('data-place-id');
        const place = places.find((p) => p.id === parseInt(placeId));

        if (entry.isIntersecting && place) {
          setSelectedPlace(place); // Set the selected place when the panel is in view
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
      setSelectedPlace(place); // Set the selected place when the marker is clicked
    }
  };

  return (
    <SlideUpWhenVisible>
    <Box position="relative" height="600px" width="100%">
      <MapContainer
        center={[29.3956, 71.6722]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
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
        ref={panelRef}
        position="absolute"
        top="0"
        left="100px"
        zIndex="1000"
        width="350px"
        height="600px"
        overflowY="auto"
        css={{
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <VStack spacing={10} align="stretch">
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
                top="-10px"
                left="10px"
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
              <Heading as="h2" size="md" mb="8px">{place.name}</Heading>
              <Text>{place.info}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
    </SlideUpWhenVisible>

  );

}

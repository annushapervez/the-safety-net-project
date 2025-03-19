
export default function PakistanMap() {
  const [selected, setSelected] = useState(false);
  const [visiblePlace, setVisiblePlace] = useState(places[0]); // Start with Karachi
  const [highlightedPlace, setHighlightedPlace] = useState(null);
  const [shouldUpdateMap, setShouldUpdateMap] = useState(false);
  const panelRef = useRef(null);
  const placeRefs = useRef({});

  // Track visible panel and update map center
  useEffect(() => {
    if (!panelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const placeId = entry.target.getAttribute('data-place-id');
            const place = places.find((p) => p.id === parseInt(placeId));
            if (place && place !== visiblePlace) {
              setVisiblePlace(place);
              setShouldUpdateMap(true); // Allow map to update
            }
          }
        });
      },
      {
        root: panelRef.current,
        threshold: 1,
      }
    );

    const placeElements = panelRef.current.querySelectorAll('[data-place-id]');
    placeElements.forEach((el) => observer.observe(el));

    return () => {
      placeElements.forEach((el) => observer.unobserve(el));
    };
  }, [visiblePlace]);

  // Trigger scroll behavior when the marker is clicked and panel becomes visible
  useEffect(() => {
    if (selected && placeRefs.current[visiblePlace.id]) {
      // Wait for the panel to be visible
      setTimeout(() => {
        placeRefs.current[visiblePlace.id].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);  // Small delay to ensure the panel is visible first
    }
  }, [selected, visiblePlace]); // Only run this effect when selection changes

  const handleMarkerClick = (place) => {
    setSelected(true);
    setVisiblePlace(place);
    setHighlightedPlace(place);
    setShouldUpdateMap(true);
  };

  const handleMapUpdateComplete = () => {
    setShouldUpdateMap(false); // Reset after the map update is complete
  };

  return (
    <Box position="relative" height="600px" width="100%">
      <MapContainer
        center={[29.3956, 71.6722]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        touchZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {places.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={redIcon}
            eventHandlers={{
              click: () => handleMarkerClick(place),
            }}
          >
            <Popup closeButton={false}>{place.name}</Popup>
            <CustomMarker number={place.id} />
          </Marker>
        ))}
        <UpdateMapCenter
          center={[visiblePlace.lat, visiblePlace.lng]}
          zoom={8}
          shouldUpdate={shouldUpdateMap}
          onUpdateComplete={handleMapUpdateComplete}
        />
      </MapContainer>

      {selected && (
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
                opacity={highlightedPlace?.id === place.id ? 1 : 0.6}
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
      )}
    </Box>
  );
}

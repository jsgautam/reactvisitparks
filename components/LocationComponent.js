import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';

// Define mapping of region names to short forms
const regionShortForms = {
  'Uttar Pradesh': 'UP',
  'Delhi': 'DL',
  'Uttrakhand': 'UK',
  // Add more mappings as needed
};

const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationName, setLocationName] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Reverse geocoding
      let geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      if (geocode.length > 0) {
        let cityName = geocode[0].city;
        let regionName = geocode[0].region;
        let shortForm = regionShortForms[regionName];
        if (shortForm) {
          regionName = shortForm;
        }
        setLocationName(`${cityName}, ${regionName}`);
      } else {
        setLocationName("Unknown location");
      }
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location && locationName) {
    text = `${locationName}`;
  }

  return (
    <Text style={{ fontSize: 12, fontWeight: '400', color: '#FFFFFF' }}>{text}</Text>
  );
};

export default LocationComponent;

import React, { useEffect, useRef, useState } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Image, Text, View, StyleSheet, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker } from 'react-native-maps';
import customMapStyle from '../components/CustomMapStyle';
import LocationComponent from '../components/LocationComponent';

import GetLocation from '../components/GetLocation';
import { useRouter } from 'expo-router';
import useFetchData from '../hooks/useFetchData';
import CustomActivityIndicator from '../components/CustomActivityIndicator';

const dashboard = () => {

    const router = useRouter();


    const screenWidth = Dimensions.get('window').width;

    const [currentLocation, setCurrentLocation] = useState(null);

    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const mapRef = useRef(null);

    const flatListRef = useRef(null); // Create a ref for the FlatList component

    const handleMarkerPress = (index) => {
        // Scroll to the specified index in the FlatList
        flatListRef.current.scrollToIndex({ index: index, animated: true });
    };

    const handleLocationUpdate = (location) => {
        setCurrentLocation(location);
    };

    const initialRegion = {
        latitude: currentLocation ? currentLocation.latitude : 28.583693, // Initial latitude
        longitude: currentLocation ? currentLocation.longitude : 77.3147975, // Initial longitude
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    const { data, isLoading, error } = useFetchData("search", {
        query: 'Parks in India',
        limit: '30',
        lat: initialRegion.latitude,
        lng: initialRegion.longitude,
        zoom: '17',
        language: 'en',
        region: 'hi'
    });

    const handleItemScroll = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            // Get the index of the first viewable item
            const index = viewableItems[0].index;
            setSelectedItemIndex(index);

            // Calculate the region to zoom in on based on the selected item's coordinates
            const selectedItem = data[index];
            const region = {
                latitude: selectedItem.latitude,
                longitude: selectedItem.longitude,
                latitudeDelta: 0.01, // Adjust as needed for zoom level
                longitudeDelta: 0.01, // Adjust as needed for zoom level
            };

            // Zoom in on the calculated region
            mapRef.current.animateToRegion(region, 1000); // Adjust duration as needed
        }
    };


    const getItemLayout = (data, index) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index,
    });

    const CustomListItem = ({ item, index }) => {
        return (
            <View style={{ width: screenWidth, padding: 20 }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { router.push(`/park/${index}`) }}>
                    <View style={{ backgroundColor: '#FFFFFF', gap: 10, paddingBottom: 20, borderRadius: 20, borderWidth: 2, borderColor: '#E0E0E0', flex: 1 }}>
                        <Image source={{ uri: `${item.photos_sample[0].photo_url_large}` }} style={{ width: '100%', height: 200, borderRadius: 20 }} />
                        <View style={{ gap: 2, paddingLeft: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: '700', color: '#0FB469' }}>{item.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                    <FontAwesome6 name="location-dot" size={14} color="#BDBDBD" />
                                    <Text style={{ color: '#BDBDBD', fontSize: 14, fontWeight: '500' }}>{item.state}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                    <FontAwesome name="star" size={14} color="#BDBDBD" />
                                    <Text style={{ color: '#BDBDBD', fontSize: 14, fontWeight: '500' }}>{item.rating}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };



    return (
        <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
            <StatusBar style="light" backgroundColor="#0FB469" />
            {isLoading ? (
                <CustomActivityIndicator />
            ) : error ? (
                <Text>Error: {error.message}</Text>
            ) : (
                <View style={styles.container}>
                    <View style={styles.topcon}>
                        <Text style={styles.topconheading}>Nearby Parks</Text>
                        <View style={styles.locationcon}>
                            <FontAwesome6 name="location-dot" size={18} color="white" />
                            {/* <Text style={{ fontSize: 12, fontWeight: '400', color: '#FFFFFF' }}>Noida, UP</Text> */}
                            {/* <LocationComponent /> */}
                            <GetLocation />
                        </View>
                    </View>
                    <View style={styles.mapcontainer}>
                        <MapView
                            style={styles.map}
                            initialRegion={initialRegion}
                            ref={mapRef}
                        >

                            {data.map((location, index) => (
                                <Marker
                                    key={index} // Make sure to use a unique key
                                    coordinate={{
                                        latitude: location.latitude,
                                        longitude: location.longitude
                                    }}
                                    title={location.name}
                                    description={location.address}
                                    image={require('../assets/custom-marker.png')} // Or use your marker image
                                    style={{ width: 20, height: 20 }}
                                    onPress={() => handleMarkerPress(index)}
                                />
                            ))}
                        </MapView>
                    </View>

                    <View style={styles.bottomcontainer}>
                        {data ? (
                            <FlatList
                                ref={flatListRef}
                                data={data}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => <CustomListItem item={item} index={index} />}
                                keyExtractor={(item, index) => index.toString()}
                                onViewableItemsChanged={handleItemScroll}
                                getItemLayout={getItemLayout}
                            />
                        ) : (
                            <Text>Loading...</Text>
                        )}

                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0FB469',
        flex: 1,
        alignItems: 'center'
    },
    topcon: {
        padding: 20,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    topconheading: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    locationcon: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 1000
    },
    mapcontainer: {
        backgroundColor: '#000000',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 40,
        overflow: 'hidden',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    bottomcontainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
    }
});

export default dashboard;
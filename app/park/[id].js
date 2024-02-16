import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from 'expo-status-bar';
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import MapView, { Marker } from 'react-native-maps';
import customMapStyle from "../../components/CustomMapStyle";

import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import useFetchData from "../../hooks/useFetchData";
import CustomActivityIndicator from "../../components/CustomActivityIndicator";
import CustomSlider from "../../components/CustomSlider";

const Park = () => {

    const router = useRouter();
    const screenWidth = Dimensions.get('window').width;

    const glob = useGlobalSearchParams();
    const local = useLocalSearchParams();

    const initialRegion = {
        latitude: 28.583693, // Initial latitude
        longitude: 77.3147975, // Initial longitude
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

    useEffect(() => {
        // Check if data is available and not loading
        if (!isLoading && !error && data) {
            // Assuming data is an array of indexes
            console.log("Fetched Indexes:", data[glob.id]);
        }
    }, [data, isLoading, error]);

    return (
        <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
            <StatusBar style="dark" backgroundColor="#FFFFFF" />

            {isLoading ? (
                <CustomActivityIndicator></CustomActivityIndicator>
            ) : error ? (
                <Text>Error: {error.message}</Text>
            ) : (

                data && data[glob.id] && (
                    <>
                        <View style={styles.container}>
                            <View style={styles.topnavbar}>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => { router.push('dashboard') }}>
                                    <FontAwesome6 name="angle-left" size={24} color="black" />
                                </TouchableOpacity>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.topnavbartitle}>{data[glob.id].name ? data[glob.id].name : 'Not Available'}</Text>
                                <Text style={styles.topnavbarbutton}>{data[glob.id].business_status ? data[glob.id].business_status : ''}</Text>
                            </View>



                            <ScrollView contentContainerStyle={styles.scrollviewstyle} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                                <View style={styles.imagecon}>
                                    <Image source={{ uri: `${data[glob.id].photos_sample[0].photo_url_large}` }} style={styles.image} />
                                </View>

                                <View style={styles.detailcon}>
                                    <View style={styles.detailnamecon}>
                                        <Text style={styles.detailtitle}>{data[glob.id].name ? data[glob.id].name : 'Not Available'}</Text>
                                        {data[glob.id].verified == true && <Image source={require('../../assets/badge.png')} style={{ width: 24, height: 24, objectFit: 'contain' }} />}
                                    </View>
                                    <View style={styles.addresscon}>
                                        <FontAwesome6 name="location-dot" size={18} color="#0FB469" />
                                        <Text style={styles.descriptiontitle}>{data[glob.id].address ? data[glob.id].address : 'Not Available'}</Text>
                                    </View>
                                </View>

                                <View style={styles.chipcon}>
                                    <Text style={styles.chiptext}>{data[glob.id].subtypes[0] ? data[glob.id].subtypes[0] : ''}</Text>
                                    <Text style={styles.chiptext}>{data[glob.id].subtypes[1] ? data[glob.id].subtypes[1] : ''}</Text>
                                </View>

                                <View style={styles.aboutcon}>
                                    <Text style={styles.detailtitle}>About</Text>
                                    <Text style={styles.descriptiontitle}>{data[glob.id].about.summary ? data[glob.id].about.summary : 'Not Available'}</Text>
                                </View>

                                <View style={styles.ratingcon}>
                                    <View>
                                        <Text style={styles.ratingtitle}>{data[glob.id].rating ? data[glob.id].rating : '0.0'}</Text>
                                        <Text style={styles.descriptiontitle}>{data[glob.id].review_count ? data[glob.id].review_count : '0'}</Text>
                                    </View>
                                    <View style={styles.ratingslidercon}>
                                        <View style={styles.ratingsliderinnercon}>
                                            <Text style={styles.ratingsliderinnercontitle}>1</Text>
                                            <CustomSlider maxslider={data[glob.id].review_count ? data[glob.id].review_count : '0'} slidervalue={data[glob.id].reviews_per_rating[1] ? data[glob.id].reviews_per_rating[1] : '0'} />
                                        </View>

                                        <View style={styles.ratingsliderinnercon}>
                                            <Text style={styles.ratingsliderinnercontitle}>2</Text>
                                            <CustomSlider maxslider={data[glob.id].review_count ? data[glob.id].review_count : '0'} slidervalue={data[glob.id].reviews_per_rating[2] ? data[glob.id].reviews_per_rating[2] : '0'} />
                                        </View>

                                        <View style={styles.ratingsliderinnercon}>
                                            <Text style={styles.ratingsliderinnercontitle}>3</Text>
                                            <CustomSlider maxslider={data[glob.id].review_count ? data[glob.id].review_count : '0'} slidervalue={data[glob.id].reviews_per_rating[3] ? data[glob.id].reviews_per_rating[3] : '0'} />
                                        </View>

                                        <View style={styles.ratingsliderinnercon}>
                                            <Text style={styles.ratingsliderinnercontitle}>4</Text>
                                            <CustomSlider maxslider={data[glob.id].review_count ? data[glob.id].review_count : '0'} slidervalue={data[glob.id].reviews_per_rating[4] ? data[glob.id].reviews_per_rating[4] : '0'} />
                                        </View>

                                        <View style={styles.ratingsliderinnercon}>
                                            <Text style={styles.ratingsliderinnercontitle}>5</Text>
                                            <CustomSlider maxslider={data[glob.id].review_count ? data[glob.id].review_count : '0'} slidervalue={data[glob.id].reviews_per_rating[5] ? data[glob.id].reviews_per_rating[5] : '0'} />
                                        </View>

                                    </View>
                                </View>

                                <View style={styles.workingcon}>
                                    <MaterialCommunityIcons name="clock-time-four" size={20} color="#0FB469" />
                                    <Text style={styles.detailtitle}>Working Hours</Text>
                                </View>

                                <View style={styles.workinghourcon}>

                                    <View style={styles.flexrow}>
                                        <Text style={styles.workinghourday}>Monday</Text>
                                        <Text style={styles.workinghourday}>{data[glob.id].working_hours ? data[glob.id].working_hours.Monday[0] : 'Not Available'}</Text>
                                    </View>
                                    <View style={styles.flexrow}>
                                        <Text style={styles.workinghourday}>Tuesday</Text>
                                        <Text style={styles.workinghourday}>{data[glob.id].working_hours ? data[glob.id].working_hours.Tuesday[0] : 'Not Available'}</Text>
                                    </View>
                                    <View style={styles.flexrow}>
                                        <Text style={styles.workinghourday}>Wednesday</Text>
                                        <Text style={styles.workinghourday}>{data[glob.id].working_hours ? data[glob.id].working_hours.Wednesday[0] : 'Not Available'}</Text>
                                    </View>
                                    <View style={styles.flexrow}>
                                        <Text style={styles.workinghourday}>Thursday</Text>
                                        <Text style={styles.workinghourday}>{data[glob.id].working_hours ? data[glob.id].working_hours.Thursday[0] : 'Not Available'}</Text>
                                    </View>
                                    <View style={styles.flexrow}>
                                        <Text style={styles.workinghourday}>Friday</Text>
                                        <Text style={styles.workinghourday}>{data[glob.id].working_hours ? data[glob.id].working_hours.Friday[0] : 'Not Available'}</Text>
                                    </View>
                                    <View style={styles.flexrow}>
                                        <Text style={styles.workinghourday}>Saturday</Text>
                                        <Text style={styles.workinghourday}>{data[glob.id].working_hours ? data[glob.id].working_hours.Saturday[0] : 'Not Available'}</Text>
                                    </View>
                                    <View style={styles.flexrow}>
                                        <Text style={styles.workinghourday}>Sunday</Text>
                                        <Text style={styles.workinghourday}>{data[glob.id].working_hours ? data[glob.id].working_hours.Sunday[0] : 'Not Available'}</Text>
                                    </View>
                                </View>

                                <View style={{ width: screenWidth, padding: 20 }}>
                                    <View style={{ flex: 1, borderRadius: 20, overflow: "hidden" }}>
                                        <MapView
                                            style={{ flex: 1, height: 250 }}
                                            initialRegion={{
                                                latitude: data[glob.id].latitude ? data[glob.id].latitude : 28.5835274, // Initial latitude
                                                longitude: data[glob.id].longitude ? data[glob.id].longitude : 77.2323488, // Initial longitude
                                                latitudeDelta: 0.01,
                                                longitudeDelta: 0.01,
                                            }}
                                        >

                                            <Marker
                                                coordinate={{
                                                    latitude: data[glob.id].latitude ? data[glob.id].latitude : 28.5835274,
                                                    longitude: data[glob.id].longitude ? data[glob.id].longitude : 77.2323488
                                                }}
                                                title={data[glob.id].name ? data[glob.id].name : 'Not Available'}
                                                description={data[glob.id].address ? data[glob.id].address : 'Not Available'}
                                                image={require('../../assets/custom-marker.png')}
                                                style={{ width: 20, height: 20 }}
                                            />
                                        </MapView>
                                    </View>
                                </View>


                            </ScrollView>

                            <View style={{ width: screenWidth, flexDirection: 'row', gap: 10, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', paddingBottom: 10 }}>
                                <View style={{ backgroundColor: '#0FB469', padding: 15, flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10, borderRadius: 10 }}>
                                    <FontAwesome name="map" size={15} color="#FFFFFF" />
                                    <Text onPress={() => { Linking.openURL(`${data[glob.id].place_link ? data[glob.id].place_link : 'https://www.google.com'}`) }} style={{ fontSize: 16, fontWeight: '500', color: '#FFFFFF' }}>Google Maps</Text>
                                </View>
                                <View style={{ backgroundColor: '#0FB469', padding: 15, flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10, borderRadius: 10 }}>
                                    <MaterialIcons name="call" size={24} color="#FFFFFF" />
                                    <Text onPress={() => { Linking.openURL(`tel:${data[glob.id].phone_number ? data[glob.id].phone_number : +911234567890}`) }} style={{ fontSize: 16, fontWeight: '500', color: '#FFFFFF' }}>Call</Text>
                                </View>
                            </View>
                        </View>
                    </>
                )

            )}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        alignItems: 'center'
    },
    topnavbar: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center'
    },
    topnavbartitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333333',
        width: 200
    },
    topnavbarbutton: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0FB469'
    },
    scrollviewstyle: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagecon: {
        width: Dimensions.get('window').width,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        objectFit: 'cover'
    },
    detailcon: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        width: '100%'
    },
    detailnamecon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    detailtitle: {
        fontSize: 18,
        fontWeight: '600'
    },
    addresscon: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 5,
        width: '100%'
    },
    descriptiontitle: {
        fontSize: 14,
        fontWeight: '400'
    },
    chipcon: {
        width: Dimensions.get('window').width,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 0,
        paddingBottom: 0,
        flexDirection: 'row',
        gap: 15,
        flexWrap: 'wrap'
    },
    chiptext: {
        backgroundColor: '#0FB469',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 1000,
        color: '#FFFFFF'
    },
    aboutcon: {
        width: Dimensions.get('window').width,
        padding: 20
    },
    ratingcon: {
        width: Dimensions.get('window').width,
        padding: 20,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        gap: 30
    },
    ratingtitle: {
        fontSize: 50,
        fontWeight: '900',
        color: '#0FB469'
    },
    ratingslidercon: {
        flex: 1,
        marginLeft: 30,
        gap: 8
    },
    ratingsliderinnercon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    ratingsliderinnercontitle: {
        marginRight: 5,
        fontSize: 16,
        fontWeight: '400'
    },
    sliderouter: {
        backgroundColor: '#E0E0E0',
        width: '100%',
        flex: 1,
        height: 15,
        borderRadius: 1000
    },
    sliderinner: {
        backgroundColor: '#0FB469',
        width: '50%',
        flex: 1,
        borderRadius: 1000
    },
    workingcon: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        paddingLeft: 20,
        paddingTop: 10
    },
    workinghourcon: {
        width: Dimensions.get('window').width,
        paddingLeft: 20,
        paddingRight: 20,
        gap: 5,
        paddingTop: 12
    },
    flexrow: {
        flexDirection: 'row'
    },
    workinghourday: {
        width: '30%',
        fontSize: 16
    }
});
export default Park;
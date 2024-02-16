import React from "react";
import { Text, View, StyleSheet } from "react-native";

const CustomSlider = ({ maxslider, slidervalue }) => {

    const slidepercentage = (slidervalue / maxslider) * 100;

    return (
        // <Text>{slidepercentage}</Text>
        <View style={styles.sliderouter}>
            <View style={[styles.sliderinner, { width: `${slidepercentage}%` }]}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    sliderouter: {
        backgroundColor: '#E0E0E0',
        width: '100%',
        flex: 1,
        height: 15,
        borderRadius: 1000,
        overflow:'hidden'
    },
    sliderinner: {
        backgroundColor: '#0FB469',
        flex: 1,
        borderRadius: 1000,
        overflow:'hidden'
    },
});

export default CustomSlider;
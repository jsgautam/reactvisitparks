import React, { useEffect } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const Splash = () => {

    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.replace('dashboard');
        }, 1500);

        return () => clearTimeout(timeout);
    }, [router]);


    return (
        <SafeAreaView style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
            <View style={{ backgroundColor: '#FFFFFF', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/svglogo-svg.png')} style={styles.image} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 360,
        height: 280,
        objectFit: 'cover',
        marginEnd:20
    }
});

export default Splash;
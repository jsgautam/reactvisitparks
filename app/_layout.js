import React from 'react';
import { Stack } from 'expo-router/stack';


export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: "index",
};

export default function Layout() {

    return (
        <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="dashboard" />
            <Stack.Screen name="park/[id]" />
        </Stack>
    );
}
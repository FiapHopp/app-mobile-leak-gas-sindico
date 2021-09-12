
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function LoadingSplash() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#292E33" />
        </View>        
    );
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ea7d23',
        flex: 1,
        justifyContent: 'center'
    }
});
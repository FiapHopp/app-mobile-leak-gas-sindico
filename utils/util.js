
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

//EXIBE O LOADING DE CARREGAMENTO GERAL
export default function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#D94501" />
        </View>        
    );
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#292E33',
        flex: 1,
        justifyContent: 'center'
    }
});
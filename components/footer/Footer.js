import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-elements'

export default function Footer({ navigation }) {

    return (
        <View style={{ backgroundColor: "#D94501", color: 'white', position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'column' }}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={{ flexDirection: 'column', flex: 1 }}
                    onPress={() => navigation.navigate("Details")}>

                    <View style={{ flexDirection: 'column'}}>
                        <Icon
                            name='menu'
                            type='ionicon'
                            color='#ffffff' />
                        <Text style={styles.texto}>Menu</Text>                    
                    </View>
                </TouchableOpacity>

                <View style={{ flexDirection: 'column'}}>
                    <Icon
                        name='business'
                        type='ionicon'
                        color='#ffffff' />
                    <Text style={styles.texto}>Condomínio</Text>                    
                </View>
                <View style={{ flexDirection: 'column'}}>
                    <Icon
                        name='glasses'
                        type='ionicon'
                        color='#ffffff' />
                    <Text style={styles.texto}>Visão Geral</Text>                    
                </View>
                <View style={{ flexDirection: 'column'}}>
                    <Icon
                        name='help'
                        type='ionicon'
                        color='#ffffff' />
                    <Text style={styles.texto}>Ajuda</Text>                    
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around'
    },
    texto:{
        color: 'white',
        fontFamily: 'Calibri',
        fontSize: 16

        
    }
});
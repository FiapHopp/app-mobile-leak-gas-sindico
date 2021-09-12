import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import getImage from '../../../utils/Images';

export default function ImagemApartamento({ apartamento }) {

    return (
        <View>
            {apartamento.ativo && (
                <View style={{ marginBottom: 20, flex:1, alignItems: 'center' }}>
                    <Image
                        style={styles.image}
                        source={getImage('janela-ok')} />
                    <Text>{apartamento.nrApartamento} - {apartamento.bloco}</Text>
                </View>
            )}

            {!apartamento.ativo && (
                <View style={{ marginBottom: 20, flex:1, alignItems: 'center' }}>
                    <Image
                        style={styles.image}
                        source={getImage('janela-alarme')} />
                    <Text>{apartamento.numero} - {apartamento.bloco}</Text>
                </View>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    image: {
        height: 90,
        resizeMode: 'stretch',        
        width: 150
    }
});
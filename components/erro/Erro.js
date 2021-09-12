import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import getImage from '../../utils/Images';

export default function Erro() {
    
    return (
        <View style={ styles.container }>
            <Image
                style={ styles.image }
                source={ getImage('erro') } />
            <Text style={ styles.textTitle }>AWWW . . . NÃO CHORE.</Text>
            <Text style={ styles.text }>Foi somente um erro!</Text>
            <Text style={ styles.text }>Recarregue a página e tente novamente, caso não funcione basta contatar a nossa equipe técnica :)</Text>            
        </View>
    );
}
const styles = StyleSheet.create({    
    container:{
        alignItems: 'center',
        backgroundColor: '#151A21',
        flex:1,
        padding: 10
    },
    image:{        
        height: 300,
        width: 220        
    },
    textTitle:{
        fontFamily: 'Calibri',
        fontSize: 24, color: '#B4B2B2', 
        marginBottom: 20, 
    },
    text: {
        color: 'white', 
        fontSize: 18, 
        fontFamily: 'Calibri',
        textAlign: 'justify'
    }
});
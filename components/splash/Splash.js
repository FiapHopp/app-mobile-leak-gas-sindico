import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { logar } from '../../services/login.service';
import getImage from '../../utils/Images';

import LoadingSplash from '../../utils/Loading/LoadingSplash';

export default function Splash({ navigation }) {
    
    useEffect(() => {
        setTimeout(function(){ navigation.navigate("Login") }, 4000);
    }, [])

    return(
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={getImage('logo')} />
            <LoadingSplash/>
            
        </View>        
    );     
}
const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        backgroundColor: '#ea7d23',
        flex: 1,
        justifyContent: 'center'
    },
    image: {
        height: 450,
        resizeMode: 'stretch',
        width: 450,
    }
});
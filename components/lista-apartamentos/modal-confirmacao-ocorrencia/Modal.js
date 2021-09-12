import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Modal } from 'react-native';


export default function ModalConfirmacao() {

    const [visivel, setVisivel] = useState(false)
    
    return (
        <View>
            <Modal 
                style={{backgroundColor:'red'}}
                animationType="slide"
                transparent={true}
                visible={visivel}
                >
                <View>
                    <Text>TESTANDO</Text>
                    <Button 
                        title="fechar"/>

                </View>
            </Modal>
            
        </View>
    );


}
const styles = StyleSheet.create({
    
});
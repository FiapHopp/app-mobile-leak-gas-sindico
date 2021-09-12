import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { buscarCondominios } from '../../services/condominio.service';

import Loading from '../../utils/util';

export default function ListaCondominios({ route, navigation }) {
    const { idUsuario } = route.params;        
    const [lista, setLista] = useState([]);
    const [ativaLoad, setAtivaLoad] = useState(false);

    useEffect(() => {        
        setAtivaLoad(true);        
            buscarCondominios(idUsuario).then((retorno) => {
            setAtivaLoad(false);
            if (retorno.sts != 200) {                
                console.log("Erro ao consultar condomínios");
                navigation.navigate("Erro");
            }
            retorno.dados.then((dados) => {                
                setLista(dados.data);                
                setAtivaLoad(false);
            })
        }).catch((error) => {
            setAtivaLoad(false);
            console.log("Erro ao consultar condomínios | Erro: " + error);
        });

      }, [])

    //EXIBE LOADING DE CARREGAMENTO
    function ExibeLoad() {
        return (
            <Loading />
        );
    }

    //EXIBE OS DADOS DA TELA
    function ExibeDados() {
        return (
            <View style={styles.container}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, padding: 8 }}>Condomínios Vinculados</Text>
                <FlatList
                    data={lista}
                    keyExtractor={item => item.nome}
                    renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <TouchableOpacity 
                            style={{ flexDirection: 'column', flex: 1 }}
                            onPress={() => navigation.navigate("ListaApartamentos", { idCondominio: item.id, idUsuario: idUsuario}) }>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 5, fontWeight: 'bold', color: 'white' }}>{item.nome}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1, color: 'white' }}>{item.endereco}, {item.numeroEndereco}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1, color: 'white' }}>{item.cep}</Text>
                            </View>                            
                        </TouchableOpacity>
                    </View>
                    )}
                />
                {/* <Footer /> */}
            </View>
        );
    }

    //VALIDA SE EXIBE O LOADING DE CARREGAMENTO OU OS DADOS DA TELA
    function Exibir(flag) {
        return flag ? ExibeLoad() : ExibeDados();
    }

    return (
        <View style={{ flex: 1 }}>
            {Exibir(ativaLoad)}
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#292E33',
        borderRadius: 10,
        margin: 8,
        padding: 8
    },
    text: {
        flexWrap: 'wrap',
        fontFamily: 'Calibri',
        padding: 1
    },
    container: {
        backgroundColor: '#151A21',
        flex: 1
    }
});
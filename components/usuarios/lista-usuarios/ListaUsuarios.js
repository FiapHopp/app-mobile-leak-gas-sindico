import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements'

import { deletarUsuario, listarUsuarios } from '../../../services/usuario.service';

import Loading from '../../../utils/util';

export default function ListaUsuarios({ route, navigation }) {
    const { idCondominio, idUsuario } = route.params;
    const [lista, setLista] = useState([]);
    const [ativaLoad, setAtivaLoad] = useState(false);

    useEffect(() => {
        setAtivaLoad(true);        
        listaUsuario();
    }, [])

    //LISTAR USUARIO
    function listaUsuario() {
        listarUsuarios(idCondominio).then((retorno) => {
            setAtivaLoad(false);
            if (retorno.sts != 200) {
                console.log("Erro ao consultar usuários");
                navigation.navigate("Erro");
            }
            retorno.dados.then((dados) => {
                setLista(dados.data);                                
                setAtivaLoad(false);
            });
        }).catch((error) => {
            setAtivaLoad(false);
            console.log("Erro ao consultar usuários | Erro: " + error);
        });        
    }

    //EXCLUIR UM USUARIO
    function exluirUsuario(id_usuario){        
        deletarUsuario(id_usuario).then((retorno) => {
            setAtivaLoad(false);
            if (retorno.sts != 200) {
                console.log("Erro ao deletar usuário | Status: " + retorno.sts);
                navigation.navigate("Erro");
            }else{                
                setAtivaLoad(false);
                window.location.reload(true);
            }            
        }).catch((error) => {
            setAtivaLoad(false);
            console.log("Erro ao deletar usuário | Erro: " + error);
        });        
    }

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
                <TouchableOpacity
                    onPress={() => { navigation.navigate("CadastroUsuario"), { idCondominio: idCondominio, idUsuario: idUsuario } }}>
                    <Text style={styles.textButton}>Cadastrar usuário</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate("ListaApartamentos"), { idCondominio: idCondominio, idUsuario: idUsuario } }}>
                    <Text style={styles.textButton}>Lista apartamentos</Text>
                </TouchableOpacity>
                <FlatList
                    data={lista}
                    keyExtractor={item => item.nome}
                    renderItem={({ item }) => (
                        <View>
                            <View style={styles.itemContainer}>
                                <Text style={styles.text}>Nome: {item.nome}</Text>
                                <Text style={styles.text}>CPF: {item.cpf}</Text>
                                <Text style={styles.text}>Celular: {item.celular}</Text>
                                <TouchableOpacity
                                    onPress={()=>{exluirUsuario(item.id)}}>
                                    <Icon
                                        name='trash'
                                        type='ionicon'
                                        color='red' />
                                </TouchableOpacity>
                            </View>                            
                        </View>
                    )}
                />
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
        color: 'white',
        flexWrap: 'wrap',
        fontFamily: 'Calibri',
        padding: 1
    },
    container: {
        backgroundColor: '#151A21',
        flex: 1
    },
    textButton: {
        color: 'white',
        fontSize: 20,
        margin: 20,
        textDecorationLine: 'underline',
        textAlign: 'center'
    }
});
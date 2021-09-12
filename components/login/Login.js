
import React, { useState } from 'react';
import { Button, Image, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { logar } from '../../services/login.service';
import getImage from '../../utils/Images';

import Loading from '../../utils/util';

export default function Login({ navigation }) {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [ativaLoad, setAtivaLoad] = useState(false);
    const [ativaErro, setAtivaErro] = useState('2'); //0-falta preenchimento, 1-usuario ou senha incorretos, 2-nao exibe
    const { getItem, setItem } = useAsyncStorage('idUsuario');
    
    //VERIFICA SE O USUARIO E SENHA ESTAO CORRETOS
    function realizarLogin() {            
        var usuario = {
            "usuario": user,
            "senha": password
        };

        if(!camposValidos(usuario)){            
            setAtivaErro('0');
            return false;
        }else{
            setAtivaLoad(true);
            //VERIFICA SE O USUÁRIO EXISTE
            logar(usuario).then((retorno) => {                    
                setAtivaLoad(false);
                if(retorno.sts == 200){                    
                    retorno.dados.then((dados) => {                        
                        setAtivaErro('2');
                        setItem(dados.data.idUsuario);
                        navigation.navigate("ListaCondominios", { idUsuario: dados.data.idUsuario });
                    }); 
                }else if(retorno.sts === 400){                    
                    retorno.dados.then((dados) => {
                        if(dados.errors[0] == 'Usuário ou senha incorretos'){
                            setAtivaErro('1');
                        }else{
                            console.log("Erro ao realizar login");
                            navigation.navigate("Erro");
                        }
                    }) 
                }else{
                    setAtivaLoad(false);
                    setAtivaErro('2');                    
                    console.log("Erro ao realizar login");

                }
            }).catch((error) => {
                setAtivaLoad(false);
                setAtivaErro('2');
                console.log("Erro ao realizar login | Erro: " + error);
                navigation.navigate("Erro"); 
            });

        }        
    }
    
    //VERIFICA SE TEM ALGUM CAMPO SEM PREENCHIMENTO
    function camposValidos(usuario) {
        return usuario.usuario == '' || usuario.senha == '' ? false : true;
    }

    //VERIFICA QUAL O ERRO E CASO EXISTA INFORMA UMA MENSAGEM PARA O USUÁRIO
    function ExibirMensagemErro(flag) {
        if (flag == '0') {
            return (
                <View>
                    <Text style={{ fontSize: 20, color: 'white' }}>Por favor, preencha todos os campos!</Text>
                </View>
            )
        } else if (flag == '1') {
            return (
                <View>
                    <Text style={{ fontSize: 20, color: 'white' }}>Usuário ou senha incorretos</Text>
                </View>
            )
        }
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
            <ImageBackground
                source={getImage('background')}
                imageStyle={styles.imageBackground}
                style={styles.imageContainer}>
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={getImage('logo-transparente')} />
                    <TextInput style={styles.inputStyle}
                        keyboardType="text"
                        onChangeText={setUser}
                        placeholder="usuário"
                        value={user} />
                    <TextInput style={styles.inputStyle}
                        keyboardType="password"
                        onChangeText={setPassword}
                        placeholder="senha"
                        secureTextEntry={true}
                        value={password} />

                    {ExibirMensagemErro(ativaErro)}

                    <View style={styles.conteinerButton}>
                        <Button style={styles.button}
                            color="#2F2E2E"
                            title="Entrar na minha conta"
                            accessibilityLabel="Botão que realiza o login"
                            onPress={realizarLogin} />
                    </View>
                </View>
            </ImageBackground>
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
    image: {
        height: 200,
        resizeMode: 'stretch',
        width: 200
    },
    container: {
        alignItems: 'center',
        backgroundColor: 'black',
        flex: 1,
        opacity: 0.7,
        padding: 16
    },
    imageContainer: {
        flex: 1
    },
    inputStyle: {
        backgroundColor: 'white',
        borderColor: 'gray',
        borderRadius: 1,
        borderWidth: 2,
        height: 40,
        marginBottom: 10,
        paddingHorizontal: 5,
        width: 300
    },
    imageBackground: {
        flex: 1,
        height: null,
        resizeMode: 'cover',
        width: null
    },
    conteinerButton: {
        alignItems: 'center',
        flex: 1,
        marginTop: 30
    },
});
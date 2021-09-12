
import React, { useState } from 'react';
import { Button,StyleSheet, Text, TextInput, View} from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { cadastrarUsuario, cadastrarUsuarioTeste } from '../../../services/usuario.service';

import Loading from '../../../utils/util';

export default function CadastroUsuario({ route, navigation }) {

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [celular, setCelular] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [ativaLoad, setAtivaLoad] = useState(false);
    const [ativaErro, setAtivaErro] = useState(false);
    const { idCondominio, idUsuario } = route.params;
    
    const { getItem, setItem } = useAsyncStorage('idUsuario');

    //REALIZA O CADASTRO DE UM USUÁRIO COM OS DADOS DO FORM
    function realizarCadastro () { 

        var usuario = {
            "nome": nome,
            "cpf": cpf,
            "telefone": celular,
            "login": user,
            "senha": password,
            "nivelAcesso": 0
        };

        if(!camposValidos(usuario)){
            setAtivaErro(true);                      
            return false;
        }else{
            setAtivaErro(false); 
            setAtivaLoad(true);
            cadastrarUsuarioTeste(usuario).then((retorno) => {
                if (retorno.sts == 201) {
                    setAtivaLoad(false);
                    navigation.navigate("ListaUsuarios", { idCondominio: idCondominio, idUsuario: idUsuario });                
                } else {
                    setAtivaLoad(false);
                    console.log("Erro ao realizar cadastro");
                    navigation.navigate("Erro");
                }
            }).catch((error) => {
                setAtivaLoad(false);
                console.log("Erro ao realizar cadastro | Erro: " + error);
                navigation.navigate("Erro");
            })
        }
    }

    //VERIFICA SE TEM ALGUM CAMPO SEM PREENCHIMENTO
    function camposValidos(usuario){
        return usuario.nome == '' || usuario.cpf == '' || usuario.celular == '' || usuario.usuario == '' || usuario.senha == '' ? false : true;        
    }

    //EXIBE MENSAGEM DE ERRO CASO EXISTA
    function ExibirMensagemErro(flag){
        if(flag){
            return (
                <View>
                    <Text>Verifique as informações do formulário!</Text>
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
            <View style={styles.container}>
                <View style={styles.containerCard}>
                    {ExibirMensagemErro(ativaErro)}

                    <View style={styles.containerInput}>
                        <TextInput style={styles.inputStyle}
                            keyboardType="text"
                            onChangeText={setNome}
                            placeholder="Nome"
                            value={nome} />
                    </View>
                    <View style={styles.containerInput}>
                        <TextInput style={styles.inputStyle}
                            keyboardType="text"
                            onChangeText={setCpf}
                            placeholder="CPF"
                            value={cpf} />
                    </View>
                    <View style={styles.containerInput}>
                        <TextInput style={styles.inputStyle}
                            keyboardType="text"
                            onChangeText={setCelular}
                            placeholder="Celular"
                            value={celular} />
                    </View>
                    <View style={styles.containerInput}>
                        <TextInput style={styles.inputStyle}
                            keyboardType="text"
                            onChangeText={setUser}
                            placeholder="Usuário"
                            value={user} />
                    </View>
                    <View style={styles.containerInput}>
                        <TextInput style={styles.inputStyle}
                            keyboardType="text"
                            onChangeText={setPassword}
                            placeholder="Senha"
                            value={password} />
                    </View>
                    <View style={styles.conteinerButton}>
                        <Button
                            color="#2F2E2E"
                            title="Cadastrar"
                            accessibilityLabel="Botão que realiza o cadastro de usuário"
                            onPress={realizarCadastro} />
                    </View>
                </View>
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
    containerInput: {
        alignItems: 'baseline',
        flexDirection: 'row'
    },
    containerCard: {
        backgroundColor: '#151A21',
        padding: 30,
        shadowColor: 'white',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 10

    },
    container: {
        alignItems: 'center',
        backgroundColor: '#151A21',
        flex: 1,
        justifyContent: 'center',
        padding: 16,

    },
    inputStyle: {
        backgroundColor: 'none',
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
        borderRadius: 1,
        height: 40,
        marginBottom: 10,
        paddingHorizontal: 5,
        width: 300
    },
    conteinerButton: {
        alignItems: 'center',
        flex: 1,
        marginTop: 30
    }
});
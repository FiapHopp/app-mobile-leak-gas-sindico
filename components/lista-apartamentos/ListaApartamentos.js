import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { atualizarOcorrenciaApartamento, buscarApartamentos, buscarApartamentosTeste } from '../../services/apartamento.service';

import ImagemApartamento from './lista-apartamento-imagem/ImagemApartamento';
import Loading from '../../utils/util';

export default function ListaApartamentos({ route, navigation }) {
    const { idCondominio, idUsuario } = route.params;
    const [lista, setLista] = useState([]);
    const [ativaLoad, setAtivaLoad] = useState(false);

    
    useEffect(() => {
        buscaApartamentos(id);
    }, [])

    //ATUALIZA OCORRÊNCIA PARA NORMALIZADA DO APARTAMENTO SELECIONADO
    function atualizaOcorrencia(id_apartamento) {
        setAtivaLoad(true)
        atualizarOcorrenciaApartamento(id_apartamento).then((retorno) => {
            if(retorno.sts == 200){
                console.log("Sucesso ao atualizar ocorrência")
                window.location.reload(true);
            }else{
                setAtivaLoad(false)
                console.log("Erro ao atualizar ocorrência")
            }
        }).catch((error) => {
            console.log("Erro ao atualizar ocorrência | Erro: " + error)
            setAtivaLoad(false)            
        });
    }

    //BUSCA A LISTA DE TODOS OS APARTAMENTOS ATRAVÉS DO ID DO CONDOMINIO SELECIONADO
    function buscaApartamentos(){
        setAtivaLoad(true)        
        //buscarApartamentos(idCondominio).then((retorno) => {
            buscarApartamentos(idUsuario).then((retorno) => {
            if(retorno.sts == 200){                
                setAtivaLoad(false)
                retorno.dados.then((data) => {
                    setLista(data);
                })
            }else{
                setAtivaLoad(false)
                console.log("Erro ao buscar lista de apartamentos");
                navigation.navigate("Erro"); 
            }
            
        }).catch((error) => {
            setAtivaLoad(false)
            console.log("Erro ao buscar lista de apartamentos | Erro: " + error);
            navigation.navigate("Erro");             
        })
    }
    
    //VERIFICA SE EXIBE IMAGEM DE ALARME OU DE STATUS NORMALIZADO
    function exibeImagem(apartamento) {
        if (!apartamento.ativo) {
            return (
                <TouchableOpacity onPress={() => atualizaOcorrencia(apartamento.idApartamento)}>
                    <View>
                        <ImagemApartamento apartamento={apartamento} />
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <View>
                    <ImagemApartamento apartamento={apartamento} />
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
            <View style={styles.containerLista}>                
                <TouchableOpacity
                    onPress={()=>{navigation.navigate("ListaUsuarios", { idCondominio: idCondominio, idUsuario: idUsuario });                }}>
                    <Text style={ styles.textButton }>Lista usuário</Text>
                </TouchableOpacity> 
                <TouchableOpacity
                    onPress={()=>{navigation.navigate("ListaCondominios", { idCondominio: idCondominio, idUsuario: idUsuario }) }}>
                    <Text style={ styles.textButton }>Lista condomínios</Text>
                </TouchableOpacity> 
                <FlatList
                    data={lista}
                    keyExtractor={item => item.nome}
                    contentContainerStyle={styles.container}
                    renderItem={({ item }) => (
                        <View>
                            {exibeImagem(item)}
                        </View>
                    )} />
            </View>
        );
    }

    //VALIDA SE EXIBE O LOADING DE CARREGAMENTO OU OS DADOS DA TELA
    function Exibir(flag) {
        return flag ? ExibeLoad() : ExibeDados();
    }

    return (
        <View style={{ flex:1 }}>                
            {Exibir(ativaLoad)}                    
        </View>
    );
}

const styles = StyleSheet.create({
    containerLista: {
        flex: 1,
        marginTop: 20
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    textButton:{
        color: '#151A21',
        fontSize: 20,
        margin: 20,
        textDecorationLine: 'underline', 
        textAlign: 'center'
    }
});
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CadastroUsuario from '../usuarios/cadastro-usuario/CadastroUsuario';
import Erro from '../erro/Erro';
import Footer from '../footer/Footer';
import ListaApartamentos from '../lista-apartamentos/ListaApartamentos';
import ListaCondominios from '../lista-condominio/ListaCondominios';
import Login from '../login/Login';
import Splash from '../splash/Splash';
import ListaUsuarios from '../usuarios/lista-usuarios/ListaUsuarios';

const Stack = createNativeStackNavigator();

export default function Navegacao() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Splash"
                    component={ Splash }
                    options={{ title: "Leak Gás", headerLeft: null }}
                    />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ title: "Login", headerLeft: null }}
                    />                
                <Stack.Screen
                    name="ListaCondominios"
                    component={ListaCondominios}
                    options={{ title: "Condominios" }}
                />                                
                <Stack.Screen
                    name="ListaApartamentos"
                    component={ ListaApartamentos }
                    options={{ title: "Apartamentos" }}
                />                                                
                <Stack.Screen
                    name="ListaUsuarios"
                    component={ ListaUsuarios }
                    options={{ title: "Lista de Usuários" }}
                />                
                <Stack.Screen
                    name="CadastroUsuario"
                    component={ CadastroUsuario }
                    options={{ title: "Cadastro de Usuário" }}
                />  
                <Stack.Screen
                    name="Erro"
                    component={Erro}
                    options={{ title: "Erro" }}
                />
                <Stack.Screen
                    name="Footer"
                    component={Footer}
                    options={{ title: "Footer" }}
                />                                
            </Stack.Navigator>
            <StatusBar barStyle="default" />
        </NavigationContainer>
    );
}
import AsyncStorage from "@react-native-async-storage/async-storage";

//SETA NO STRORAGE UMA STRING
export const setStringStorage = (key, value) => {
    try{
        await AsyncStorage.setItem(key, value);
    }catch(e){
        throw new Error(`Erro ao inserir o dado ${key} | Erro: ${e}`);
    }
}

//RECUPERA UMA STRING DO STORAGE
export const getStringStorage = (key) => {
    try{
        return await AsyncStorage.getItem(key);
    }catch(e){
        throw new Error(`Erro ao obter o dado ${key} | Erro: ${e}`);
    }
}

//SETA NO STRORAGE UM OBJETO
export const setObjectStorage = (key, value, callback = null) => {
    try{
        const json = JSON.stringify(value);
        await AsyncStorage.setItem(key, json);
    }catch(e){
        throw new Error(`Erro ao inserir o dado ${key} | Erro: ${e}`);
    }
}

//RECUPERA UM OBJETO DO STORAGE
export const getObjectStorage = (key, callback = null) => {
    try{
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    }catch(e){
        throw new Error(`Erro ao obter o dado ${key} | Erro: ${e}`);
    }
}
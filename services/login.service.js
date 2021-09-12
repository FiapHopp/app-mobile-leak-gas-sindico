import { postConnectionAPI } from "../utils/ConnectionAPI";

function getUrlBaseAPI() {
    return 'https://api-leekgas.azurewebsites.net/api/Autenticacao';    
}

export function logar(usuario) {
    return postConnectionAPI(getUrlBaseAPI(), usuario);
}
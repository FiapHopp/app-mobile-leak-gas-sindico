import { getConnectionAPI } from "../utils/ConnectionAPI";

function getUrlBaseAPI(idUsuario) {
    return "https://api-leekgas.azurewebsites.net/api/Condominio?idUsuario=" + idUsuario;    
}

export function buscarCondominios(idUsuario) {
    return getConnectionAPI(getUrlBaseAPI(idUsuario));
}
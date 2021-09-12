import { getConnectionAPI, postConnectionAPI, patchConnectionAPI, deleteConnectionAPI, putConnectionAPI } from "../utils/ConnectionAPI";

function getUrlBaseAPI() {
    return "https://api-leekgas.azurewebsites.net/api/Usuario";    
}

export function cadastrarUsuario(usuario) {
    return postConnectionAPI(getUrlBaseAPI(), usuario);
}

export function alterarUsuario(usuario){    
    return putConnectionAPI(getUrlBaseAPI(), usuario)
}

export function deletarUsuario(id_usuario){    
    return deleteConnectionAPI(getUrlBaseAPI() + id_usuario, {});
}

export function listarUsuarios(idCondominio){    
    return getConnectionAPI(getUrlBaseAPI() + "?idCondominio=" + idCondominio)
}
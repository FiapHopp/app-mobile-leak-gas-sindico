import { getConnectionAPI, postConnectionAPI } from "../utils/ConnectionAPI";

function getUrlBaseAPI(id_condominio) {
    return "https://api-leekgas.azurewebsites.net/api/Ocorrencia?idCondominio=" + id_condominio;    
}

function getUrlBaseAPIAtualizaOcorrencia(id) {
    return "https://api-leekgas.azurewebsites.net/api/Ocorrencia/vazamento?idApartamento=" + id + "&status=false";    
}

export function atualizarOcorrenciaApartamento(id){
    console.log("ENTROU ATUALIZA OCORRENCIA")
    return postConnectionAPI(getUrlBaseAPIAtualizaOcorrencia(id),{});   
}

export function buscarApartamentos(id_condominio) {
    console.log("ENTROU BUSCAR AP")
    return getConnectionAPI(getUrlBaseAPI(id_condominio));
}
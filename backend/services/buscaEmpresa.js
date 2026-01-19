import axios from "axios";

export async function buscaEmpresa(cnpj) {

    const url = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`;
    
    const response = await axios.get(url);

    return response.data;
    
}
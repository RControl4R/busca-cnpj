function formataData(dataISO){
    if(!dataISO) return "";
    return new Date(dataISO).toLocaleDateString("pt-BR");
}

function formataMoeda(valor){
    if(valor == null) return "";
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function formatarTelefone(telefone){
    if(!telefone == null) return "";
    if(telefone.lenght === 10){
        return telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    if(telefone.lenght == 11){
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    }
    return telefone; 
}

function formatarCnpj(cnpj){
    if(!cnpj) return "";
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        "$1.$2.$3/$4-$5") ;
}

async function buscaEmpresa(){
    const cnpj = document.getElementById("cnpj").value;
    const container = document.getElementById("resultado");

    container.style.display = "initial";

    try{

        document.getElementById("resultado").style.display = "block";

        const response = await fetch(
            `http://localhost:3000/empresa/${cnpj}`
        );

        console.log("Status HTTP:", response.status); //log de depuração

        const data = await response.json();

        console.log("Dados recebidos:", data); //log de depuração


        document.getElementById("cnpjEmpresa").textContent = data.cnpjEmpresa;
        document.getElementById("razaoSocial").textContent = data.razaoSocial;
        document.getElementById("dataAbertura").textContent = data.dataAbertura;
        document.getElementById("naturezaJuridica").textContent = data.naturezaJuridica;
        document.getElementById("capitalSocial").textContent = data.capitalSocial;
        document.getElementById("telefone").textContent = data.telefone;
        document.getElementById("logradouro").textContent = data.logradouro;
        document.getElementById("bairro").textContent = data.bairro;
        document.getElementById("numero").textContent = data.numero;
        document.getElementById("cep").textContent = data.cep;
        document.getElementById("municipio").textContent = data.municipio;
        document.getElementById("cnae_principal").textContent = data.cnaePrincipal;
        document.getElementById("cnae_secundario").textContent = data.cnaeSecundario;

        container.style.display = "block";

    }catch(error) {
        console.log("Erro no FrontEnd:\n", error);
        container.textContent = "Erro ao buscar empresa!";
        container.style.display = "block";
    }
}
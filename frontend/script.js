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
    if(!telefone) return "";
    if(telefone.length === 10){
        return telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    if(telefone.length == 11){
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    }
    return telefone; 
}

function formatarCnpj(cnpj){
    if(!cnpj) return "";
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        "$1.$2.$3/$4-$5") ;
}

function limparCnpj(cnpj){
    if (!cnpj) return "";
    return cnpj.replace(/\D/g, "");
}

function validarCnpj(cnpj){
    cnpj = limparCnpj(cnpj);

    if(!cnpj || cnpj.length != 14) return false;

    // Elimina cnpjs inválidos
    if(/^(\d)\1{13}$/.test(cnpj)) return false;

    //validação do primeiro dígito
    let tamanho = 12;
    let numero = cnpj.substring(0, tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numero.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(cnpj.charAt(12))) return false;

    // Validação do segundo dígito
    tamanho = 13;
    numero = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numero.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    return resultado === parseInt(cnpj.charAt(13));
}

async function buscaEmpresa(){
    const cnpjInput = document.getElementById("cnpj");
    const container = document.getElementById("resultado");

    const cnpjLimpo = limparCnpj(cnpjInput.value);

    if(!validarCnpj(cnpjLimpo)){
        alert("Cnpj inválido. Verifique e tente novamente.");
        cnpjInput.focus();
        return;
    }

    container.style.display = "none";

    try{

        const response = await fetch(
            `http://localhost:3000/empresa/${cnpjLimpo}`
        );

        console.log("Status HTTP:", response.status); //log de depuração

        const data = await response.json();


        document.getElementById("cnpjEmpresa").textContent = formatarCnpj(data.cnpjEmpresa);
        document.getElementById("razaoSocial").textContent = data.razaoSocial;
        document.getElementById("dataAbertura").textContent = formataData(data.dataAbertura);
        document.getElementById("naturezaJuridica").textContent = data.naturezaJuridica;
        document.getElementById("capitalSocial").textContent = formataMoeda(data.capitalSocial);
        document.getElementById("telefone").textContent = formatarTelefone(data.telefone);
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
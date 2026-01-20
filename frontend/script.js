async function buscaEmpresa() {
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


        document.getElementById("cnpjEmpresa").textContent = data.cnpj_empresa;
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
        console.log("Erro no FrontEnd:\n");
        resultado.textContent = "Erro ao buscar empresa!"
    }
}
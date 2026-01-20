async function buscaEmpresa() {
    const cnpj = document.getElementById("cnpj").value;
    const resultado = document.getElementById("resultado");

    CSSContainerRule.style.display = "none";
    
    resultado.textContent = "Buscando...";

    try{
        const response = await fetch(
            `http://localhost:3000/empresa/${cnpj}`
        );

        const data = await response.json();
        
        document.getElementById("razaoSocial").textContent = data.razaoSocial;
        document.getElementById("dataAbertura").textContent = data.dataAbertura;
        document.getElementById("naturezaJuridica").textContent = data.naturezaJuridica;
        document.getElementById("capitalSocial").textContent = data.capitalSocial;
        document.getElementById("telefone").textContent = data.telefone;
        document.getElementById("logradouro").textContent = data.logradouro;
        document.getElementById("bairro").textContent = data.bairro;

        CSSContainerRule.style.display = "block";

    }catch(error) {
        resultado.textContent = "Erro ao buscar empresa!"
    }
}
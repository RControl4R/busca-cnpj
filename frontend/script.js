async function buscaEmpresa() {
    const cnpj = document.getElementById("cnpj").value;
    const resultado = document.getElementById("resultado");
    
    resultado.textContent = "Buscando...";

    try{
        const response = await fetch(
            `http://localhost:3000/empresa/${cnpj}`
        );

        const data = await response.json();
        resultado.textContent = JSON.stringify(data, null, 2);

    }catch(error) {
        resultado.textContent = "Erro ao buscar empresa!"
    }
}
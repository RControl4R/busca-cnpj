import express from "express";
import cors from "cors";
import { buscaEmpresa } from "./backend/services/buscaEmpresa.js";

const app = express();
const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== "production";

app.use(cors());
app.use(express.static("public"));

app.get("/empresa/:cnpj", async (req, res) => {
    try{
        const { cnpj } = req.params;
        const dados = await buscaEmpresa(cnpj);
        
        const empresa = {
            cnpjEmpresa: dados.cnpj,
            razaoSocial: dados.razao_social,
            dataAbertura: dados.data_inicio_atividade,
            naturezaJuridica: dados.natureza_juridica,
            capitalSocial: dados.capital_social,
            telefone: dados.ddd_telefone_1,
            logradouro: dados.logradouro,
            bairro: dados.bairro,
            numero: dados.numero,
            cep: dados.cep,
            municipio: dados.municipio,
            cnaePrincipal: dados.cnae_fiscal,
            cnaeSecundario: dados.cnaes_secundarios[0].codigo
        }

        res.json(empresa);
        
    }catch(error){
        res.status(400).json({
            erro: "Erro ao buscar CNPJ",
            detalhe: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(
        isDev
        ? `Servidor LOCAL rodando em http://localhost:${PORT}`
        : `Servidor PRODUÇÃO rodando na porta ${PORT}`
    );
});
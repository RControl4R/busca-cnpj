import express from "express";
import cors from "cors";
import { buscaEmpresa } from "./services/buscaEmpresa.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/empresa/:cnpj", async (req, res) => {
    try{
        const { cnpj } = req.params;
        const dados = await buscaEmpresa(cnpj);
        res.json(dados);
    }catch(error){
        res.status(400).json({
            erro: "Erro ao buscar CNPJ",
            detalhe: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Listen in port ${PORT}`);
});
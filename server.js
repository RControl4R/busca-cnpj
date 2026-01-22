import "dotenv/config";
import express from "express";
import cors from "cors";
import { buscaEmpresa } from "./backend/services/buscaEmpresa.js";

import session from "express-session";

const app = express();
app.set("trust proxy", 1);
const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== "production";
const usuarios = [
    { user: "admin", senha: "12345" }
    //{ user: "iury.prates", senha: "Rcontrol@123" }  
];

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly: true,
        secure: !isDev && process.env.FORCE_SECURE === "true",
        sameSite: "lax",
        maxAge: 30 * 60 * 1000
    }
}));

/* ======================
   CONTROLE DE INATIVIDADE TOTAL
====================== */
app.use((req, res, next) => {
    if (!req.session) return next();

    const agora = Date.now();
    const ultimoAcesso = req.session.ultimoAcesso || agora;

    if (agora - ultimoAcesso > 25 * 1000) {
        req.session.destroy(() => {
            // IMPORTANTE: não redirecionar aqui
            return res.status(401).json({ erro: "Sessão expirada" });
        });
        return;
    }

    req.session.ultimoAcesso = agora;
    next();
});

/* ======================
   ROTAS PÚBLICAS
====================== */

app.post("/login", express.json(), (req, res) => {
    const { user, senha } = req.body;

    const valido = usuarios.find(
        u => u.user === user && u.senha === senha
    );

    if(!valido){
        return res.status(401).json({erro: "Usuário ou senha inválido."});
    };

    req.session.usuario = user;
    res.json({ sucesso: true});
});

app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login.html");
    });
});

// MIDDLEWARE
function auth(req, res, next) {
    const rotasPublicas = [
        "/login",
        "/login.html"
    ];

    if (
        rotasPublicas.includes(req.path) ||
        req.path.startsWith("/login.") ||
        req.path.startsWith("/css") ||
        req.path.startsWith("/js") ||
        req.path.match(/\.(css|js|png|jpg|jpeg|svg|ico)$/)
    ) {
        return next();
    }

    if (!req.session.usuario) {

        if(req.headers.accept?.includes("application/json")){
            return res.status(401).json({ 
                erro: "Sessão expirada"
            });
        }

        return res.redirect("/login.html");
    }

    next();
}

app.use(auth);

/* ======================
   ROTAS PROTEGIDAS
====================== */

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

/* ======================
   FRONTEND
====================== */
app.use(express.static("public"));


/* ======================
   START SERVER
====================== */
app.listen(PORT, () => {
    console.log(
        isDev
        ? `Servidor LOCAL rodando em http://localhost:${PORT}`
        : `Servidor PRODUÇÃO rodando na porta ${PORT}`
    );
});
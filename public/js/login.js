const btn = document.getElementById("loginBtn");
const msg = document.getElementById("mensagem");

btn.addEventListener("click", login);
document.addEventListener("keydown", e => {
    if (e.key === "Enter") login();
});

async function login() {
    const user = document.getElementById("user").value.trim();
    const senha = document.getElementById("senha").value.trim();

    msg.textContent = "";
    msg.className = "msg";

    if (!user || !senha) {
        msg.textContent = "Preencha usuário e senha.";
        msg.classList.add("erro");
        return;
    }

    btn.disabled = true;
    btn.textContent = "Entrando...";

    try {
        const res = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user, senha }),
            credentials: "include"
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.erro);
        }

        window.location.href = "/index.html";

    } catch (err) {
        msg.textContent = err.message;
        msg.classList.add("erro");
        btn.disabled = false;
        btn.textContent = "Entrar";
    }
}
const { Client, LocalAuth } = require("whatsapp-web.js");
const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on("qr", (qr) => {
    console.log("Escaneie este QR Code para conectar:", qr);
});

client.on("ready", () => {
    console.log("Bot conectado ao WhatsApp!");
});

client.on("message", async (message) => {
    console.log(`📩 Mensagem recebida de ${message.from}: ${message.body}`);

    try {
        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText",
            {
                prompt: {
                    text: `
                        Responda essa mensagem com no máximo 5 linhas e fale como o dono da Old Barbearia – O Melhor Corte, No Seu Melhor Horário! 💈✂️

                        Fala, rapaziada! Aqui na Old Barbearia, o corte não é só um corte, é uma experiência! Se você quer dar aquele tapa no visual, sair com a barba alinhada e o estilo renovado, chegou no lugar certo.

                        Pergunta do cliente: ${message.body}
                    `
                }
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.GEMINI_API_KEY}`
                }
            }
        );

        const botReply = response.data.candidates[0].output;
        client.sendMessage(message.from, botReply);
    } catch (error) {
        console.error("❌ Erro ao processar a mensagem:", error.message);
        client.sendMessage(message.from, "Rapaziada, deu um bug aqui! Mas já estamos resolvendo. 💈🔥");
    }
});

client.initialize();

// Endpoint para verificar se o bot está rodando
app.get("/", (req, res) => {
    res.send("Bot do WhatsApp está rodando!");
});

// Exporta o app para a Vercel
module.exports = app;

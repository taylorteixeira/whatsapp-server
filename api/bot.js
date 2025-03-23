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
            "https://api.langflow.astra.datastax.com/lf/9bb14e0c-5847-41f2-8bfa-602c1f56ac04/api/v1/run/2b719248-4a16-4464-8bfa-602c1f56ac04?stream=false",
            {
                input_value: message.body,
                output_type: "chat",
                input_type: "chat",
                tweaks: {}
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.LANGFLOW_API_KEY}`
                }
            }
        );

        const botReply = response.data.outputs[0].outputs[0].results.message.text;
        client.sendMessage(message.from, botReply);
    } catch (error) {
        console.error("❌ Erro ao processar a mensagem:", error.message);
        client.sendMessage(message.from, "Desculpe, houve um erro ao processar sua mensagem.");
    }
});

client.initialize();

// Endpoint para verificar se o bot está rodando
app.get("/", (req, res) => {
    res.send("Bot do WhatsApp está rodando!");
});

// Exporta o app para a Vercel
module.exports = app;

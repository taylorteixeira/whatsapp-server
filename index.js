const { Client, LocalAuth } = require("whatsapp-web.js");
const express = require("express");
const axios = require("axios");
const qrcode = require("qrcode"); // Importa a lib para gerar QR Code

const app = express();
app.use(express.json());

const client = new Client({
    authStrategy: new LocalAuth()
});

let qrCodeData = ""; // Armazena o QR Code gerado

// Gera o QR Code e armazena para exibição no navegador
client.on("qr", (qr) => {
    console.log("QR Code gerado! Escaneie para conectar.");
    qrCodeData = qr;
});

// Confirmação de conexão bem-sucedida
client.on("ready", () => {
    console.log("✅ Bot conectado ao WhatsApp!");
});

// Rota para exibir o QR Code no navegador
app.get("/qr", async (req, res) => {
    if (!qrCodeData) {
        return res.send("QR Code não disponível. Aguarde ou tente novamente.");
    }

    try {
        const qrImage = await qrcode.toDataURL(qrCodeData); // Converte para imagem
        res.send(`
            <html>
                <body style="text-align: center;">
                    <h2>Escaneie o QR Code para conectar ao WhatsApp</h2>
                    <img src="${qrImage}" alt="QR Code">
                </body>
            </html>
        `);
    } catch (err) {
        res.status(500).send("Erro ao gerar QR Code.");
    }
});

// Processamento de mensagens recebidas
client.on("message", async (message) => {
    console.log(`📩 Mensagem recebida de ${message.from}: ${message.body}`);

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB1jMMF_FMRJiWZKIb1CtuSqvI3gZMysRg`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `Fala, rapaziada! Aqui na Old Barbearia, o corte não é só um corte, é uma experiência! 
                                    Pergunta do cliente: ${message.body}`
                            }
                        ]
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json"
                },
                timeout: 10000 // Define um timeout de 10 segundos
            }
        );

        const botReply = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || 
            "Rapaziada, deu um bug aqui! Mas já estamos resolvendo. 💈🔥";
        
        await client.sendMessage(message.from, botReply);
    } catch (error) {
        console.error("❌ Erro ao processar a mensagem:", error.response?.data || error.message);
        await client.sendMessage(message.from, "Rapaziada, deu um bug aqui! Mas já estamos resolvendo. 💈🔥");
    }
});

// Rota para verificar se o bot está rodando
app.get("/", (req, res) => {
    res.send("Bot do WhatsApp está rodando! Acesse /qr para escanear o código.");
});

// Define a porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});

// Inicializa o bot somente fora do ambiente da Vercel
if (process.env.NODE_ENV !== "production") {
    client.initialize();
}

// Exporta o app para Vercel
module.exports = app;

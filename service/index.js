const { Client, LocalAuth } = require("whatsapp-web.js");
const express = require("express");
const axios = require("axios");
const qrcode = require("qrcode");

const app = express();
app.use(express.json());

const client = new Client({
    authStrategy: new LocalAuth()
});

let qrCodeData = "";
const messageHistory = new Map(); // Armazena histórico de mensagens

client.on("qr", (qr) => {
    console.log("QR Code gerado! Escaneie para conectar.");
    qrCodeData = qr;
});

client.on("ready", () => {
    console.log("✅ Bot conectado ao WhatsApp!");
});

app.get("/qr", async (req, res) => {
    if (!qrCodeData) {
        return res.send("QR Code não disponível. Aguarde ou tente novamente.");
    }

    try {
        const qrImage = await qrcode.toDataURL(qrCodeData);
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

client.on("message", async (message) => {
    console.log(`📩 Mensagem recebida de ${message.from}: ${message.body}`);
    
    if (!messageHistory.has(message.from)) {
        messageHistory.set(message.from, []);
    }
    
    const history = messageHistory.get(message.from);
    history.push(message.body);
    if (history.length > 5) {
        history.shift(); // Mantém apenas as últimas 3 mensagens
    }

    const contextMessages = history.join("\n");

    try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB1jMMF_FMRJiWZKIb1CtuSqvI3gZMysRg`,
          {
            contents: [
              {
                parts: [
                  {
                    text: `Fala, rapaziada!

                                Primeiro Agente(
                                Automatize seu Atendimento com Agentes de IA
                                IA Avançada Respostas inteligentes e personalizadas para cada cliente, aprendendo com cada interação.
                                Atendimento 24/7 seus clientes recebem atendimento instantâneo a qualquer hora do dia ou da noite.
                                Relatórios Detalhados acompanhe métricas e desempenho do atendimento para otimizar sua estratégia.)


                                Segundo Agente(
                                Informações sobre Old Barbearia:📅 Horários de Atendimento:  Segunda a Sexta: 09h – 20h Sábado: 08h – 18h Domingo: Fechado (dia de descanso do guerreiro! 😎) 💰 Nossos Preços:  Corte Tradicional: R$ 45 Corte , Barba: R$ 25  Barba Completa: R$ 30 Degradê Premium: R$ 50 Sobrancelha na Navalha: R$ 15 📲 Agendamentos: Nada de ficar esperando na fila! Agende seu horário pelo WhatsApp ou diretamente no nosso Instagram. Atendimento rápido, sem estresse e do jeito que você merece.📍 Onde Estamos: Rua Exemplo, 123 – Seu Bairro, Sua Cidade  Bora marcar aquele corte e sair daquele jeito?)

                                
                                Contexto das últimas mensagens para saber qual agente vai atender e responder como o dono do sistema para vender:\n${contextMessages}\n\nPergunta do cliente: ${message.body}
                                
                                Responda com no maximo 5 linhas`,
                  },
                ],
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 10000,
          }
        )

        const botReply = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || 
            "Rapaziada, deu um bug aqui! Mas já estamos resolvendo. 💈🔥";
        
        await client.sendMessage(message.from, botReply);
    } catch (error) {
        console.error("❌ Erro ao processar a mensagem:", error.response?.data || error.message);
        await client.sendMessage(message.from, "Rapaziada, deu um bug aqui! Mas já estamos resolvendo. 💈🔥");
    }
});

app.get("/", (req, res) => {
    res.send("Bot do WhatsApp está rodando! Acesse /qr para escanear o código.");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});

if (process.env.NODE_ENV !== "production") {
    client.initialize();
}

module.exports = app;

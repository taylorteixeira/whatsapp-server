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
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB1jMMF_FMRJiWZKIb1CtuSqvI3gZMysRg`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `
                                    Responda essa mensagem com no máximo 5 linhas e fale como o dono da Old Barbearia – O Melhor Corte, No Seu Melhor Horário! 💈✂️

                                    Fala, rapaziada! Aqui na Old Barbearia, o corte não é só um corte, é uma experiência! Se você quer dar aquele tapa no visual, sair com a barba alinhada e o estilo renovado, chegou no lugar certo.📅 Horários de Atendimento:  Segunda a Sexta: 09h – 20h Sábado: 08h – 18h Domingo: Fechado (dia de descanso do guerreiro! 😎) 💰 Nossos Preços:  Corte Tradicional: R$ 45 Corte , Barba: R$ 25  Barba Completa: R$ 30 Degradê Premium: R$ 50 Sobrancelha na Navalha: R$ 15 📲 Agendamentos: Nada de ficar esperando na fila! Agende seu horário pelo WhatsApp ou diretamente no nosso Instagram. Atendimento rápido, sem estresse e do jeito que você merece. Faça parte do nosso clube para ganhar desconto 🔥 Por que cortar aqui? ✅ Profissionais experientes ✅ Ambiente confortável e estiloso ✅ Atendimento pontual e de qualidade ✅ Produtos premium para cuidar do seu cabelo e barba  📍 Onde Estamos: Rua Exemplo, 123 – Seu Bairro, Sua Cidade  Bora marcar aquele corte e sair daquele jeito?

                                    Pergunta do cliente: ${message.body}
                                `
                            }
                        ]
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json"
                },
                timeout: 10000 // 10 segundos de timeout
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

// Endpoint para verificar se o bot está rodando
app.get("/", (req, res) => {
    res.send("Bot do WhatsApp está rodando!");
});

// Inicializa o bot apenas fora do ambiente da Vercel
if (process.env.NODE_ENV !== "production") {
    client.initialize();
}

// Exporta o app para a Vercel
module.exports = app;

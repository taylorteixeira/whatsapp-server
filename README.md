# WhatsApp Server Bot

Este projeto implementa um servidor integrado com WhatsApp Web que utiliza IA para automatizar atendimentos.

## Sobre o Projeto

O WhatsApp Server Bot permite automatizar atendimentos através do WhatsApp, utilizando dois tipos de agentes de IA que podem:
- Responder a perguntas sobre serviços (Barbearia)
- Fornecer informações sobre automação de atendimento
- Manter contexto das conversas (histórico de mensagens)

## Requisitos

- Node.js (versão 14 ou superior)
- NPM ou Yarn
- Conta ativa no WhatsApp

## Instalação

1. Clone este repositório:
```
git clone https://github.com/seu-usuario/whatsapp-server.git
cd whatsapp-server
```

2. Instale as dependências:
```
npm install
```

## Como iniciar o servidor

1. Navegue até a pasta service:
```
cd service
```

2. Inicie o servidor:
```
node index.js
```

3. Ao iniciar, o terminal mostrará uma mensagem quando o QR Code estiver disponível.

4. Acesse `http://localhost:4000/qr` no navegador para escanear o QR Code e conectar seu WhatsApp.

5. Após conectar, o terminal mostrará "✅ Bot conectado ao WhatsApp!"

## Funcionalidades

- Geração de QR Code para autenticação no WhatsApp Web
- Processamento automático de mensagens recebidas
- Respostas inteligentes baseadas em contexto usando Gemini AI
- Histórico de conversas para manter contexto
- Interface web simples para acesso ao QR Code

## Uso

Uma vez que o servidor esteja rodando e o WhatsApp conectado, o bot responderá automaticamente às mensagens recebidas, analisando o histórico da conversa para manter o contexto e fornecer respostas personalizadas.

## Observações

- O servidor roda na porta 4000 por padrão (pode ser modificado pela variável de ambiente PORT)
- A autenticação do WhatsApp é mantida localmente para reconexões futuras

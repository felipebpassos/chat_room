# 💬 Chat Room

![Chat Room](https://via.placeholder.com/600x200?text=Chat+Room)

![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-brightgreen)

[Teste aqui](https://simple-websockets-chat-app-a1z6.onrender.com)

## Descrição

**Chat Room** é uma aplicação web simples de chat em tempo real que permite que usuários se conectem a salas e troquem mensagens de forma interativa e segura. O aplicativo utiliza WebSockets (sockets.io) em servidor node express para comunicação instantânea, incluindo medidas de segurança para prevenir ataques de XSS (Cross-Site Scripting).
**Chat Room** é uma aplicação web simples de chat em tempo real que permite que usuários se conectem a salas e troquem mensagens de forma interativa e segura. O aplicativo utiliza WebSockets (sockets.io) em servidor node express para comunicação instantânea, incluindo medidas de segurança para prevenir ataques de XSS (Cross-Site Scripting).

## Funcionalidades

- **Criação de Salas**: Usuários podem criar e entrar em salas de chat.
- **Mensagens em Tempo Real**: Troca instantânea de mensagens entre usuários conectados.
- **Lista de Usuários Online**: Visualização de usuários ativos em cada sala.
- **Segurança**: Mensagens são sanitizadas para proteger contra códigos maliciosos.

## Tecnologias Utilizadas

- **Backend**: Node.js, Express
- **WebSockets**: Socket.io
- **Segurança**: xss (para proteção contra XSS)
- **Frontend**: HTML, CSS (com Tailwind CSS) e JavaScript

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)

## Instalação

Siga os passos abaixo para configurar o ambiente e executar o projeto:

1. **Abra o terminal e vá para um diretório a sua escolha**

2. **Clone o repositório:**
   - `git clone https://github.com/felipebpassos/simple-websockets-chat-app.git`
   - `cd simple-websockets-chat-app`

3. **Instale as dependências:**
   - `npm install`

3. **Inicie o servidor:**
   - `node server.js`

4. **Acesse o aplicativo:**
   - Abra seu navegador e vá para `http://localhost:3000`.

## Uso

1. Digite o nome da sala que deseja entrar ou criar e abaixo seu nickname.
1. Digite o nome da sala que deseja entrar ou criar e abaixo seu nickname.
2. Clique no botão "Entrar na Sala".
3. Envie mensagens e veja as mensagens de outros usuários em tempo real.

## Contato

Criado por [Felipe Barreto Passos](https://github.com/felipebpassos). Se você tiver dúvidas, sinta-se à vontade para entrar em contato.

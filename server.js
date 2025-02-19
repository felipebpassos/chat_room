// server.js
// Este arquivo contém a configuração do servidor para um chat com salas usando WebSockets.
// Ele permite que os usuários se conectem, enviem mensagens e se desconectem, mantendo a segurança das mensagens.

const express = require('express');
const http = require('http');
const socketIo = require('socket.io'); // Biblioteca responsável por criar conexão Web Sockets
const xss = require('xss'); // Importa o pacote xss, importante para neutralizar mensagens contendo códigos maliciosos

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir arquivos estáticos da pasta "public"
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Redireciona usuários para home
});

// Armazena salas e os usuários conectados a cada sala
const rooms = {}; // Objeto para armazenar as salas

// Função de sanitização para nicknames e nomes de salas
const sanitizeInput = (input) => xss(input); // Usa xss para remover scripts maliciosos

io.on('connection', (socket) => {
    console.log('Usuário conectado');

    // Entrar em uma sala
    socket.on('join room', (room, nickname) => {
        const sanitizedRoom = sanitizeInput(room); // Sanitiza o nome da sala
        const sanitizedNickname = sanitizeInput(nickname); // Sanitiza o nickname
        socket.join(sanitizedRoom);
        socket.nickname = sanitizedNickname; // Armazena o nickname sanitizado no socket

        if (!rooms[sanitizedRoom]) {
            rooms[sanitizedRoom] = []; // Cria a sala se não existir
        }
        rooms[sanitizedRoom].push(sanitizedNickname); // Adiciona o nickname sanitizado à sala

        io.to(sanitizedRoom).emit('chat message', `${sanitizedNickname} entrou na sala ${sanitizedRoom}`, new Date().toISOString());
        io.to(sanitizedRoom).emit('update users', rooms[sanitizedRoom]); // Envia a lista atualizada de usuários para a sala
        console.log(`Usuário ${sanitizedNickname} entrou na sala ${sanitizedRoom}`);
    });

    // Recebe mensagem do cliente e transmite para a sala correspondente
    socket.on('chat message', (room, msg) => {
        const sanitizedRoom = sanitizeInput(room); // Sanitiza o nome da sala
        const sanitizedMessage = xss(msg); // Limpa a mensagem de scripts maliciosos
        const timestamp = new Date().toISOString(); // Gera timestamp no backend
        io.to(sanitizedRoom).emit('chat message', `${socket.nickname}: ${sanitizedMessage}`, timestamp); // Envia a mensagem sanitizada com timestamp
    });

    // Desconectar
    socket.on('disconnect', () => {
        for (const room in rooms) {
            const index = rooms[room].indexOf(socket.nickname);
            if (index !== -1) {
                rooms[room].splice(index, 1);
                io.to(room).emit('chat message', `${socket.nickname} saiu da sala ${room}`, new Date().toISOString());
                io.to(room).emit('update users', rooms[room]); // Envia a lista atualizada de usuários para a sala
                console.log(`Usuário ${socket.nickname} desconectado da sala ${room}`);
            }
        }
    });
});

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});


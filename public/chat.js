const socket = io(); // Conecta ao servidor via WebSocket
const joinButton = document.getElementById('join-button');
const sendButton = document.getElementById('send-button');
const roomInput = document.getElementById('room-input');
const nicknameInput = document.getElementById('nickname-input');
const messageInput = document.getElementById('message-input');
const messagesDiv = document.getElementById('messages');
const chatSection = document.getElementById('chat-section');
const roomSection = document.getElementById('room-section');
const userList = document.getElementById('user-list');

let currentRoom = ''; // Armazena a sala atual em que o usuário está

// Função para formatar a data e hora
function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// Evento de clique no botão "join", que faz o usuário entrar em uma sala de chat
joinButton.addEventListener('click', () => {
    const room = roomInput.value.trim(); // Obtém o nome da sala
    const nickname = nicknameInput.value.trim(); // Obtém o nickname do usuário

    if (room && nickname) {
        socket.emit('join room', room, nickname); // Envia solicitação para entrar na sala
        currentRoom = room; // Armazena a sala atual
        roomSection.classList.add('hidden'); // Esconde a interface de seleção de sala
        chatSection.classList.remove('hidden'); // Exibe a interface de chat

        // Atualiza o título da sala de chat
        document.getElementById('room-title').textContent = `Sala: ${room}`;
        document.getElementById('header').classList.remove('hidden'); // Exibe o cabeçalho
    }
});

// Evento de clique no botão "send" para enviar uma mensagem
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim(); // Obtém o conteúdo da mensagem
    if (message && currentRoom) {
        socket.emit('chat message', currentRoom, message); // Envia a mensagem para a sala atual
        messageInput.value = ''; // Limpa o campo de entrada da mensagem
    }
});

// Recebe mensagens do servidor e as exibe no chat
socket.on('chat message', (msg, timestamp) => {
    const formattedTime = formatDateTime(timestamp); // Formata o timestamp da mensagem
    const newMessage = document.createElement('div'); // Cria um novo elemento para a mensagem
    newMessage.classList.add('mb-2', 'p-2', 'rounded', 'bg-blue-100', 'dark:bg-blue-700', 'text-sm');
    newMessage.innerHTML = `<span class="font-bold">${formattedTime}</span> - ${msg}`; // Define o conteúdo da mensagem
    messagesDiv.appendChild(newMessage); // Adiciona a mensagem à lista de mensagens
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Rolagem automática para a última mensagem
});

// Atualiza a lista de usuários conectados na sala
socket.on('update users', (users) => {
    userList.innerHTML = ''; // Limpa a lista de usuários antes de atualizar
    users.forEach(user => {
        const listItem = document.createElement('li'); // Cria um item da lista para cada usuário
        listItem.textContent = user; // Define o nome do usuário no item
        listItem.classList.add('user-list-item'); // Aplica a classe CSS ao item
        userList.appendChild(listItem); // Adiciona o item à lista de usuários
    });
});

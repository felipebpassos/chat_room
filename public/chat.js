const socket = io();
const joinButton = document.getElementById('join-button');
const sendButton = document.getElementById('send-button');
const roomInput = document.getElementById('room-input');
const nicknameInput = document.getElementById('nickname-input');
const messageInput = document.getElementById('message-input');
const messagesDiv = document.getElementById('messages');
const chatSection = document.getElementById('chat-section');
const roomSection = document.getElementById('room-section');
const userList = document.getElementById('user-list');

let currentRoom = '';

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

joinButton.addEventListener('click', () => {
    const room = roomInput.value.trim();
    const nickname = nicknameInput.value.trim();

    if (room && nickname) {
        socket.emit('join room', room, nickname);
        currentRoom = room;
        roomSection.classList.add('hidden');
        chatSection.classList.remove('hidden');

        // Atualiza o título da sala
        document.getElementById('room-title').textContent = `Sala: ${room}`;
        document.getElementById('header').classList.remove('hidden'); // Mostra o cabeçalho
    }
});

sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message && currentRoom) {
        socket.emit('chat message', currentRoom, message);
        messageInput.value = '';
    }
});

socket.on('chat message', (msg, timestamp) => {
    const formattedTime = formatDateTime(timestamp);
    const newMessage = document.createElement('div');
    newMessage.classList.add('mb-2', 'p-2', 'rounded', 'bg-blue-100', 'dark:bg-blue-700', 'text-sm');
    newMessage.innerHTML = `<span class="font-bold">${formattedTime}</span> - ${msg}`;
    messagesDiv.appendChild(newMessage);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Rolagem automática para a última mensagem
});

socket.on('update users', (users) => {
    userList.innerHTML = ''; // Limpa a lista de usuários antes de atualizar
    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = user;
        listItem.classList.add('user-list-item'); // Adiciona a classe aqui
        userList.appendChild(listItem);
    });
});


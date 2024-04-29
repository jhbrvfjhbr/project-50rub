const startButton = document.getElementById('startButton');
const indicator = document.getElementById('indicator');
const addCommentButton = document.getElementById('addCommentButton');
const commentInputsContainer = document.getElementById('commentInputs');
const botContainer = document.getElementById('bot-container')
const addBotButton = document.getElementById('addBotButton');
const sessionFolderInput = document.getElementById('sessionFolderInput');
const timeLock = document.getElementById('timelock')
const CommContainer = document.getElementById('comments-container_id')
const linksContainer = document.getElementById('links-container_id')
const addLinkButton = document.getElementById('addLinkButton')

function getToggleValue() {
    const toggle = document.getElementById('toggle');
    return toggle.checked ? true : false;
}

function getCookie(name) {
  	let cookies = document.cookie.split(';');
  	for (let i = 0; i < cookies.length; i++) {
    	let cookie = cookies[i].trim();
    	let cookieParts = cookie.split('=');
    	if (cookieParts[0] === name) {
      		return cookieParts[1];
    	}
  	}
  	return null;
}

function displayBots(bots) {
    bots.forEach((bot, index)  => {
        const botDiv = document.createElement('div');
        botDiv.classList.add('bot-info');

        // Статус-индекс контейнер
        const statusIndex = document.createElement('div');
        statusIndex.classList.add('bot-status-index-container');

        const indexBota = document.createElement('p');
        indexBota.textContent = `${index+1}.`;
        const indexBotaContainer = document.createElement('div');
        indexBotaContainer.classList.add('object1');
        indexBotaContainer.appendChild(indexBota);
        
        statusIndex.appendChild(indexBotaContainer);

        const statusIndicator = document.createElement('p');
        statusIndicator.textContent = '⦿';
        statusIndicator.style.color = bot.Status ? 'green' : 'red';
        const statusIndicatorContainer = document.createElement('div');
        statusIndicatorContainer.classList.add('object2');
        statusIndicatorContainer.appendChild(statusIndicator);

        statusIndex.appendChild(statusIndicatorContainer);

        botDiv.appendChild(statusIndex);

        // Имя бота
        const botNameContainer = document.createElement('div');
        botNameContainer.classList.add('object3');
        const botName = document.createElement('p');
        botName.textContent = `${bot.Name}`;
        botNameContainer.appendChild(botName);
        botDiv.appendChild(botNameContainer);

        // Кнопки
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('bot-buttons-container');

        const editButton = document.createElement('button');
        editButton.textContent = 'Изменить';
        editButton.addEventListener('click', () => {
            const newName = prompt("Введите новое имя для бота:", bot.Name);
            bot.Name = newName.trim();
            botName.textContent = `${bot.Name}`;
            BotEdit(bot.Id, bot.Name, getCookie("token"));
        });
        buttonsContainer.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => {
            BotDELETE(bot.Id, getCookie("token"));
        });
        buttonsContainer.appendChild(deleteButton);

        botDiv.appendChild(buttonsContainer);

        // Добавляем бот-контейнер в основной контейнер
        botContainer.appendChild(botDiv);
    });
}

function GetBots() {
  let token = getCookie('token')
  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/bots', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    if (xhr.status === 200) {
      let botss = JSON.parse(xhr.responseText);

      displayBots(botss)
    }
    else if (xhr.status === 400) {
        console.error('Ошибка: ' + xhr.responseText, null); // Вызовите обратный вызов с сообщением об ошибке
    } else {
        console.error('Ошибка при проверке токена: ' + xhr.status, null); // Вызовите обратный вызов с сообщением об ошибке
    };
  };
  let data = JSON.stringify({
    "token": token
  });
  xhr.send(data);
};

function updateCommentIds() {
    const commentContainers = document.querySelectorAll('.comment-container');
    commentContainers.forEach((container, index) => {
        const commentId = container.querySelector('p');
        commentId.textContent = index + 1;
    });
}

function addCommentInput() {
    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment-container');

    const commentId = document.createElement('p');
    commentId.textContent = document.querySelectorAll('.comment-container').length + 1;

    const commentInput = document.createElement('textarea');
    commentInput.classList.add('comment-input');
    commentInput.rows = 1;
    commentInput.placeholder = 'Введите комментарий';
    commentInput.id = "commentInput";

    commentInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.padding = '5px';
        this.style.height = this.scrollHeight + 'px';
      });
    
    const deleteInputButton = document.createElement('button');
    deleteInputButton.textContent = 'Удалить';

    deleteInputButton.addEventListener('click', () => {
        commentContainer.remove();
        updateCommentIds();
    });

    commentContainer.appendChild(commentId);
    commentContainer.appendChild(commentInput);
    commentContainer.appendChild(deleteInputButton);
    
    document.querySelector('.comments-container').appendChild(commentContainer);
    document.querySelector('.comments-container').appendChild(addCommentButton);
}

function updateCommentIds() {
    const commentContainers = document.querySelectorAll('.comment-container');
    commentContainers.forEach((container, index) => {
        const commentId = container.querySelector('p');
        commentId.textContent = index + 1;
    });
}

function updateLinkIds() {
    const linkContainers = document.querySelectorAll('.link-container');
    linkContainers.forEach((container, index) => {
        const linkId = container.querySelector('p');
        linkId.textContent = index + 1;
    });
}

function addLinkInput() {
    const linkContainer = document.createElement('div');
    linkContainer.classList.add('link-container');

    const linkId = document.createElement('p');
    linkId.textContent = document.querySelectorAll('.link-container').length + 1;

    const linkInput = document.createElement('input');
    linkInput.type="inputlink";
    linkInput.placeholder = 'Введите ссылку';
    linkInput.id = "linkInput";

    const messageIdInput = document.createElement('input');
    messageIdInput.type="inputlink";
    messageIdInput.placeholder = 'Введите айди';
    messageIdInput.id = "messageInput";

    const deleteLinkButton = document.createElement('button');
    deleteLinkButton.textContent = 'Удалить';

    deleteLinkButton.addEventListener('click', () => {
        linkContainer.remove();
        updateLinkIds();
    });

    linkContainer.appendChild(linkId);
    linkContainer.appendChild(linkInput);
    linkContainer.appendChild(messageIdInput)
    linkContainer.appendChild(deleteLinkButton);
    
    linksContainer.appendChild(linkContainer);
    document.querySelector('.links-container').appendChild(addLinkButton);
}

function GetStatus(){
	let xhr = new XMLHttpRequest();
	xhr.open('GET', '/api/status', true);
	xhr.onload = function () {
		console.log(JSON.parse(xhr.responseText))
        indicator.style.backgroundColor = JSON.parse(xhr.responseText) ? 'green' : 'red';
        startButton.innerHTML = JSON.parse(xhr.responseText) ? 'Стоп' : 'Старт'
	}
	xhr.send(null);
}

function GetInput() {
    let comments = [];
    let textareas = Array.from(document.querySelectorAll('textarea')); // Изменено на textarea

    for (let i = 0; i < textareas.length; i++) { // Изменено на textarea
        if (textareas[i].id === "commentInput" && textareas[i].value.trim() !== '') { // Изменено на textarea и добавлен trim() для удаления лишних пробелов
            comments.push(textareas[i].value);
        }
    }
    return comments;
}

function GetLinks(){
    let links = [];
    let linkContainers = document.querySelectorAll('.link-container');

    linkContainers.forEach(container => {
        let linkInput = container.querySelector('input[id="linkInput"]');
        let messageInput = container.querySelector('input[id="messageInput"]');
        
        if (linkInput.value !== '') {
            let linkObj = {
                link: linkInput.value,
                message_id: messageInput.value !== '' ? parseInt(messageInput.value) : -1
            };
            links.push(linkObj);
        }
    });
    
    return links;
}

// Обработчик события клика на кнопку добавления ссылки
addLinkButton.addEventListener('click', addLinkInput);
// Обработчик события клика на кнопку добавления комментария
addCommentButton.addEventListener('click', addCommentInput);

startButton.addEventListener('click', () => {
    if (GetLinks().length > 0 && GetInput().length > 0 && startButton.innerHTML == 'Старт') {

        console.log("start");
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/start', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log('Старт');
            }
            else if (xhr.status === 400) {
                console.error('Ошибка: ' + xhr.responseText, null); // Вызовите обратный вызов с сообщением об ошибке
            } else {
                console.error('Ошибка: ' + xhr.status, null); // Вызовите обратный вызов с сообщением об ошибке
            };
          };
        let data = JSON.stringify({
            "comments": GetInput(),
            "links": GetLinks(),
            "sleep": Number(timeLock.value.trim()) ? Number(timeLock.value.trim()) : 10,
            "token": getCookie("token"),
            "random": getToggleValue()
        });

        console.log(data);
        
        xhr.send(data);
    }else if (startButton.textContent == "Стоп"){
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/stop', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function (){
            if (xhr.status === 202) {
                console.log('Стоп')
            } else {
                console.error('Ошибка: ' + xhr.status, null); 
            };
        };

        let data = JSON.stringify({
            "token": getCookie("token"),
        });
        xhr.send(data);

    }else{
  		alert("Убедитесь что всё заполнено");
  	};
});


document.addEventListener('DOMContentLoaded', GetBots());
setInterval(GetStatus, 1000);


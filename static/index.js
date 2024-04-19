const startButton = document.getElementById('startButton');
const indicator = document.getElementById('indicator');
const linkInput = document.getElementById('linkInput');
const addCommentButton = document.getElementById('addCommentButton');
const commentsList = document.getElementById('commentsList');
const commentInputsContainer = document.getElementById('commentInputs');
const botContainer = document.getElementById('bot-container')
const addBotButton = document.getElementById('addBotButton');
const sessionFolderInput = document.getElementById('sessionFolderInput');
const timeLock = document.getElementById('timelock')
const messegeId = document.getElementById('idmessege')




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
    bots.forEach(bot => {
        const botDiv = document.createElement('div');
        botDiv.classList.add('bot-info');

        const statusIndicator = document.createElement('p');
        statusIndicator.textContent = '⦿'
        statusIndicator.style.color = bot.Status ? 'green' : 'red';
        botDiv.appendChild(statusIndicator);

        const botName = document.createElement('p');
        botName.textContent = `${bot.Name}`;
        botDiv.appendChild(botName);

        //Кнопка едит
        const editButton = document.createElement('button');
        editButton.textContent = 'Изменить';

        editButton.addEventListener('click', () => {
            const newName = prompt("Введите новое имя для бота:", bot.Name);
            bot.Name = newName.trim();
            botName.textContent = `${bot.Name}`;
            BotEdit(bot.Id, bot.Name, getCookie("token"));
        });

        //Кнопка делит
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';

        deleteButton.addEventListener('click', () => {
            BotDELETE(bot.Id, getCookie("token"));
            
        });

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('bot-buttons-container'); // Добавляем класс для стилизации

        buttonsContainer.appendChild(editButton);
        buttonsContainer.appendChild(deleteButton);

        botDiv.appendChild(buttonsContainer);

        botContainer.appendChild(botDiv);
    });
}

function GetBots() {
  let token = getCookie('token')
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://gamch1k.v6.navy:3000/api/bots', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    if (xhr.status === 200) {
      let botss = JSON.parse(xhr.responseText);

      displayBots(botss)
    }
    else if (xhr.status === 400) {
      ('Ошибка: ' + xhr.responseText, null); // Вызовите обратный вызов с сообщением об ошибке
    } else {
      ('Ошибка при проверке токена: ' + xhr.status, null); // Вызовите обратный вызов с сообщением об ошибке
    };
  };
  let data = JSON.stringify({
    "token": token
  });
  xhr.send(data);
};

// Функция для добавления комментария
function addCommentInput() {
    const commentInput = document.createElement('input');
    commentInput.type = 'comment';
    commentInput.placeholder = 'Введите комментарий';
    commentInput.id = 'commentInput'; 

    const deleteInputButton = document.createElement('button');
    deleteInputButton.textContent = 'Удалить';

    deleteInputButton.addEventListener('click', () => {
        commentInputsContainer.removeChild(commentInput);
        commentInputsContainer.removeChild(deleteInputButton);
    });

    commentInputsContainer.appendChild(commentInput);
    commentInputsContainer.appendChild(deleteInputButton);

    document.querySelector('.comments-container').appendChild(commentInputs);
    document.querySelector('.comments-container').appendChild(addCommentButton);
}

function GetStatus(){
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://gamch1k.v6.navy:3000/api/status', true);
	xhr.onload = function () {
		console.log(JSON.parse(xhr.responseText))
        indicator.style.backgroundColor = JSON.parse(xhr.responseText) ? 'green' : 'red';
        startButton.innerHTML = JSON.parse(xhr.responseText) ? 'Стоп' : 'Старт'
	}
	xhr.send(null);
}

function GetInput(){
    let comments = [];
    let inputs = Array.from(document.querySelectorAll('input'));

    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].id === "commentInput" && inputs[i].value !== ''){
            comments.push(inputs[i].value);
        }
    }
    return comments;
}

// Обработчик события клика на кнопку добавления комментария
addCommentButton.addEventListener('click', addCommentInput);

startButton.addEventListener('click', () => {
    if (linkInput.value.trim() !== null && messegeId.value.trim() !== null) {

        console.log("start");
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://gamch1k.v6.navy:3000/api/start', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        let data = JSON.stringify({
            "comments": GetInput(),
            "link": linkInput.value.trim(),
            "msg_id": Number(messegeId.value.trim()),
            "sleep": Number(timeLock.value.trim()),
            "token": getCookie("token")
        });

        console.log(data);
        
        xhr.send(data);

    }else{
  		alert("Убедитесь что ссылки правильно указаны")
  	};
});


document.addEventListener('DOMContentLoaded', GetBots());
setInterval(GetStatus, 1000);


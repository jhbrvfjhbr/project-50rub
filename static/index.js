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


        const indexBota = document.createElement('p');
        indexBota.textContent = `${index+1}.` ; 
        botDiv.appendChild(indexBota);

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
  xhr.open('POST', '/api/bots', true);
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

    const commentInput = document.createElement('input');
    commentInput.type = 'comment';
    commentInput.placeholder = 'Введите комментарий';
    commentInput.id = "commentInput"

    const deleteInputButton = document.createElement('button');
    deleteInputButton.textContent = 'Удалить';

    deleteInputButton.addEventListener('click', () => {
        commentContainer.remove();
        updateCommentIds();
    });

    commentContainer.appendChild(commentId);
    commentContainer.appendChild(commentInput);
    commentContainer.appendChild(deleteInputButton);
    
    CommContainer.appendChild(commentContainer);
    document.querySelector('.comments-container').appendChild(addCommentButton);
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

    const deleteLinkButton = document.createElement('button');
    deleteLinkButton.textContent = 'Удалить';

    deleteLinkButton.addEventListener('click', () => {
        linkContainer.remove();
        updateLinkIds();
    });

    linkContainer.appendChild(linkId);
    linkContainer.appendChild(linkInput);
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

function GetLinks(){
    let links = [];
    let inputs = Array.from(document.querySelectorAll('input'));

    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].id === "linkInput" && inputs[i].value !== ''){
            links.push(inputs[i].value);
        }
    }
    return links;
}
// Обработчик события клика на кнопку добавления ссылки
addLinkButton.addEventListener('click', addLinkInput);
// Обработчик события клика на кнопку добавления комментария
addCommentButton.addEventListener('click', addCommentInput);

startButton.addEventListener('click', () => {
    if (GetLinks().length > 0 && GetInput().length > 0) {

        console.log("start");
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/start', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        let data = JSON.stringify({
            "comments": GetInput(),
            "links": GetLinks(),
            "sleep": Number(timeLock.value.trim()),
            "token": getCookie("token"),
            "random": getToggleValue()
        });

        console.log(data);
        
        xhr.send(data);

    }else{
  		alert("Убедитесь что всё заполнено")
  	};
});


document.addEventListener('DOMContentLoaded', GetBots());
setInterval(GetStatus, 1000);


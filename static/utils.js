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

function sendTokenToAPI() {
  let token = getCookie('token');
  if (token) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/check_token', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 202) {
        if(window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1).toLowerCase() === "login.html"){ //Это защита от крыс, что бы без токена не могли на панель зайти, а с токином в логин
          window.location.href = '/index.html';
        }
      } else if (xhr.status === 400) {
        console.error('Токен недействителен или истек срок его действия.');
        if(window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1).toLowerCase() === "index.html"){ //Что бы не писать разные фунции для страницы логина и панели админа, я сделал проверку на страницы
          window.location.href = '/login.html'
        }
      } else {
        console.error('Ошибка при проверке токена:', xhr.status);
      }
    };
    xhr.onerror = function () {
      console.error('Произошла ошибка при выполнении запроса.');
    };

    let data = JSON.stringify({
      "token": token
    });
    console.log(data)
    xhr.send(data);
  } else {
    console.error('Токен не найден в куки.');
    if(window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1).toLowerCase() === "index.html"){
      window.location.href = '/login.html'
    }
  }
}


function setCookie(name, value, days) { // Запись куки название, значение, время(в днях)
  let expires = '';
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
    console.log('Токен как бы записан только что')
    console.log(document.cookie);
}

document.addEventListener('DOMContentLoaded', sendTokenToAPI)

// Функции для работы с сервером

function loginToAPI(login, password) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/login', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    if (xhr.status === 202) {
      let token = xhr.responseText;
      console.log('Успешная аутентификация. Получен токен:', token);
      setCookie('token', token, 1)
      sendTokenToAPI()
    }
    else if (xhr.status === 400) {
      console.error('Ошибка:', xhr.responseText);
      alert("Пароль или логин не верны!")
    }
  };
  xhr.onerror = function () {
    console.error('Произошла ошибка при выполнении запроса.');
  };
  let data = JSON.stringify({
    "login": login,
    "password": password
  });
  xhr.send(data);
}

function BotEdit(id, name, token) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/bot_change_name', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    if (xhr.status === 202) {
      alert("Имя изменено успешно")
      location.reload()
    }
    else if (xhr.status === 400) {
      console.error('Ошибка:', xhr.responseText);
      alert("Пароль или логин не верны!")
    }
  };
  xhr.onerror = function () {
    console.error('Произошла ошибка при выполнении запроса.');
  };
  let data = JSON.stringify({
    "id": id,
    "name": name,
    "token": token
  });
  xhr.send(data);
}


function BotDELETE(id, token) {
  let xhr = new XMLHttpRequest();
  xhr.open('DELETE', '/api/bot', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    if (xhr.status === 202) {
      alert("Имя изменено успешно")
      location.reload()
    }
    else if (xhr.status === 400) {
      console.error('Ошибка:', xhr.responseText);
      alert("Пароль или логин не верны!")
    }
  };
  xhr.onerror = function () {
    console.error('Произошла ошибка при выполнении запроса.');
  };
  let data = JSON.stringify({
    "id": id,
    "token": token
  });
  xhr.send(data);
}


function BotADD(id, token) {
  let xhr = new XMLHttpRequest();
  xhr.open('DELETE', '/api/new_bot', true);
  xhr.setRequestHeader('Content-Type', 'session');
  xhr.onload = function () {
    if (xhr.status === 202) {
      alert("Имя изменено успешно")
      location.reload()
    }
    else if (xhr.status === 400) {
      console.error('Ошибка:', xhr.responseText);
      alert("Пароль или логин не верны!")
    }
  };
  xhr.onerror = function () {
    console.error('Произошла ошибка при выполнении запроса.');
  };
  let data = JSON.stringify({
    "id": id,
    "token": token
  });
  xhr.send(data);
}





const login_button = document.getElementById('login_button');

function getCookie(name) {
	console.log('GetCookie')
	var cookies = document.cookie.split(';');
  	for (var i = 0; i < cookies.length; i++) {
    	var cookie = cookies[i].trim();
    	if (cookie.startsWith(name + '=')) {
      		return cookie.substring(name.length + 1);
    	}
  	}
  	return null;
}

function isAuth(){
	if(getCookie('token')){
		window.location.href = 'index.html'
	}
	else{
		console.log(getCookie('token'))
	}	
}

document.addEventListener('DOMContentLoaded', isAuth)


function ServerLogin(login, password){ // Имитация запроса на сервер и его ответа
	console.log('Сервер получил запрос')
	if( login === 'admin' && password ==='20241504'){
		return '1234567890'
	}
	else{
		return null
	}
}

function setCookie(name, value, days) { // Запись куки название, значение, время(в днях)
	console.log('запись куки')
	var expires = '';
  	if (days) {
    	var date = new Date();
    	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    	expires = '; expires=' + date.toUTCString();
  	}
  	document.cookie = name + '=' + value + expires + '; path=/';
  	console.log('Токен как бы записан только что')
}

function GetToken() { // Функция должна делать производить авторизацию пользователя.
	console.log('GetToken')
	pass = document.getElementById('password').value
	log = document.getElementById('login').value
	// Вот тут должен быть реквест
	Token = ServerLogin(log, pass);
	if(Token){
		setCookie('token', Token, 1)
		isAuth()
	}
	else{
		alert('Пароль или логин не правильные')
	}
}

login_button.addEventListener('click', () => {
	console.log('Кнопка нажалась')
	GetToken()
})
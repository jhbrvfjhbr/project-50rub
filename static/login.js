const login_button = document.getElementById('login_button');

function ServerLogin(login, password){ // Имитация запроса на сервер и его ответа
	if( login === 'admin' && password ==='20241504'){
		return '1234567890'
	}
	else{
		return null
	}
}

function GetToken() { // Функция должна делать производить авторизацию пользователя.
	pass = document.getElementById('password').value
	log = document.getElementById('login').value
	loginToAPI(log, pass)
}

login_button.addEventListener('click', () => {
	console.log('Кнопка нажалась')
	GetToken()
})
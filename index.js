const startButton = document.getElementById('startButton');
const indicator = document.getElementById('indicator');
const linkInput = document.getElementById('linkInput');
const addCommentButton = document.getElementById('addCommentButton');
const commentsList = document.getElementById('commentsList');
const commentInputsContainer = document.getElementById('commentInputs');


// Функция для добавления комментария
function addCommentInput() {
    const commentInput = document.createElement('input');
    commentInput.type = 'comment';
    commentInput.placeholder = 'Введите комментарий';
    commentInput.id = 'commentInput'; // Добавляем уникальный идентификатор

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

function GetInput(){
    var comments = [];
    var inputs = Array.from(document.querySelectorAll('input'));

    for(var i = 0; i < inputs.length; i++){
        if(inputs[i].id === "commentInput" && inputs[i].value !== ''){
            comments.push(inputs[i].value);
        }
    }
    return comments;
}

// Обработчик события клика на кнопку добавления комментария
addCommentButton.addEventListener('click', addCommentInput);

startButton.addEventListener('click', () => {

    const inputValue = linkInput.value.trim(); // Получаем значение из поля ввода и удаляем лишние пробелы
    var response = 0
    if(startButton.innerHTML == "Стоп"){
        response = 0
        indicator.style.backgroundColor = response === 1 ? 'green' : 'red';
        startButton.innerHTML = "Старт"
    }else{
        if (inputValue) { // Получаемый ответ с сервера, 
            // Если поле ввода не пустое, отправляем запрос на сервер и обрабатываем ответ
            console.log(GetInput())
            response = 1;

            // Изменяем цвет индикатора в зависимости от ответа
            indicator.style.backgroundColor = response === 1 ? 'green' : 'red';
            startButton.innerHTML = "Стоп";
        } else {
            // Если поле ввода пустое, выводим сообщение об ошибке
            alert('Введите ссылку!');
        }
    }
});
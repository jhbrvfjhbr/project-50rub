const startButton = document.getElementById('startButton');
const indicator = document.getElementById('indicator');
const linkInput = document.getElementById('linkInput');
const addCommentButton = document.getElementById('addCommentButton');
const commentsList = document.getElementById('commentsList');
const commentInputsContainer = document.getElementById('commentInputs');




let comments = []; // Массив комментов. Его на сервер при Старт.

// Функция для добавления комментария
function addComment() {
    const commentInputs = commentInputsContainer.getElementsByTagName('input');
    const lastInput = commentInputs[commentInputs.length - 1];
    const commentText = lastInput.value.trim();
    if (commentText) {
        comments.push(commentText);
        renderComments();
        lastInput.value = ''; // очистка, что бы не стакалось, на всякий случай
    } else {
        alert('Введите комментарий!');
    }
}

// Функция для добавления комментария
function addCommentInput() {
    if (!document.getElementById('commentInput')) {
        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Введите комментарий';
        commentInput.id = 'commentInput'; // Добавляем уникальный идентификатор

        const deleteInputButton = document.createElement('button');
        deleteInputButton.textContent = 'Удалить';

        deleteInputButton.addEventListener('click', () => {
            commentInputsContainer.removeChild(commentInput);
            commentInputsContainer.removeChild(deleteInputButton);
        });

        commentInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                addComment();
                commentInputsContainer.removeChild(commentInput);
                commentInputsContainer.removeChild(deleteInputButton);
            }
        });

        commentInputsContainer.appendChild(commentInput);
        commentInputsContainer.appendChild(deleteInputButton);
    } else {
        alert("Одной меня вам не хватает, семпай?!??! >_< ");
    }
    
    document.querySelector('.comments-container').appendChild(commentInputs);
    document.querySelector('.comments-container').appendChild(addCommentButton);
}

// Функция для отображения комментариев
function renderComments() {
    commentsList.innerHTML = ''; // очистка, что бы не стакалось
    comments.forEach((comment, index) => {
        const commentElement = document.createElement('div');
        commentElement.textContent = comment;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => deleteComment(index));
        commentElement.appendChild(deleteButton);
        commentsList.appendChild(commentElement);
    });
}

// Обработчик события клика на кнопку добавления комментария
addCommentButton.addEventListener('click', addCommentInput);

// Функция для удаления комментария
function deleteComment(index) {
    comments.splice(index, 1);
    renderComments();
}

startButton.addEventListener('click', () => {
    const inputValue = linkInput.value.trim(); // Получаем значение из поля ввода и удаляем лишние пробелы
    var response = 0
    if(startButton.innerHTML == "Стоп"){
        response = 0
        indicator.style.backgroundColor = response === 1 ? 'green' : 'red';
        startButton.innerHTML = "Старт"
    }else{
        if (inputValue) {
            // Если поле ввода не пустое, отправляем запрос на сервер и обрабатываем ответ
            // Предположим, что мы получили ответ 1 (успех)
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
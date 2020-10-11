const input = document.querySelector(".block__form-input")
const button = document.querySelector(".block__form-button-add")
const blockList = document.querySelector(".block__list")
let counter = 0;
const deleteCompeltedButton = document.querySelector(".block__form-button-filter-delete-completed");
const buttonShowCompleted = document.querySelector(".block__form-button-filter-completed")

buttonShowCompleted.addEventListener("click", (e) => {
    const list = blockList.childNodes; //список элементов списка
    list.forEach(node => {
        if (node.attributes) { // проверяем есть ли атрибуты у элемента
            const isCompleted = node.attributes['data-deleted'].value === '1'; // проверяем зачеркнут ли элемент
            if (!isCompleted) {
                const classList = node.classList; // получаем список классов элемента
                const isHided = classList.contains("block__list-element_hide"); // проверяем спрятан ли он уже
                if (isHided) {
                    node.classList.remove("block__list-element_hide") // возвращем если спрятан
                } else {
                    node.classList.add("block__list-element_hide") // прячем 
                }
            }
        }
    })
})

deleteCompeltedButton.addEventListener("click", (e) => {
    const list = blockList.childNodes;
    const listForDelete = []
    list.forEach(node => {
        if (node.attributes) {
            const isDeleted = node.attributes['data-deleted'].value === '1'; // проверяем зачеркнут ли элемент
            if (isDeleted) {
                listForDelete.push(node);// если зачеркнут перемещаем в массив для удаления
            }
        }
    });
    listForDelete.forEach(node => {
        blockList.removeChild(node);// удаляем из списка зачеркнуты элементы
    })
})

function onClickRow (e) {
    const isDeleted = e.target.attributes['data-deleted'].value === '1'; // проверяем зачеркнут ли уже элемент
    if (isDeleted) {
        e.target.setAttribute('data-deleted', 0);
        e.target.classList.remove("block__list-element_deleted"); // если зачеркнут убираем зачеркивание убиранием класса и ставим свойство в 0 значит не зачеркнут
    } else {
        e.target.setAttribute('data-deleted', 1);
        e.target.classList.add("block__list-element_deleted");// добавляем зачеркиванием классом и устанавливаем свойство в 1 - значит зачеркнут
    }
};

function createElements(text){
    let newElement = document.createElement("button");
    newElement.className = "block__list-element";
    newElement.textContent = text;
    newElement.setAttribute('data-deleted', 0);
    newElement.setAttribute('data-id', counter)
    newElement.onclick = onClickRow;
    counter = counter + 1;
    blockList.appendChild(newElement);

    let deleteSpan = document.createElement("span");
    deleteSpan.className = "block__list-delete";
    deleteSpan.textContent = "Х";
    newElement.appendChild(deleteSpan);
    deleteSpan.addEventListener("click", function(){
        blockList.removeChild(newElement)
    });

   /* let compliteSpan = document.createElement("span");
    compliteSpan.className = "block__list-complite";
    compliteSpan.textContent */
};

input.addEventListener("keydown", function(e) {
    if (e.keyCode === 13 && input.value !== "") {
        createElements(input.value);
        input.value = "";
    }
});

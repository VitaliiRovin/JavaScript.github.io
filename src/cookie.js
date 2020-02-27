/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function () {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    parseCookie(filterNameInput.value);
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;

    addNameInput.value = '';
    addValueInput.value = '';
    parseCookie(filterNameInput.value);
});

const inMatching = (full, chunk) => full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1;

const parseCookie = (filter = null) => {
    listTable.innerHTML = '';

    if (document.cookie) {
        document.cookie.split('; ')
            .forEach(item => {
                const [name, value] = item.split('=');

                if (filter) {
                    if (inMatching(name, filter) || inMatching(value, filter)) {
                        addCookie(name, value);
                    }
                } else {
                    addCookie(name, value)
                }
            });
    }
};

const addCookie = (name, value) => {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdValue = document.createElement('td');
    const tdBtn = document.createElement('td');
    const removeBtn = document.createElement('button');
    const fragment = document.createDocumentFragment();

    tdName.innerText = name;
    tdValue.innerText = value;
    removeBtn.innerText = 'Удалить';

    tr.appendChild(tdName);
    tr.appendChild(tdValue);
    tdBtn.appendChild(removeBtn);
    tr.appendChild(tdBtn);
    fragment.appendChild(tr);
    listTable.appendChild(fragment);

    removeBtn.addEventListener('click', e => {
        removeCookie(e.target);
    })
};

const removeCookie = (target) => {
    const tr = target.closest('tr');
    const tdName = tr.querySelector('td:first-child').textContent;
    const tdValue = tr.querySelector('td:nth-child(2)').textContent;

    tr.remove();
    document.cookie = tdName + '=' + tdValue + ';max-age=0';
};

parseCookie();
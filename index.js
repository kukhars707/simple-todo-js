const form = document.querySelector('.form');
const input = document.querySelector('.input');
const list = document.querySelector('.task-list');
let elementId = 0;

document.addEventListener('DOMContentLoaded', () => {
    input.focus();
});

form.addEventListener('submit', createTask);

function createTask(event) {
    event.preventDefault();
    let formData = new FormData(form);
    
    if (formData.get('task').length > 0) {
        input.classList.remove('validation-error');
        let element = createElement(elementId, formData.get('task'));
        list.append(element);
        elementId++;
        form.reset();
        input.focus();
    } else {
        input.classList.add('validation-error');
    }
}

function createElement(id, text) {
    let element = document.createElement('li');
    let deleteButton = document.createElement('button');
    let checkbox = document.createElement('input');
    let settingsContainer = document.createElement('div');
    let textElement = document.createElement('p');

    checkbox.type = 'checkbox';
    element.setAttribute('class', 'task-item');
    element.setAttribute('id', id);
    textElement.innerText = text;
    deleteButton.setAttribute('onclick', 'removeItem('+ id +')');
    deleteButton.setAttribute('class', 'remove-button');

    checkbox.setAttribute('onchange', 'checkItem('+ id +')');
    checkbox.setAttribute('class', 'check-button');
    deleteButton.innerText = 'Delete';

    settingsContainer.setAttribute('class', 'settings-container');

    element.append(textElement);
    settingsContainer.append(deleteButton);
    settingsContainer.append(checkbox);
    element.append(settingsContainer);

    return element;
};

function removeItem(id) {
    const element = document.getElementById(id);
    element.remove();
};

function checkItem(id) {
    const element = document.getElementById(id);
    const checkbox = element.lastChild.lastChild;
    checkbox.setAttribute('disabled', true);
    element.firstChild.classList.add('checked');
};
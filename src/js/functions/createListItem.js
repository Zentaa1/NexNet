export function createListItem(label, value) {
    const ul = document.createElement('ul');
    ul.classList.add('col-md-12', 'col-4');

    const liLabel = document.createElement('li');
    liLabel.classList.add('fw-bold');
    liLabel.textContent = label;

    const liValue = document.createElement('li');
    liValue.textContent = value;

    ul.appendChild(liLabel);
    ul.appendChild(liValue);

    return ul;
}
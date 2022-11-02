let names = ['Erica Mustermann', 'John Doe'];
let phoneNumbers = ['015712345678', '015798765432'];
load();


function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += `<h1>My Contacts</h1>`;
    content.innerHTML += `
    <div>
        <input placeholder="Name" id="name">
        <input placeholder="Telefon" id="phone">
        <button onclick="addContact()">Hinzufügen</button>
    </div>
    `;

    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const phoneNumber = phoneNumbers[i];

        content.innerHTML += /*html*/`
        <div class="card">
            <b>Name: </b> ${name} <br>
            <b>Telefon: </b> ${phoneNumber} <br>
            <button onclick="deleteContact(${i})">Löschen</button>
        </div>`
    }
}

function addContact() {
    let name = document.getElementById('name');
    let phone = document.getElementById('phone');
    names.push(name.value);
    phoneNumbers.push(phone.value);
    render();
    save();
}

function deleteContact(i) {
    names.splice(i, 1);
    phoneNumbers.splice(i, 1);
    render();
    save();
}

function save() {
    let namesAsText = JSON.stringify(names);
    let phonesAsNumbers = JSON.stringify(phoneNumbers);
    localStorage.setItem('names', namesAsText);
    localStorage.setItem('phoneNumbers', phonesAsNumbers);
}

function load() {
    let namesAsText = localStorage.getItem('names');
    let phonesAsNumbers = localStorage.getItem('phoneNumbers');
    if (namesAsText && phonesAsNumbers) {
        names = JSON.parse(namesAsText);
        phoneNumbers = JSON.parse(phonesAsNumbers);
    }

}
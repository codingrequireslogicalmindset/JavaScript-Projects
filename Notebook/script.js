let titles = [];
let notes = [];
let titlesTrash = [];
let notesTrash = [];

function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += renderNewNoteTemplate();
    content.innerHTML += renderOnclickTemplate();
    for (let i = 0; i < titles.length; i++) {
        const title = titles[i];
        const note = notes[i];
        document.getElementById('msgSection').innerHTML += renderNotesTemplate(title, note, i);
    }
}

function addPost() {
    let titleBox = document.getElementById('title');
    let noteBox = document.getElementById('note');

    if (titleBox.value == 0 || noteBox.value == 0) { alert("Type in at least one charakter for title and note!") }
    else {
        titles.push(titleBox.value);
        notes.push(noteBox.value);
        render();
        save();
    }
}

function deleteBox() {
    document.getElementById('title').value = '';
    document.getElementById('note').value = '';
}

function trash() {
    document.getElementById('msgSection').innerHTML = '';
    for (let i = 0; i < titlesTrash.length; i++) {
        if (titlesTrash[i] == 0) {
            document.getElementById('msgSection').innerHTML = '';
        }
        else {
            document.getElementById('msgSection').innerHTML += trashTemplate(titlesTrash, notesTrash, i);
        }
    }
    document.getElementById('postbox').innerHTML = trashEmptyTemplate();
}

function deleteTrash() {
    titlesTrash.length = 0;
    notesTrash.length = 0;
    document.getElementById('msgSection').innerHTML = '';
    trash();
    save();
}

function deletePost(i) {
    titlesTrash.push(titles[i]);
    notesTrash.push(notes[i]);

    titles.splice(i, 1);
    notes.splice(i, 1);

    render();
    save();
}

function reuse(i) {
    titles.push(titlesTrash[i]);
    notes.push(notesTrash[i]);
    
    titlesTrash.splice(i, 1);
    notesTrash.splice(i, 1);

    render();
    save();
}

function save() {
    let titlesAsText = JSON.stringify(titles);
    let notesAsText = JSON.stringify(notes);
    let titlesTrashAsText = JSON.stringify(titlesTrash);
    let notesTrashAsText = JSON.stringify(notesTrash)
    localStorage.setItem('titles', titlesAsText);
    localStorage.setItem('notes', notesAsText);
    localStorage.setItem('titlesTrash', titlesTrashAsText);
    localStorage.setItem('notesTrash', notesTrashAsText);
}

function load() {
    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');

    if (titlesAsText && notesAsText) {
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
    }

    let titlesTrashAsText = localStorage.getItem('titlesTrash');
    let notesTrashAsText = localStorage.getItem('notesTrash');

    if (titlesTrashAsText && notesTrashAsText) {

        titlesTrash = JSON.parse(titlesTrashAsText);
        notesTrash = JSON.parse(notesTrashAsText);
    }
    render();
}

function renderNewNoteTemplate() {
    return /*html*/`
    <div class="header">
    <img src="./img/mindmap.png">
    <span class="headline"><b>Notebook</b></span>
    <img src="./img/cafe.png">
    </div>`;
}

function renderOnclickTemplate() {
    return /*html*/`
    <div class="navBar">
    <img src="./img/home.png" onclick="render()">
    <img src="./img/trash.png" onclick="trash()">
    </div>
    <div class="postbox" id="postbox">
    <input placeholder="Title (max. 30 characters!)" maxlength="30" id="title">
    <textarea placeholder="Take a note..." id="note"></textarea>
    <div class="addNote">
    <img src="./img/close.png" onclick="deleteBox()">
    <img src="./img/msg.png" onclick="addPost()">
    </div>
    </div>
    <div class="msgSection" id="msgSection">
    </div>
    <div class="footer">
    <span>Copyright © Christian Axtmann, 2022</span>
    </div>
    `;
}

function renderNotesTemplate(title, note, i) {
    return /*html*/`
    <div class="msgbox" id="msgbox">
    <b>${title}</b><p class="whiteSpace">${note}</p>
    <a href="#">
    <img class="trashIcon" src="./img/trash.png" onclick="deletePost(${i})">
    </a>
    </div>`;
}

function trashTemplate(titlesTrash, notesTrash, i) {
    return /*html*/`
    <div class="msgbox">
    <b>${titlesTrash[i]}</b><p class="whiteSpace">${notesTrash[i]}</p>
    <a href="#">
    <img class="trashIcon" src="./img/reuse.png" onclick="reuse(${i})">
    </a>
    </div>`;
}

function trashEmptyTemplate() {
    return /*html*/`
    <b>Trash</b>
    <div class="emptyTrash">
    <img src="./img/trash.png" onclick="deleteTrash()">
    emptying!
    </div>`;
}
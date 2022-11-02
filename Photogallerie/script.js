let images = ['./img/art1.jpg','./img/art2.jpg','./img/art3.jpg','./img/art4.jpg','./img/art5.jpg','./img/art6.jpg','./img/art7.jpg','./img/art_gallery_berlin.png','./img/art12.jpg','./img/art13.jpg','./img/art18.png','./img/art19.png','./img/ozora1.png','./img/ozora2.png','./img/ozora3.png','./img/ozora1.jpg','./img/ozora2.jpg','./img/ozora3.jpg','./img/ozora4.jpg','./img/ozora5.jpg','./img/ozora6.jpg','./img/ozora7.jpg','./img/ozora8.jpg','./img/ozora9.jpg','./img/ozora10.jpg','./img/ozora11.jpg','./img/ozora12.jpg','./img/ozora14.jpg','./img/ozora15.jpg','./img/ozora16.jpg'];

function render() {
    let content = document.getElementById('content');
    content.innerHTML = ``;
    for (let i = 0; i < images.length; i++) {
        let image = images[i];
        content.innerHTML += `<img src="${image}" class="imgbox" onclick="imgShow(${i})">`;
    }
}

function imgShow(i) {
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += imgShowTemplate(i);
}

function nextImg(i) {
    if (i == images.length - 1) {
        render();
    }
    else {
        let further = ++i;
        imgShow(further);
    }
}

function previousImg(i) {
    if(i < 1) {
        render();
    }
    else {
        let previous = --i;
        imgShow(previous);
    }
}

function imgShowTemplate(i) {
    return /*html*/`
    <div class="fullscreen">
    <img class="close_window" src="./img/close.png" onclick="render()">
    <img class="img_fullscreen" src=${images[i]}>
    <div class="arrows">
    <img class="signs" src="./img/arrow-left.png" onclick="previousImg(${i})">  
    <img class="signs" src="./img/arrow-right.png" onclick="nextImg(${i})">
    </div>
    </div>`;
}
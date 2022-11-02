let menus = [
    'Chicken Super Bowl',
    'Sesam Chicken Bowl',
    'Fruity-Ocean Bowl',
    'Rainbow Salmon Bowl',
    'Mango Crunchy Bowl',
    'Japanese Superfood Bowl',
    'Agedashi Tofu Bowl',
    'Rainbow-Glas-Noodle Bowl'
];
let descriptions = [
    'mit Chicken, Feta, Grillgemüse, Mais, Kidneybohnen, warmem Jasmin-Duftreis, schwarzem Sesam und Sprossen',
    'mit Hähnchenbruststreifen im Sesammantel, Gurken, Erdnüssen, Avocado, Karottenstreifen, Naturreis und einem Dressing nach Wahl',
    'mit Garnelen, Veggie-Dumplings, Edamame, Erdnüssen, hausgemachtem Mango-Salsa, warmem Jasmin-Duftreis, Japanese Mayonnaise, Unagisauce, schwarzem Sesam und Sprossen',
    'mit Lachs-Teriyaki, Baby-Spinat, Karotten, Rotkraut, Edamame, Avocado, und warmer Jasmin-Duftreis',
    'mit knusprigen Putenschnitzel Streifen, Edamame, hausgemachte Mango Salsa, japanese Mayonnaise, Teriyakisauce und warmer Jasmin-Duftreis',
    'mit Lachs, Avocado, Gurken, Japanese-Mayonnaise, Unagisauce, Sesam und Jasmin-Duftreis',
    'mit Tofu, Karotten, Grillgemüse, Gurken, Unagisauce, Sesam und Jasmin-Duftreis',
    'mit Glasnudelsalat, Frühlingsrollen, Karottenstreifen, Gurken und Lauchstreifen',
];
let prices = [11.50, 12.50, 12.90, 10.50, 11.50, 12.90, 12.90, 11.50];

let menuBasket = [];
let priceBasket = [];
let amounts = [];

shippingCost = 3.50;

load();

function renderOrderSection() {
    let order = document.getElementById('orderSection');
    order.innerHTML = '';
    for (let i = 0; i < menus.length; i++) {

        order.innerHTML += selectMenuTemplate(i);
    }
    renderBasketContainer()
}

function renderBasketContainer() {
    let basket = document.getElementById('basketContainer');
    basket.innerHTML = '';
    basket.innerHTML += emptyBasketTemplate();
}

function addToBasket(i) {
    let menu = menus[i];
    let price = prices[i];

    if (menuBasket.includes(menu)) {
        amounts[menuBasket.indexOf(menu)]++;
    }
    else {
        menuBasket.push(menu);
        priceBasket.push(price);
        amounts.push(1);
    }
    save();
    shoppingBasket();
}

function shoppingBasket() {
    let basket = document.getElementById('basketContainer');
    basket.innerHTML = '';
    basket.innerHTML += /*html*/`
    <div class="basket">
        <h2 class="h2_basket">Warenkorb</h2>
        <div id='basket'>
        </div>
    </div>`;

    for (let i = 0; i < menuBasket.length; i++) {
        let shoppingCart = document.getElementById('basket');
        
        shoppingCart.innerHTML += shoppingBasketTemplate(i);
    }
    let shoppingCart = document.getElementById('basket');
    shoppingCart.innerHTML += showPriceTemplate();

    calcPrice();

    if (menuBasket == 0) {
        renderBasketContainer();
    }
}

function deleteOrder(i) {
    menuBasket.splice(i, 1);
    priceBasket.splice(i, 1);
    amounts.splice(i, 1);
    save();
    shoppingBasket();
}

function reduce(i) {
if (amounts[i] > 1) {
amounts[i]--;
}
else {
    deleteOrder(i);
}
save();
shoppingBasket();
}

function increase(i) {
    amounts[i]++;
    save();
    shoppingBasket();
}

function calcPrice() {
    let sum = 0;

    for (i = 0; i < priceBasket.length; i++) {
        
        sum += priceBasket[i] * amounts[i];
    }

    let total = 0;
    total += sum + shippingCost;

    document.getElementById('sum').innerHTML += `${sum.toFixed(2).replace('.',',')} €`;
    document.getElementById('shipping').innerHTML += `${shippingCost.toFixed(2).replace('.',',')} €`;
    document.getElementById('total').innerHTML += `${total.toFixed(2).replace('.',',')} €`;
}

function save(){
    let menuBasketAsText = JSON.stringify(menuBasket);
    localStorage.setItem('menu', menuBasketAsText);

    let priceBasketAsText = JSON.stringify(priceBasket);
    localStorage.setItem('price', priceBasketAsText);

    let amountsAsText = JSON.stringify(amounts);
    localStorage.setItem('amount', amountsAsText);
}

function load(){
    let menuBasketAsText = localStorage.getItem('menu');
    let priceBasketAsText = localStorage.getItem('price');
    let amountsAsText = localStorage.getItem('amount');

    if (menuBasketAsText && priceBasketAsText && amountsAsText) {

    menuBasket = JSON.parse(menuBasketAsText);
    priceBasket = JSON.parse(priceBasketAsText);
    amounts = JSON.parse(amountsAsText);
    }
}

function selectMenuTemplate (i) {
    return /*html*/`
    <div class="order">
    <div class="order_card">
    <h3>${menus[i]}</h3>
    <span>${descriptions[i]}</span>
    <p class="price_tag">${prices[i].toFixed(2)} €</p>
    </div>
    <button onclick="addToBasket(${i})">+</button>
    </div>`;
}

function emptyBasketTemplate() {
    return /*html*/`
    <div class="basket_empty">
    <img class="img_shopping_bag" src="./img/shopping-bag.png">
    <h2 class="h2_basket">Fülle deinen Warenkorb</h2>
    <p class="text_basket">Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
    </div>`;
}

function shoppingBasketTemplate(i) {
    return /*html*/`
    <div class="order_card">
        <div class="filled_basket">
            <span>${amounts[i]}</span>
            <span>${menuBasket[i]}</span>
            <span>${priceBasket[i].toFixed(2).replace('.',',')} €</span>
        </div>
        <div class="buttons">
            <img onclick="deleteOrder(${i})"src="./img/delete.png" class="img_delete">
            <button onclick="reduce(${i})">-</button>
            <button onclick="increase(${i})">+</button>
        </div>
    </div>`;
}

function showPriceTemplate() {
    return /*html*/`
    <div class="sum_container">
        <div class="sum">
            <h4>Zwischensumme</h4>
            <span id="sum"></span>
        </div>
        <div class="sum">
            <h4>Lieferung</h4>
            <span id="shipping"></span>
        </div>
        <div class="sum_total">
            <h3><b>Gesamt</b></h3>
            <span id="total"></span>
        </div>
    </div>`;
    }
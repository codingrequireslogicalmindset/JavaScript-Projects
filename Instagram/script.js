let posts = [
    {
        'author_profile': './img/verdi.png',
        'author': 'swr.online',
        'location': 'Heidelberg, Deutschland',
        'image': './img/streik_uniklinik.jpg',
        'likes': [0],
        'liked': false,
        'content': `Nach dem Warnstreik der Azubis und OP-Beschäftigten am Mittwoch sind am Donnerstag alle Mitarbeitenden zum Warnstreik aufgerufen. An<span id="dots0">...</span><span class="more" id="more0" onclick="showMore(${0})"> mehr</span><span class="rest_text" id="fullText0"> einer Demo nahmen laut ver.di rund 800 Beschäftigte teil. Der Gesundheits-und Krankenpfleger M.Z. macht deutlich: „Bei diesen Tarifverhandlungen geht es für viele meiner Kolleg*innen um ihre Existenz. Nicht um ein paar Euro mehr, um sich was Besonderes leisten zu können, sondern um das finanzielle Überleben. In unserem Land sind die Gelder da, aber sie werden so ungerecht verteilt. Das ärgert mich und treibt mich an. Die Menschen, die für dieses Klinikum arbeiten, haben eine Lohnerhöhung von mindestens 375 Euro so sehr verdient.“<span class="less" onclick="showLess(${0})"> weniger</span></span>`,
        'comments': []
    },
    {
        'author_profile': './img/tagesschau.png',
        'author': 'Tagesschau',
        'location': 'Berlin, Deutschland',
        'image': './img/streik.jpg',
        'likes': [0],
        'liked': false,
        'content': `Die Arbeitsbedingungen bei Lebensmittel-Lieferdiensten sind oft prekär und die Lieferungen kaum nachhaltig. Wie versuchen andere Staaten, diesen<span id="dots1">...</span><span class="more" id="more1" onclick="showMore(${1})"> mehr</span><span class="rest_text" id="fullText1"> Service fairer zu machen? In Spanien existiert daher seit einem Jahr ein sogenanntes Riders Law, das die Arbeitsbedingungen der Fahrerinnen und Fahrer verbessern soll. Dem Gesetz zufolge müssen die Arbeitgeber der Branche alle Riders festanstellen. "Damit bekommen sie zum Beispiel Kündigungsschutz, Arbeitslosenversicherung, Lohnfortzahlung im Falle einer Krankheit - alle sozialen Leistungen, die eben Festangestellte normalerweise bekommen“, berichtet Korrespondent Nicholas Buschschlüter aus dem ARD-Studio Madrid im Ideenimport.<span class="less" onclick="showLess(${1})"> weniger</span></span>`,
        "comments": []
    },
    {
        'author_profile': './img/logo_dt-fr_burgw.jpg',
        'author': 'Outdooractive',
        'location': 'Schönau (Pfalz), Deutschland',
        'image': './img/schöne_aussicht.jpg',
        'likes': [0],
        'liked': false,
        'content': `Ein Rendezvous zwischen Elsass und Pfalz ist der fast 33 Kilometer lange Premiumwanderweg, auf dem ihr rund 1300 Höhenmeter zurücklegt. Auf<span id="dots2">...</span><span class="more" id="more2" onclick="showMore(${2})"> mehr</span><span class="rest_text" id="fullText2"> steilen Felsen und Bergen oder fast im Tal stehen 8 mächtige Burgruinen am Wegesrand und zeugen von einer oft sehr turbulenten Zeit. Um viele der Burgen ranken sich rätselhafte Geschichten, Sagen und Ereignisse, sodass sie noch geheimnisvoller erscheinen. Mächtige Felsen (teilweise Aussichtsfelsen) stehen am Wegesrand, wilde Waldlandschaften sowie romantische Winkel erfreuen den Naturfreund und kleine idyllische deutsche und französische Orte laden zum Verweilen ein.<span class="less" onclick="showLess(${2})"> weniger</span></span>`,
        "comments": []
    },
    {
        'author_profile': './img/postillion_logo.jpg',
        'author': 'Postillion',
        'location': 'München, Deutschland',
        'image': './img/oktoberfest.jpg',
        'likes': [0],
        'liked': false,
        'content': `Endlich sagt es mal einer: Klaus Holetschek (CSU), der Gesundheitsminister des Bundeslandes, das jedes Jahr das größte Sauffest der Welt mit mehr als<span id="dots3">...</span><span class="more" id="more3" onclick="showMore(${3})"> mehr</span><span class="rest_text" id="fullText3"> 5 Millionen Besuchern ausrichtet, hat davor gewarnt, dass eine Legalisierung von Cannabis zu Drogentourismus führen könnte. Die Bundesregierung müsse daher sicherstellen, "dass keine Anreize für einen Drogentourismus nach Deutschland geschaffen werden", forderte Holetschek wenige Wochen, nachdem Alkoholtouristen auf dem Oktoberfest öffentliche Exzesse feierten (1819 Polizeieinsätze auf der Wiesn 2022). Am Ende des Gesprächs exte Holetschek eine Maß Bier, verprügelte den Journalisten und erbrach sich anschließend in einen Blumentopf.<span class="less" onclick="showLess(${3})"> weniger</span></span>`,
        "comments": []
    }
];

let suggestions = [
    {
        'profilePic': './img/frauenstreik.png',
        'profileName': 'NiUnaMenos95',
        'status': 'Folgt dir'
    },
    {
        'profilePic': './img/adfc_logo.png',
        'profileName': 'cyclingFreak83',
        'status': 'Folgt dir'
    },
    {
        'profilePic': './img/die_partei.jpg',
        'profileName': 'FürEuropaReichts',
        'status': 'Folgt dir'
    },
    {
        'profilePic': './img/trillerpfeiffe.jpg',
        'profileName': 'WirSindEsWert',
        'status': 'Folgt dir'
    },
    {
        'profilePic': './img/himbeere.jpg',
        'profileName': 'Himbeermund89',
        'status': 'Folgt dir'
    }
]

function renderPosts() {
    let content = document.getElementById('postcontainer');
    content.innerHTML = '';
    for (let i = 0; i < posts.length; i++) {
        content.innerHTML += renderPostsTemplate(i);
        renderPostsComments(i);
    }
}

function renderPostsComments(i) {
    let commentcontent = document.getElementById(`comments${i}`);
    for (let c = 0; c < posts[i]['comments'].length; c++) {
        let comment = posts[i]['comments'][c];
        commentcontent.innerHTML += /*html*/`
        <div class="textarea"><b>milchreisrockt</b> ${comment}</div>`;
    }
}

function addComment(i) {
    let input = document.getElementById(`input${i}`);
    if (input.value == '') { return 0 }
    else {
        posts[i]['comments'].push(input.value);
        renderPosts();
    }
    input.value = '';
}

function addLike(i) {
    let like = document.getElementById(`like_btn(${i}`);
    let liked = posts[i]['liked'];
    if (!liked) {
        posts[i]['liked'] = true;
        like.src = './img/red_heart.png';
        posts[i]['likes']++;
    }
    else {
        posts[i]['liked'] = false;
        like.src = './img/heart_icon.png';
        posts[i]['likes']--;
    }
    document.getElementById(`displayLikes${i}`).innerHTML = ' ';
    document.getElementById(`displayLikes${i}`).innerHTML = ` ${posts[i]['likes']}`;
}

function showSuggestions() {
    for (let i = 0; i < suggestions.length; i++) {
        document.getElementById('suggestions').innerHTML += showSuggestionsTemplate(i);
    }
}

function searchBarFocusStart() {
    let search = document.getElementById('searchBar');
    search.style.opacity = '1';
}

function searchBarFocusEnd() {
    let search = document.getElementById('searchBar');
    search.style.opacity = '0.4';
}

function buttonColorStart(i) {
    let button = document.getElementById(`btnComment${i}`);
    button.style.color = 'rgb(70, 170, 170)';
    button.style.cursor = 'pointer';
}

function buttonColorEnd(i) {
    let button = document.getElementById(`btnComment${i}`);
    button.style.color = 'rgb(180, 240, 240)';
}

function showMore(i) {
    document.getElementById(`dots${i}`).style.display = `none`;
    document.getElementById(`more${i}`).style.display = `none`;
    document.getElementById(`fullText${i}`).style.display = `inline`;
}

function showLess(i) {
    document.getElementById(`dots${i}`).style.display = `inline`;
    document.getElementById(`more${i}`).style.display = `inline`;
    document.getElementById(`fullText${i}`).style.display = `none`;
}

function renderPostsTemplate(i) {
    return /*html*/`
    <div class="card_content">
        <div class="author">
        <img class="author_profile" src="${posts[i]['author_profile']}">
        <div class="headline">
        <span class="author_section"><b>${posts[i]['author']}</b></span>
        <span class="location">${posts[i]['location']}</span>
        </div>
        </div>
        <img class="post_img" src="${posts[i]['image']}">
        <div class="post_icons">
            <div class="icons">
                <img class="img_icons" id="like_btn(${i}" src="./img/heart_icon.png" onclick="addLike(${i})">
                <img class="img_icons" src="./img/chat.png">
                <img class="img_icons" src="./img/send_icon.png">
            </div>
            <img class="img_icons" src="./img/bookmark.png">
        </div>
        <div class="likes">
            <span>Gefällt</span><span id="displayLikes${i}"> ${posts[i]['likes']}</span> Mal
        </div>
        <p class="content_area"><b>${posts[i]['author']}</b> ${posts[i]['content']}</p>               
        <div>
            <div class="comment_area" id="comments${i}"></div>
            <div class="comment_box">
            <div class="comment_input">
            <img class ="comment_icon" src="./img/smiley.png">
            <input type="text" placeholder="Kommentieren..." onfocus="buttonColorStart(${i})" onblur="buttonColorEnd(${i})" class="single_comment" id="input${i}">       
            </div>
            <button class="post_btn" id="btnComment${i}" onclick="addComment(${i})">Posten</button>
        </div>
    </div>`;
}

function showSuggestionsTemplate(i) {
    return /*html*/`
    <div class="follow_suggest">
        <div class="profile">
            <img class="profile_img_follower" src="${suggestions[i].profilePic}">
            <div class="profile_setting_follower">
                <div class="profile_account">
                    <span><b>${suggestions[i].profileName}</b></span>
                    <div class="status">${suggestions[i].status}</div>
                </div>
                <div class="profile_link">Folgen</div>
            </div>
        </div>
    </div>`;
}
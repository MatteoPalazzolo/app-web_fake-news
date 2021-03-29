/********* PARAMETERS *********/
const w_wallSelector = ".wall";
const fonts = [
    "'Cinzel', serif",
    "'Dancing Script', cursive",
    "'Grenze Gotisch', cursive",
    "'Sevillana', cursive",
    "'Great Vibes', cursive"
];

/********* REFERENCES *********/
let w_wall = document.createElement("div");

/********* STATES *********/
let level = 0;

/********* CODE *********/
window.addEventListener("load", () => {
    w_wall = document.querySelector(w_wallSelector);
    BuildHTML();
    SetupLevel();
});

function RandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function PlayRightSFX() {
    PlayAudio(right_SFX);
}

function PlayWrongSFX() {
    PlayAudio(wrong_SFX);
}

function BuildHTML() {
    for (let i = 0; i < itemsNum; i++) {
        let newA = document.createElement("a");
        newA.innerHTML = "Verità";
        newA.style.fontFamily = fonts[RandomInt(0, fonts.length)];
        newA.addEventListener("click", PlayWrongSFX);
        w_wall.appendChild(newA);
    }
}

function CheckOutOfScreen(item) {
    let bounding = item.getBoundingClientRect();

	let out = {};
	out.top = bounding.top < 0;
	out.left = bounding.left < 0;
	out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
	out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
	out.any = out.top || out.left || out.bottom || out.right;
	out.all = out.top && out.left && out.bottom && out.right;

	return out.any;
}

const randomChosenList = [];
function ChoseItem() {
    let chosen;
    while (true) {
        chosen = w_wall.children[RandomInt(0, w_wall.childElementCount)];
        if (!CheckOutOfScreen(chosen) && !(chosen in randomChosenList)) break;
    }
    randomChosenList.push(chosen);

    chosen.removeEventListener("click", PlayWrongSFX);
    chosen.addEventListener("click", PlayRightSFX);
    chosen.classList.add("chosen");

    return chosen;
}

function NextLevel() {
    level++;
    TorchOff();
    SetupLevel();
}

let lastChosenList = [];
let chosenList = [];
function SetupLevel() {
    lastChosenList = chosenList.copyWithin();
    chosenList = [];
    for (let i = 0; i < lastChosenList.length; i++) {
        let item = lastChosenList[i];
        item.onclick = undefined;
        item.removeEventListener("click", PlayRightSFX);
        item.classList.remove("chosen");
        item.addEventListener("click", PlayWrongSFX);
    }

    if (level === 0) {
        chosenList.push(ChoseItem());
        chosenList[0].onclick = NextLevel;
    }
    else if (level === 1) {
        chosenList.push(ChoseItem());
        chosenList[0].onclick = NextLevel;
    }
    else if (level === 2) {
        chosenList.push(ChoseItem());
        chosenList[0].onclick = NextLevel;
    }
    else if (level === 3) {
        chosenList.push(ChoseItem());
        chosenList[0].innerHTML = "VErità";
        chosenList[0].onclick = undefined;
        
        chosenList.push(ChoseItem());
        chosenList[1].innerHTML = "veRItà";
        chosenList[1].onclick = undefined;
        
        chosenList.push(ChoseItem());
        chosenList[2].innerHTML = "veriTÀ";
        chosenList[2].onclick = undefined;
    }
    else if (level === 4) {
        chosenList.push(ChoseItem());
        chosenList[0].innerHTML = "VeriTà";
        chosenList[0].onclick = undefined;
        
        chosenList.push(ChoseItem());
        chosenList[1].innerHTML = "vErItà";
        chosenList[1].onclick = undefined;
        
        chosenList.push(ChoseItem());
        chosenList[2].innerHTML = "veRitÀ";
        chosenList[2].onclick = undefined;
    }
    else {
        chosenList.push(ChoseItem());
        chosenList[0].href = w_wall.dataset.href;
    }
}
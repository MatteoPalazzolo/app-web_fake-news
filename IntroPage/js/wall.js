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


/********* CODE *********/
window.addEventListener("load", () => {
    w_wall = document.querySelector(w_wallSelector);
    BuildHTML();
    //RemoveOutOfScreen();
    ChoseItem();
});

function RandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function PlaySFX() {
    PlayAudio(wrong_SFX);
}

function BuildHTML() {
    for (let i = 0; i < itemsNum; i++) {
        let newA = document.createElement("a");
        newA.innerHTML = "Verità";
        newA.style.fontFamily = fonts[RandomInt(0, fonts.length)];
        newA.addEventListener("click", PlaySFX);
        //newA.style.fontSize = RandomInt(50,70) + "px";
        w_wall.appendChild(newA);
    }
}
/*
function RemoveOutOfScreen() {    
    let elements = container.childNodes;
    for (let i = 0; i < elements.length; i++) {
        let elem = elements[i];
        if (CheckOutOfScreen(elem)) {
            elem.parentNode.removeChild(elem);
            console.log(elem);
        }
    }
}*/

function ChoseItem() {
    let chosen;
    while (true) {
        chosen = w_wall.children[RandomInt(0, w_wall.childElementCount)];
        if (!CheckOutOfScreen(chosen)) break;
    }
    chosen.removeEventListener("click", PlaySFX);
    chosen.addEventListener("click", () => PlayAudio(right_SFX));
    chosen.href = w_wall.dataset.href;
    chosen.classList.add("chosen");
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

/********* PARAMETERS *********/
const w_wallSelector = ".wall";
const fonts = [
    "'Cinzel', serif",
    "'Dancing Script', cursive",
    "'Grenze Gotisch', cursive",
    "'Sevillana', cursive"
]

/********* REFERENCES *********/
let container;

/********* STATES *********/

/********* CODE *********/
window.addEventListener("load", () => {
    container = document.querySelector(w_wallSelector);
    BuildHTML();
});

function RandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function BuildHTML() {
    for (let i = 0; i < itemsNum; i++) {
        let newA = document.createElement("a");
        newA.innerHTML = "Verità";
        newA.style.fontFamily = fonts[RandomInt(0, fonts.length)];
        //newA.style.fontSize = RandomInt(50,70) + "px";
        container.appendChild(newA);
    }
    let chosen = container.children[RandomInt(0, container.childElementCount)];
    chosen.href = "http://matteopalazzolo.altervista.org/";
    chosen.classList.add("chosen");
}

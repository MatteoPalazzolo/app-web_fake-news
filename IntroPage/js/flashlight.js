/********* PARAMETERS *********/
const wallSelector = ".wall";
const torchRadius = 250;

/********* REFERENCES *********/
let wall = document.createElement("div");

/********* STATES *********/
let isTorchEnable = false;

/********* CODE *********/
window.addEventListener("load", () => {
    wall = document.querySelector(wallSelector);
});

window.addEventListener("scroll", e => {
    SetTorchlightPosition(GetMousePos(undefined));
});

window.addEventListener("mousemove", e => {
    SetTorchlightPosition(GetMousePos(e));
});

window.addEventListener("mousedown", e => {
    if (e.button === 2) isTorchEnable = !isTorchEnable;
    SetTorchlightPosition(GetMousePos(undefined));
});

function GetMousePos(e) {
    let mousePos;
    if (e) {
        mousePos = {x: e.pageX, y: e.pageY};
    }
    else {
        mousePos = {x: window.event.pageX, y: window.event.pageY};
    }
    return mousePos;
}

function SetTorchlightPosition(cursorPos) {
    let path;
    if (isTorchEnable) {
        path = "circle(" + torchRadius + "px at " + cursorPos.x + "px " + cursorPos.y + "px)";
        wall.style.filter = "opacity(100%)";
    }
    else {
        path = "";
        wall.style.filter = "opacity(0%)";
    }
    wall.style.clipPath = path;
}
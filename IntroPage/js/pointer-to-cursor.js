/********* PARAMETERS *********/
const pointerSelector = ".pointer";

/********* REFERENCES *********/
let pointer;

/********* STATES *********/
let cursorSize;

window.addEventListener("load", () => {
    pointer = document.querySelector(pointerSelector);
    console.log(pointer)
    
    cursorSize = {x: torchRadius*2 + 2, y: torchRadius*2 + 2}
    
    pointer.style.width = cursorSize.x + "px"
    pointer.style.height = cursorSize.y + "px"
});

window.addEventListener("mousemove", e => {
    let event = e ? e : window.event;
    p_SetPointerPosition(p_GetCursorPos(event));
});

function p_GetCursorPos(e) {
    let cursorPos = {x: e.pageX, y: e.pageY};

    cursorPos.x -= cursorSize.x/2;
    cursorPos.y -= cursorSize.y/2;
    return cursorPos;
}

function p_SetPointerPosition(cursorPos) {
    pointer.style.left = cursorPos.x + "px";
    pointer.style.top = cursorPos.y + "px";
}

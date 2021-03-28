/********* PARAMETERS *********/
const pointerSelector = ".tooltip-box";

/********* REFERENCES *********/
let pointer;

/********* STATES *********/
let cursorSize;
let clientSize;
let cursorOffset = {x: 25, y: 40};

window.addEventListener("load", () => {
    pointer = document.querySelector(pointerSelector);
    cursorSize = GetSize(pointer);
    bodySize = GetSize(document.body);
    clientSize = {x: document.documentElement.clientWidth, y: document.documentElement.clientHeight};
});

window.addEventListener("mousemove", e => {
    let event = e.clientY ? e : window.event;
    SetPointerPosition(GetCursorPos(event));
});

function GetCursorPos(e) {
    let cursorPos = {x: e.clientX, y: e.clientY};
    let newPos ={x: e.pageX, y: e.pageY};

    if (cursorPos.x < clientSize.x/2)
        newPos.x += cursorOffset.x;
    else
        newPos.x -= cursorSize.x + cursorOffset.x;

    if (cursorPos.y < clientSize.y/2)
        newPos.y += cursorOffset.y;
    else
        newPos.y -= cursorSize.y + cursorOffset.y;

    return newPos;
}

function SetPointerPosition(cursorPos) {
    pointer.style.left = cursorPos.x + "px";
    pointer.style.top = cursorPos.y + "px";
}

function GetSize(element) {
    let elementRect = element.getBoundingClientRect();
    return {x: elementRect.right - elementRect.left, y: elementRect.bottom - elementRect.top}
}

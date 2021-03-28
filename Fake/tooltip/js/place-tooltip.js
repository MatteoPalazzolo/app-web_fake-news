/********* PARAMETERS *********/
const pointerSelector = ".tooltip-box";

/********* REFERENCES *********/
let pointer;

/********* STATES *********/
let cursorSize;
let windowSize;
let cursorOffset = {x: 10, y: 10};

window.addEventListener("load", () => {
    pointer = document.querySelector(pointerSelector);
    cursorSize = GetSize(pointer);
    bodySize = GetSize(document.body);
    windowSize = {x: document.documentElement.clientWidth, y: document.documentElement.clientHeight};
    console.log(windowSize);
});

window.addEventListener("mousemove", e => {
    let event = e.clientY ? e : window.event;
    SetPointerPosition(GetCursorPos(event));
});

function GetCursorPos(e) {
    let cursorPos = {x: e.clientX, y: e.clientY};
    let newPos ={x: e.pageX, y: e.pageY};

    if (cursorPos.x < windowSize.x/2)
        newPos.x += cursorOffset.x;
    else
        newPos.x -= cursorSize.x + cursorOffset.x;

    if (cursorPos.y < windowSize.y/2)
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

/*
function CheckOutOfScreen(item) {
    let bounding = item.getBoundingClientRect();

	let out = {};
	out.top = bounding.top < 0;
	out.left = bounding.left < 0;
	out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
	out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
	out.any = out.top || out.left || out.bottom || out.right;
	out.all = out.top && out.left && out.bottom && out.right;

	return out;
}*/

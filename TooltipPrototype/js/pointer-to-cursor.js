/********* PARAMETERS *********/
const pointerSelector = ".tooltipBox";

/********* REFERENCES *********/
let pointer;

/********* STATES *********/
let cursorSize;
let cursorOffset = {x: -0, y: -0};

window.addEventListener("load", () => {
    pointer = document.querySelector(pointerSelector);
    let pointRect = pointer.getBoundingClientRect();
    cursorSize = {x: pointRect.right - pointRect.left, y: pointRect.bottom - pointRect.top};
});

window.addEventListener("mousemove", e => {
    let event = e ? e : window.event;
    SetPointerPosition(GetCursorPos(event));
});

function GetCursorPos(e) {
    let cursorPos = {x: e.pageX, y: e.pageY};
    /*
    cursorPos.x -= cursorSize.x/2;
    cursorPos.y -= cursorSize.y/2;*/
    cursorPos.x += cursorOffset.x;
    cursorPos.y += cursorOffset.y - cursorSize.y;
    return cursorPos;
}

function SetPointerPosition(cursorPos) {
    pointer.style.left = cursorPos.x + "px";
    pointer.style.top = cursorPos.y + "px";
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

	return out;
}

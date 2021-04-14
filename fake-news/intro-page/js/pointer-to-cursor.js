/********* PARAMETERS *********/
const pointerSelector = ".pointer";

/********* REFERENCES *********/
let pointer;

/********* STATES *********/
let cursorSize;
let currentPos;
let lastPos;
let checkPos = false;

window.addEventListener("load", () => {
    pointer = document.querySelector(pointerSelector);
    
    cursorSize = new Vector2(torchRadius*2 + 2, torchRadius*2 + 2);
    
    pointer.style.width = cursorSize.x + "px";
    pointer.style.height = cursorSize.y + "px";
});

window.addEventListener("mousemove", e => {
    let event = e ? e : window.event;
    p_SetPointerPosition(p_GetCursorPos(event));
});

setInterval(i => {
    checkPos = true;
}, 20);

window.addEventListener("mousemove", e => {
    let event = e ? e : window.event;
    if (checkPos) {
        lastPos = currentPos;
        currentPos = new Vector2(event.pageX, event.pageY);

        let speed = Vector2.Subtract(lastPos, currentPos).Magnitude();
        let blur = Mathf.Lerp( .5, 3, Mathf.EaseIn((Mathf.Clamp(speed,5,100)-5)/(100-5)) );
        wall.style.filter = "blur(" + blur + "px)";

        checkPos = false;
    }
});

function p_GetCursorPos(e) {
    let cursorPos = new Vector2(e.pageX, e.pageY);

    cursorPos.x -= cursorSize.x/2;
    cursorPos.y -= cursorSize.y/2;
    return cursorPos;
}

function p_SetPointerPosition(cursorPos) {
    pointer.style.left = cursorPos.x + "px";
    pointer.style.top = cursorPos.y + "px";
}
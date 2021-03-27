/********* PARAMETERS *********/
const f_wallSelector = ".wall";

/********* REFERENCES *********/
let wall;

/********* STATES *********/
let isTorchEnable = false;

/********* CODE *********/
window.addEventListener("load", () => {
    wall = document.querySelector(f_wallSelector);

    SetupEventListeners();
});

let touchtime = 0;
let delay = 400;
let action = null;
function SetupEventListeners() {    
    if (isMobile) {
        window.addEventListener("click", e => {
            torchRadius = mobile_torchRadius;

            /*Double Click */
            if ((new Date().getTime() - touchtime) < delay) {
                clearTimeout(action);

                isTorchEnable = !isTorchEnable;
                
                touchtime = 0;
            }
            /* Single Click */
            else {
                touchtime = new Date().getTime();
            
                action = setTimeout(() => {
                    //single click
                },  delay);
            }
            
            SetTorchlightPosition(GetMousePos(e));

        });

        window.addEventListener("touchmove", e => {
            console.log(e);
            SetTorchlightPosition(GetTouchMovePos(e));
        });
    }
    else {
        torchRadius = pc_torchRadius;

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
    }
}

function GetTouchMovePos(e) {
    let mousePos;
    if (e) {
        mousePos = {x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY};
    }
    else {
        mousePos = {x: window.event.changedTouches[0].clientX, y: window.event.changedTouches[0].clientY};
    }
    return mousePos;
}

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
        pointer.style.opacity = "100%";
        wall.style.opacity = "100%";
    }
    else {
        path = "";
        pointer.style.opacity = "0%";
        wall.style.opacity = "0%";
    }
    wall.style.clipPath = path;
}
/********* PARAMETERS *********/
const mobile_torchRadius = 100;
const mobile_itemsNum = 30;

const pc_torchRadius = 200;
const pc_itemsNum = 150;

let torchRadius;
let itemsNum;

/********* STATES *********/
let isMobile = false;

/********* CODE *********/
window.addEventListener("load", () => {
    isMobile = navigator.userAgent.toLowerCase().match(/mobile/i);

    if (isMobile) {
        torchRadius = mobile_torchRadius;
        itemsNum = mobile_itemsNum;
    }
    else {
        torchRadius = pc_torchRadius;
        itemsNum = pc_itemsNum;
    }
});
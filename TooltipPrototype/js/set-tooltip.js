/*********** PARAMETERS ***********/
const tooltipBoxSelector = ".tooltipBox";
const tooltipClass = "tooltip";

/*********** REFERNCES ***********/
let tooltipBox;

/*********** STATES ***********/
let target;
let tooltip;

/*********** CODE ***********/
window.addEventListener("load", () => {
    tooltipBox = document.querySelector(tooltipBoxSelector);
})

window.addEventListener("mousemove", e => {
    let event = e ? e : window.event;
    BuildTooltip(event);
    SetTooltip();
})

function BuildTooltip(event) {
    if (event.target.classList.contains(tooltipClass)) {
        target = event.target;
        tooltip = {text: target.dataset.description};
    }
    else {
        target = undefined;
        tooltip = undefined;
    }
    //DEBUG
    //tooltip = {text: "ciao"};
}

function SetTooltip() {
    if (tooltip) {
        tooltipBox.querySelector("p").innerHTML = tooltip.text;
        tooltipBox.style.opacity = "1";
    }
    else {
        tooltipBox.querySelector("p").innerHTML = "";
        tooltipBox.style.opacity = "0";
    }
}
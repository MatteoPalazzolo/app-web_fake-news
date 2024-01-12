/*********** PARAMETERS ***********/
const tooltipBoxSelector = ".tooltip-box";
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
        tooltip = {title: target.dataset.title, text: target.dataset.description};
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
        tooltipBox.querySelector("h2").innerHTML = tooltip.title;
        tooltipBox.querySelector("p").innerHTML = tooltip.text;
        tooltipBox.style.opacity = "1";
    }
    else {
        tooltipBox.querySelector("h2").innerHTML = "";
        tooltipBox.querySelector("p").innerHTML = "";
        tooltipBox.style.opacity = "0";
    }
}
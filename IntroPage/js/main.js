/****************** IMPORT SOUNDS ******************/
const music = {audio: new Audio("sound/fake-music.mp3"), playing: false};
music.audio.volume = .2;
music.audio.loop = true;

const wrong_SFX = {audio: new Audio("sound/wrong-violin.wav"), playing: false};
const right_SFX = {audio: new Audio("sound/right-violin.wav"), playing: false};
wrong_SFX.audio.volume = .2;
right_SFX.audio.volume = 1;

const torchOn_SFX = {audio: new Audio("sound/torch-on.wav"), playing: false};
const torchOff_SFX = {audio: new Audio("sound/torch-off.wav"), playing: false};
torchOn_SFX.audio.volume = .25;
torchOff_SFX.audio.volume = .25;

/********* PARAMETERS *********/
const mobile_torchRadius = 130;
const mobile_itemsNum = 30;

const pc_torchRadius = 300;
const pc_itemsNum = 200;

let torchRadius;
let itemsNum;

/********* STATES *********/
let isMobile = false;
let isTorchEnable = false;
let isStarted = false;

/********* REFERENCES *********/
let wall;
let bigText;
let texts;
let chars = [];

/********* CODE *********/
window.addEventListener("load", () => {
    wall = document.querySelector(".wall");
    bigText = document.querySelector(".big-text");
    texts = document.querySelectorAll(".big-text > div");
    for (let i = 0; i < texts.length; i++)
        chars.push(texts[i].querySelectorAll("span p"));
    Utility.Wait(9, _ => {
        Utility.Wait(.8, _ => {isTorchEnable = isStarted = true;});
    });

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
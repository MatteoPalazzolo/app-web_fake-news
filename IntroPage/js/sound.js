/****************** IMPORT SOUNDS ******************/
const music = {audio: new Audio("sound/music3.wav"), playing: false};
music.audio.volume = .3;
music.audio.loop = true;

const wrong_SFX = {audio: new Audio("sound/wrong-violin.wav"), playing: false};
const right_SFX = {audio: new Audio("sound/right-violin.wav"), playing: false};
wrong_SFX.audio.volume = .2;
right_SFX.audio.volume = 1;

const torchOn_SFX = {audio: new Audio("sound/torch-on.wav"), playing: false};
const torchOff_SFX = {audio: new Audio("sound/torch-off.wav"), playing: false};
torchOn_SFX.audio.volume = .25;
torchOff_SFX.audio.volume = .25;

/****************** STATES ******************/
window.addEventListener("click", e => PlayAudio(music, true));
window.addEventListener("mousedown", e => PlayAudio(music, true));

function PlayAudio(audio_obj, music=false) {
    if (!audio_obj.playing) {
        audio_obj.audio.play();
        audio_obj.playing = true;
    }
    else {
        if (!music) {
            audio_obj.audio.load();
            audio_obj.audio.play();
        }
    }
}
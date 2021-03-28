/****************** IMPORT SOUNDS ******************/
const music = {audio: new Audio("sound/music.mp3"), playing: false};
music.audio.volume = .1;

const wrong_SFX = {audio: new Audio("sound/wrong-violin.wav"), playing: false};
const right_SFX = {audio: new Audio("sound/right-violin.wav"), playing: false};
wrong_SFX.audio.volume = 1;
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
        if (music) audio_obj.audio.loop = true;
    }
    else {
        if (!music) {
            audio_obj.audio.load();
            audio_obj.audio.play();
        }
    }
}
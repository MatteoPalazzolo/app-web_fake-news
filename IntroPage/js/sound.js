/****************** STATES ******************/
window.addEventListener("click", e => {
    if (isStarted) PlayAudio(music, true);
});
window.addEventListener("mousedown", e => {
    if (isStarted) PlayAudio(music, true);
});

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
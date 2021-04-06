/********* PARAMETERS *********/
/* OLD
const fonts = [
    "'Dancing Script', cursive",
    "'Grenze Gotisch', cursive",
    "'Sevillana', cursive",
    "'Great Vibes', cursive"
];*/
const fonts = [
    "'New Tegomin', serif",
    "'Indie Flower', cursive",
    "'Caveat', cursive",
    "'Charm', cursive"
];

/********* STATES *********/
let level = 0;

/********* CODE *********/
window.addEventListener("load", () => {    
    BuildHTML();
    SetupLevel();
});

function RandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function PlayRightSFX() {
    PlayAudio(right_SFX);
}

function PlayWrongSFX() {
    PlayAudio(wrong_SFX);
}

function BuildHTML() {
    for (let i = 0; i < itemsNum; i++) {
        let newA = document.createElement("a");
        newA.innerHTML = "verità";
        newA.addEventListener("click", PlayWrongSFX);
        wall.appendChild(newA);
    }
}

function RefreshFonts() {
    Array.from(wall.children).forEach(a => {
        a.style.fontFamily = fonts[RandomInt(0, fonts.length)];
        a.style.color = Color.ColorLerp(new Color("#000"), new Color("#333"), Math.random());
    });
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

	return out.any;
}

const randomChosenList = [];
function ChooseItem() {
    let chosen;
    while (true) {
        chosen = wall.children[RandomInt(0, wall.childElementCount)];
        if (!CheckOutOfScreen(chosen) && !(randomChosenList.includes(chosen))) break;
    }
    randomChosenList.push(chosen);

    chosen.removeEventListener("click", PlayWrongSFX);
    chosen.addEventListener("click", PlayRightSFX);
    chosen.classList.add("chosen");

    return chosen;
}

function NextLevel() {
    level++;
    TorchOff();
    SetupLevel();
}

let selectionList = [];
let maxSelection = 0;

function SetupSelection(max) {
    if (selectionList.length > 0) console.error("last selection not resetted");
    maxSelection = max;
}

function ResetSelection() {
    for (let i = 0; i < selectionList.length; i++) {
        selectionList[i].classList.remove("selected");
    }
    selectionList = [];
}

function SelectItem(e) {
    let target = e.target;

    if (selectionList.includes(target)) return;

    selectionList.push(target);
    target.classList.add("selected");
    
    if (selectionList.length >= maxSelection) {
        NextLevel();
        return;
    }
   
}

let lastChosenList = [];
let chosenList = [];
function SetupLevel() {
    lastChosenList = chosenList.copyWithin();
    chosenList = [];
    for (let i = 0; i < lastChosenList.length; i++) {
        let item = lastChosenList[i];
        item.onclick = undefined;
        item.removeEventListener("click", PlayRightSFX);
        item.classList.remove("chosen");
        item.addEventListener("click", PlayWrongSFX);
    }

    if (level === 0) {
        chosenList.push(ChooseItem());
        chosenList[0].innerHTML = "VERITÀ";
        chosenList[0].onclick = NextLevel;
    }
    else if (level === 1) {
        TriggerWhiteText(1);

        chosenList.push(ChooseItem());
        chosenList[0].innerHTML = "VµR¿Tà";
        chosenList[0].onclick = NextLevel;
    }
    else if (level === 2) {
        TriggerWhiteText(1);

        chosenList.push(ChooseItem());
        chosenList[0].innerHTML = "©µ¶¿×à";
        chosenList[0].onclick = NextLevel;
    }
    else if (level === 3) {
        TriggerWhiteText(1);

        ResetSelection();
        SetupSelection(3);
        chosenList.push(ChooseItem());
        chosenList[0].innerHTML = "VeRità";
        chosenList[0].onclick = SelectItem;
        
        chosenList.push(ChooseItem());
        chosenList[1].innerHTML = "verItÀ";
        chosenList[1].onclick = SelectItem;
        
        chosenList.push(ChooseItem());
        chosenList[2].innerHTML = "vEriTà";
        chosenList[2].onclick = SelectItem;
    }
    else if (level === 4) {
        TriggerWhiteText(3);

        ResetSelection();
        SetupSelection(3);
        chosenList.push(ChooseItem());
        chosenList[0].innerHTML = "V¥¢µT¿";
        chosenList[0].onclick = SelectItem;
        
        chosenList.push(ChooseItem());
        chosenList[1].innerHTML = "µE¬I¿¥";
        chosenList[1].onclick = SelectItem;
        
        chosenList.push(ChooseItem());
        chosenList[2].innerHTML = "¥µRµ¿À";
        chosenList[2].onclick = SelectItem;
    }
    else {
        TriggerWhiteText(3);
        ResetSelection();

        chosenList.push(ChooseItem());
        chosenList[0].href = wall.dataset.href;
    }

    for (let i = 0; i < lastChosenList.length; i++) {
        lastChosenList[i].innerHTML = "verità";
    }
    
    RefreshFonts();
}

let startVolume = music.audio.volume;
let targetVolume = .15;
let accuracy = 10;
let fadeTime = 1;
function TriggerWhiteText(type=0) {
    SetupWhiteText(type);
    //disable torch
    isTorchEnable = false;

    //set visible
    bigText.style.opacity = "1";

    //fade-out audio
    Utility.DelayLoop(accuracy, fadeTime/accuracy, (i) => {
        music.audio.volume = Mathf.Lerp(startVolume, targetVolume, Mathf.EaseOut(i/accuracy));
    });

    if (type === 1) 
        Utility.DelayLoop(6, .5, i => {
            chars[1][i].parentElement.style.borderColor = "#0000";
        });
    else if (type === 3) {
        let verticalChars = [];
        for (let i = 0; i < 6; i++){ 
            let vertical = [];
            for (let j = 0; j < 3; j++)
                vertical.push(chars[j][i]);
            verticalChars.push(vertical);
        }

        Utility.DelayLoop(6, 1, i => {
            if ("VERITÀ"[i] === verticalChars[i][0].innerHTML)
                for (let j = 0; j < 3; j++) {
                    verticalChars[i][j].parentElement.style.transform = "translateY(190px)";
                }
            else if ("VERITÀ"[i] === verticalChars[i][1].innerHTML) 
                for (let j = 0; j < 3; j++) {
                    verticalChars[i][j].parentElement.style.transform = "translateY(0)";
                }
            else if ("VERITÀ"[i] === verticalChars[i][2].innerHTML)
                for (let j = 0; j < 3; j++) {
                    verticalChars[i][j].parentElement.style.transform = "translateY(-190px)";
                }
            else
                console.error("something went wrong!");
        });

        /*
        Utility.Wait(1, () => {
            const truth = "VERITÀ";
            for (let i = 0; i < 6; i++) {
                if (truth[i] === verticalChars[i][0].innerHTML)
                    for (let j = 0; j < 3; j++) {
                        verticalChars[i][j].parentElement.style.transform = "translateY(190px)";
                    }
                else if (truth[i] === verticalChars[i][1].innerHTML) 
                    for (let j = 0; j < 3; j++) {
                        verticalChars[i][j].parentElement.style.transform = "translateY(0)";
                    }
                else if (truth[i] === verticalChars[i][2].innerHTML)
                    for (let j = 0; j < 3; j++) {
                        verticalChars[i][j].parentElement.style.transform = "translateY(-190px)";
                    }
                else
                    console.error("something went wrong!");
            }
        });*/
    }
    let wait = (type === 1) ? 4 : 7; 
    Utility.Wait(wait, () => {
        //set invisible
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 6; j++) {
                chars[i][j].parentElement.style.borderColor = "#fff";
            }
        }
        Utility.Wait(1, () => {bigText.style.opacity = "0";});
        
        //fade-in audio
        Utility.DelayLoop(accuracy, fadeTime/accuracy, (i) => {
            music.audio.volume = Mathf.Lerp(targetVolume, startVolume, Mathf.EaseIn(i/accuracy, 5));
        });

        //enable torch
        Utility.Wait(1.8, () => { isTorchEnable = true; });
    });
}

function SetupWhiteText(type=0) {
    if (type === 1) {
        texts[0].style.opacity = "0";
        texts[1].style.fontFamily = lastChosenList[0].style.fontFamily;
        texts[2].style.opacity = "0";

        for (let i = 0; i < 6; i++) {
            chars[1][i].innerHTML = lastChosenList[0].innerHTML[i];
        }
    }
    else if (type === 3) {
        //set visible
        texts[0].style.opacity = "1";
        texts[2].style.opacity = "1";

        //set font
        for (let i = 0; i < texts.length; i++) {
            texts[i].style.fontFamily = selectionList[i].style.fontFamily;
        }

        //set text
        for (let i = 0; i < texts.length; i++) {
            for (let j = 0; j < 6; j++) {
                chars[i][j].innerHTML = selectionList[i].innerHTML[j];
            }
        }
    }
    else console.error("unknown type");
}
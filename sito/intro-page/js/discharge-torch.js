//torchCharge
//dischargeSpeed

window.addEventListener("load", () => {
    setInterval(i => {
        if (!isTorchOn) return;
        if (torchCharge > 0) {torchCharge -= dischargeSpeed * .1; DischargeTorch();}
        if (torchCharge <= 0) {
            TorchOff();
            Utility.Wait(1, ()=>{ window.location.href = target_href; });
            /*
            SetupLevel();
            torchCharge = 100;
            */
        }
    }, .1 * 1000);
});

function DischargeTorch() {
    let stopColor = "#000000" + Color.TwoDigits(Math.round(255 * (1 - torchCharge / 100)).toString(16));
    let off1 = torchCharge - 25;
    let off2 = torchCharge;
    SetOffset(off1, 100, stopColor);
}

function SetOffset(off1=75, off2=100, color1="#fff0") {
    torch_gradients[0].setAttribute("offset", off1+"%");
    torch_gradients[1].setAttribute("offset", off2+"%");
    torch_gradients[0].setAttribute("stop-color", color1);
}

const N = document.getElementById('N');
const Lambda = document.getElementById("lambda");
const A = document.getElementById("a");
const B = document.getElementById("b");
const I = document.getElementById("I");
let L = document.getElementById("L");
const Grad = document.getElementById("grad");
const displayWidth = 3;


function sin(fi) {
    return Math.sin(Math.PI*fi/180)
}

function tg(fi) {
    return Math.tan(Math.PI*fi/180)
}

function wavelengthToColor(wavelength, alpha) {
    let R,
        G,
        B,
        wl = wavelength;

    if (wl >= 380 && wl < 440) {
        R = -1 * (wl - 440) / (440 - 380);
        G = 0;
        B = 1;
    } else if (wl >= 440 && wl < 490) {
        R = 0;
        G = (wl - 440) / (490 - 440);
        B = 1;
    } else if (wl >= 490 && wl < 510) {
        R = 0;
        G = 1;
        B = -1 * (wl - 510) / (510 - 490);
    } else if (wl >= 510 && wl < 580) {
        R = (wl - 510) / (580 - 510);
        G = 1;
        B = 0;
    } else if (wl >= 580 && wl < 645) {
        R = 1;
        G = -1 * (wl - 645) / (645 - 580);
        B = 0.0;
    } else if (wl >= 645 && wl <= 780) {
        R = 1;
        G = 0;
        B = 0;
    } else {
        R = 0;
        G = 0;
        B = 0;
    }
    if (alpha > 1) alpha = 1;
    return `rgba(${R*255}, ${G*255}, ${B*255}, ${alpha})`;
}
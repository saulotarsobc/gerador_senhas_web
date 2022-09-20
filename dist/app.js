"use strict";
const size = document.querySelector("#input_size");
const pass = document.querySelector("#pass");
const input_size = document.querySelector("#input_size");
const upper = document.querySelector("#upper");
const lower = document.querySelector("#lower");
const number = document.querySelector("#number");
const special = document.querySelector("#special");
const gerar = document.querySelector("#gerar");
const security_level_bar = document.querySelector("#security_level_bar");
const MORE_LIMIT = 24;
const LESS_LIMIT = 8;
const INTERVAL = 22;
function playKeySound() {
    let key_sound = new Audio('./sounds/key_sound.wav');
    key_sound.play();
}
function copyPass() {
    navigator.clipboard.writeText(pass.innerHTML);
    alert("Senha copiada: " + (pass.innerHTML));
}
function getUpper() {
    const upper = "ABCDEFGHIJCLMNOPQRSTUVXYZ";
    return upper[Math.floor(Math.random() * upper.length)];
}
function getLower() {
    const lower = "abcdefghijklmnopqrstuvxyz";
    return lower[Math.floor(Math.random() * lower.length)];
}
function getNumber() {
    const number = "1234567890";
    return number[Math.floor(Math.random() * number.length)];
}
function getSpecial() {
    const special = "!@#$%<>&*()_+{}[]";
    return special[Math.floor(Math.random() * special.length)];
}
function updateSize(val) {
    input_size.value = val;
}
function cleanPass() {
    pass.innerHTML = '';
}
function changeSize(action) {
    const currentSize = parseInt(size.value);
    if (action == "more") {
        if (currentSize < MORE_LIMIT) {
            updateSize(currentSize + 1);
        }
    }
    else {
        if (currentSize > LESS_LIMIT) {
            updateSize(currentSize - 1);
        }
    }
}
function isChecked() {
    if (upper.checked ||
        lower.checked ||
        number.checked ||
        special.checked) {
        return true;
    }
    else {
        return false;
    }
}
function shuffleArray(newPass) {
    return newPass.sort(() => Math.random() - 0.5);
}
function showPass(newPass) {
    cleanPass();
    shuffleArray(newPass).forEach((el, i) => {
        setTimeout(() => { pass.innerHTML += el; }, (INTERVAL * i));
    });
}
function getPass() {
    let count = 0;
    cleanPass();
    let newPass = [];
    if (isChecked()) {
        while (count < parseInt(size.value)) {
            if (upper.checked && (count < parseInt(size.value))) {
                newPass.push(getUpper());
                count++;
            }
            if (lower.checked && (count < parseInt(size.value))) {
                newPass.push(getLower());
                count++;
            }
            if (number.checked && (count < parseInt(size.value))) {
                newPass.push(getNumber());
                count++;
            }
            if (special.checked && (count < parseInt(size.value))) {
                newPass.push(getSpecial());
                count++;
            }
        }
        showPass(newPass);
        updateSecurityLevel();
    }
    else {
        upper.checked = true;
        getPass();
    }
}
function updateSecurityLevel() {
    let security_level = 12 + (parseInt(input_size.value) * 2);
    security_level_bar.style.background = "#ff4d4d";
    if (upper.checked) {
        security_level = security_level + 11;
    }
    if (lower.checked) {
        security_level = security_level + 11;
    }
    if (number.checked) {
        security_level = security_level + 11;
    }
    if (special.checked) {
        security_level = security_level + 11;
    }
    if ((upper.checked == false) &&
        (lower.checked == false) &&
        (number.checked == true) &&
        (special.checked == false) &&
        (parseInt(input_size.value) < 12)) {
        security_level = 10 + parseInt(input_size.value);
        console.log('aki');
    }
    if (security_level >= 40) {
        security_level_bar.style.background = "#ff933b";
    }
    if (security_level >= 51) {
        security_level_bar.style.background = "#edff4f";
    }
    if (security_level >= 88) {
        security_level_bar.style.background = "#4fff5e";
        security_level = 100;
    }
    console.log(security_level);
    security_level_bar.style.width = security_level + "%";
}
updateSecurityLevel();
updateSize(LESS_LIMIT);

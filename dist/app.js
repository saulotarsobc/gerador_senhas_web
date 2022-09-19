"use strict";
let size = document.querySelector("#input_size");
let pass = document.querySelector("#pass");
let input_size = document.querySelector("#input_size");
const upper = document.querySelector("#upper");
const lower = document.querySelector("#lower");
const number = document.querySelector("#number");
const special = document.querySelector("#special");
const gerar = document.querySelector("#gerar");
let MORE_LIMIT = 24;
let LESS_LIMIT = 8;
let INTERVAL = 20;
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
    let currentSize = parseInt(size.value);
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
        setTimeout(() => {
            pass.innerHTML += el;
        }, (INTERVAL * i));
    });
}
function getPass() {
    let count = 0;
    cleanPass();
    gerar.disabled = true;
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
        gerar.disabled = false;
    }
    else {
        upper.checked = true;
        getPass();
    }
}
updateSize(LESS_LIMIT);

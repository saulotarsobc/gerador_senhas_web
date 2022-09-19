"use strict";
var size = document.querySelector("#input_size");
var pass = document.querySelector("#pass");
var input_size = document.querySelector("#input_size");
var upper = document.querySelector("#upper");
var lower = document.querySelector("#lower");
var number = document.querySelector("#number");
var special = document.querySelector("#special");
var MORE_LIMIT = 24;
var LESS_LIMIT = 8;
var INTERVAL = 100;
function playKeySound() {
    var key_sound = new Audio('./sounds/key_sound.wav');
    key_sound.play();
    key_sound.remove;
}
function copyPass() {
    playKeySound();
    navigator.clipboard.writeText(pass.innerHTML);
    alert("Senha copiada: " + (pass.innerHTML));
}
;
function getUpper() {
    var upper = "ABCDEFGHIJCLMNOPQRSTUVXYZ";
    return upper[Math.floor(Math.random() * upper.length)];
}
;
function getLower() {
    var lower = "abcdefghijklmnopqrstuvxyz";
    return lower[Math.floor(Math.random() * lower.length)];
}
;
function getNumber() {
    var number = "1234567890";
    return number[Math.floor(Math.random() * number.length)];
}
;
function getSpecial() {
    var special = "!@#$%<>&*()_+{}[]";
    return special[Math.floor(Math.random() * special.length)];
}
function updateSize(val) {
    input_size.value = val;
}
;
function cleanPass() {
    pass.innerHTML = '';
}
;
function changeSize(action) {
    playKeySound();
    var atualSize = parseInt(size.value);
    if (action == "more") {
        if (atualSize < MORE_LIMIT) {
            updateSize(atualSize + 1);
        }
    }
    else {
        if (atualSize > LESS_LIMIT) {
            updateSize(atualSize - 1);
        }
    }
}
;
function isChecked() {
    if ((upper.checked) || (lower.checked) || (number.checked) || (special.checked)) {
        return true;
    }
    else {
        return false;
    }
}
;
function shuffleArray(newPass) {
    return newPass.sort(function () { return Math.random() - 0.5; });
}
;
function showPass(newPass) {
    cleanPass();
    shuffleArray(newPass).forEach(function (el, i) {
        setTimeout(function () {
            playKeySound();
            pass.innerHTML += el;
        }, (INTERVAL * i));
    });
}
;
function getPass() {
    // playKeySound();
    var count = 0;
    cleanPass();
    var newPass = [];
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
    }
    else {
        upper.checked = true;
        number.checked = true;
        getPass();
    }
}
;
updateSize(LESS_LIMIT);
// getPass();

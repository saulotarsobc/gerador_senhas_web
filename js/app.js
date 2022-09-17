const size = document.querySelector("#input_size");
const pass = document.querySelector("#pass");
const input_size = document.querySelector("#input_size");

const upper = document.querySelector("#upper");
const lower = document.querySelector("#lower");
const number = document.querySelector("#number");
const special = document.querySelector("#special");

const MORE_LIMIT = 22;
const LESS_LIMIT = 8;

function copyPass() {
    pass.select();
    pass.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(pass.value);
    alert("Senha copiada: " + pass.value);
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
    const special = "!@#$%¨&*()_+{}[]";
    return special[Math.floor(Math.random() * special.length)];
}

function updateSize(val) {
    input_size.value = val;
}

function showPass(newPass) {
    pass.value = newPass;
}

function changeSize(action) {
    let atualSize = parseInt(size.value);

    if (action == "more") {
        if (atualSize < MORE_LIMIT) {
            updateSize(atualSize + 1);
        }
    } else {
        if (atualSize > LESS_LIMIT) {
            updateSize(atualSize - 1);
        }
    }
}

function getPass() {
    let count = 0;
    let newPass = "";

    while (count < parseInt(size.value)) {
        if (upper.checked){
            newPass += getUpper();
            count++;
        }

        if (lower.checked){
            newPass += getLower();
            count++;
        }

        if (number.checked){
            newPass += getNumber();
            count++;
        }

        if (special.checked){
            newPass += getSpecial();
            count++;
        }
    }

    showPass(newPass)
}


updateSize(8);
getPass();
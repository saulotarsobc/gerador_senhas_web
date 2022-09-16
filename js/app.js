const size = document.querySelector("#input_size");
const pass = document.querySelector("#pass");
const input_size = document.querySelector("#input_size");
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

function getLow() {
    const low = "abcdefghijklmnopqrstuvxyz";
    return low[Math.floor(Math.random() * low.length)];
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

    console.log(atualSize);
}

function getPass() {
    let count = 0;
    let newPass = "";

    while (count < parseInt(size.value)) {
        newPass += getUpper();
        count++;
    }

    showPass(newPass)
}

getPass();
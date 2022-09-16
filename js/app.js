const size = document.querySelector("#input_size");
const pass = document.querySelector("#pass");

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

function cleanpass() {
    pass.value = "";
}

function showPass(val) {
    cleanpass();
    pass.value = val;
}


function getPass() {
    let count = 0;
    let newPass = "";

    while (count < parseInt(size.value)) {
        newPass += getUpper();
        count++
    }

    showPass(newPass)
}

getPass();
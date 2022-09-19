const size = document.querySelector("#input_size");
const pass = document.querySelector("#pass");
const input_size = document.querySelector("#input_size");

const upper = document.querySelector("#upper");
const lower = document.querySelector("#lower");
const number = document.querySelector("#number");
const special = document.querySelector("#special");

const MORE_LIMIT = 24;
const LESS_LIMIT = 8;
const INTERVAL = 38;

function copyPass() {
    navigator.clipboard.writeText(pass.innerHTML);
    alert("Senha copiada: " + (pass.innerHTML));
};

function getUpper() {
    const upper = "ABCDEFGHIJCLMNOPQRSTUVXYZ";
    return upper[Math.floor(Math.random() * upper.length)];
};

function getLower() {
    const lower = "abcdefghijklmnopqrstuvxyz";
    return lower[Math.floor(Math.random() * lower.length)];
};

function getNumber() {
    const number = "1234567890";
    return number[Math.floor(Math.random() * number.length)];
};

function getSpecial() {
    const special = "!@#$%<>&*()_+{}[]";
    return special[Math.floor(Math.random() * special.length)];
}

function updateSize(val) {
    input_size.value = val;
};

function cleanPass() {
    pass.innerHTML = '';
};

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
};

function isChecked() {
    if ((upper.checked) || (lower.checked) || (number.checked) || (special.checked)) {
        return true;
    } else {
        return false;
    }
};

function shuffleArray(newPassObj) {
    return newPassObj.sort(() => Math.random() - 0.5);
};

function showPass(newPassObj) {
    cleanPass();
    shuffleArray(newPassObj).forEach((el, i) => {
        setTimeout(() => {
            console.log(el);
            pass.innerHTML += el;
        }, (INTERVAL * i))
    });
};

function getPass() {
    let count = 0;
    cleanPass();

    let newPassObj = [];

    if (isChecked()) {

        while (count < parseInt(size.value)) {
            if (upper.checked && (count < parseInt(size.value))) {
                newPassObj.push(getUpper());
                count++;
            }

            if (lower.checked && (count < parseInt(size.value))) {
                newPassObj.push(getLower());
                count++;
            }

            if (number.checked && (count < parseInt(size.value))) {
                newPassObj.push(getNumber());
                count++;
            }

            if (special.checked && (count < parseInt(size.value))) {
                newPassObj.push(getSpecial());
                count++;
            }
        }

        showPass(newPassObj);

    } else {
        upper.checked = true;
        number.checked = true;
        getPass();
    }
};

updateSize(LESS_LIMIT);
getPass();
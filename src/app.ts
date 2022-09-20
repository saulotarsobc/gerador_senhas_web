const size = document.querySelector("#input_size") as HTMLInputElement;
const pass = document.querySelector("#pass") as HTMLParagraphElement;
const input_size = document.querySelector("#input_size") as HTMLInputElement;

const upper = document.querySelector("#upper") as HTMLInputElement;
const lower = document.querySelector("#lower") as HTMLInputElement;
const number = document.querySelector("#number") as HTMLInputElement;
const special = document.querySelector("#special") as HTMLInputElement;
const gerar = document.querySelector("#gerar") as HTMLInputElement;

const MORE_LIMIT: number = 24;
const LESS_LIMIT: number = 8;
const INTERVAL: number = 22;

function playKeySound() {
    let key_sound = new Audio('./sounds/key_sound.wav');
    key_sound.play();
}

function copyPass() {
    navigator.clipboard.writeText(pass.innerHTML);
    alert("Senha copiada: " + (pass.innerHTML));
}

function getUpper(): string {
    const upper: string = "ABCDEFGHIJCLMNOPQRSTUVXYZ";
    return upper[Math.floor(Math.random() * upper.length)];
}

function getLower(): string {
    const lower: string = "abcdefghijklmnopqrstuvxyz";
    return lower[Math.floor(Math.random() * lower.length)];
}

function getNumber(): string {
    const number: string = "1234567890";
    return number[Math.floor(Math.random() * number.length)];
}

function getSpecial(): string {
    const special: string = "!@#$%<>&*()_+{}[]";
    return special[Math.floor(Math.random() * special.length)];
}

function updateSize(val: any) {
    input_size.value = val;
}

function cleanPass() {
    pass.innerHTML = '';
}

function changeSize(action: any) {
    const currentSize = parseInt(size.value);

    if (action == "more") {
        if (currentSize < MORE_LIMIT) {
            updateSize(currentSize + 1);
        }
    } else {
        if (currentSize > LESS_LIMIT) {
            updateSize(currentSize - 1);
        }
    }
}

function isChecked() {
    if (
        upper.checked ||
        lower.checked ||
        number.checked ||
        special.checked
    ) {
        return true;
    } else {
        return false;
    }
}

function shuffleArray(newPass: any) {
    return newPass.sort(() => Math.random() - 0.5);
}

function showPass(newPass: any) {
    cleanPass();
    shuffleArray(newPass).forEach((el: string, i: number) => {
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

    } else {
        upper.checked = true;
        getPass();
    }
}

updateSize(LESS_LIMIT);
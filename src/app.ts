const pass = document.querySelector("#pass") as HTMLParagraphElement;

const size = document.querySelector("#size") as HTMLInputElement;
let security_level = 12 + (parseInt(size.value) * 2);

const more = document.querySelector("#more") as HTMLInputElement;
const less = document.querySelector("#less") as HTMLInputElement;

const upper = document.querySelector("#upper") as HTMLInputElement;
const lower = document.querySelector("#lower") as HTMLInputElement;
const number = document.querySelector("#number") as HTMLInputElement;
const special = document.querySelector("#special") as HTMLInputElement;
const gerar = document.querySelector("#gerar") as HTMLInputElement;
const copiar = document.querySelector("#copiar") as HTMLInputElement;
const security_level_bar = document.querySelector("#security_level_bar") as HTMLInputElement;

const MORE_LIMIT: number = 24;
const LESS_LIMIT: number = 8;
const INTERVAL: number = 22;

function tableValues() {
    console.table({
        'senha': pass.innerHTML,
        'caracteres': parseInt(size.value),
        'maiusculo': upper.checked,
        'minusculos': lower.checked,
        'numeros': number.checked,
        'especiais': special.checked,
    });
}

function keyboardShortcut(event: KeyboardEvent) {
    if (event.code == 'ArrowUp') {
        more.click();
    };
    if (event.code == 'ArrowDown') {
        less.click();
    };
    if (event.code == 'KeyM') {
        upper.click();
    };
    if (event.code == 'KeyI') {
        lower.click();
    };
    if (event.code == 'KeyN') {
        number.click();
    };
    if (event.code == 'KeyE') {
        special.click();
    };
    if (event.code == 'Space') {
        gerar.click();
    };
    if (event.code == 'KeyC') {
        copiar.click();
    };
}

document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.code != 'F12') {
        event.preventDefault();
        keyboardShortcut(event);
    }
})

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
    size.value = val;
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
    setTimeout(() => {
        tableValues();
    }, 1000);
}

function updateSecurityLevel() {
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

    if (
        (upper.checked == false) &&
        (lower.checked == false) &&
        (number.checked == true) &&
        (special.checked == false) &&
        (parseInt(size.value) < 12)
    ) {
        security_level = 10 + parseInt(size.value);
        console.log('aki')
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

    security_level_bar.style.width = security_level + "%";
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

    } else {
        upper.checked = true;
        lower.checked = true;
        getPass();
    }
}

updateSize(LESS_LIMIT);
updateSecurityLevel();

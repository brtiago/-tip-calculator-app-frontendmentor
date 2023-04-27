const inputBill = document.querySelector("#bill-input");
const inputNumberOfPeople = document.querySelector("#number-of-people");
const buttonTip = document.querySelector(".btn-tip");
const inputCustomTip = document.querySelector(".btn-custom-tip");
const outputTipAmount = document.querySelector("#tip-person");
const outputTotalPerson = document.querySelector("#total-person");
const buttonReset = document.querySelector("#btn-reset");
const errZero = document.querySelector(".err-zero");
const buttons = document.querySelectorAll(".btn-tip");


let tip = 0.0;
let bill = 0.0;
let people = 1;


inputBill.addEventListener('input', (e) => {
    bill = parseFloat(e.target.value);
    buttonReset.style.background = 'var(--color-strong-cyan)';
    updateTipAndTotal();    
});


buttons.forEach(function (val) {
    val.addEventListener('click', handleClick)
});

function handleClick(e) {
    buttons.forEach(function (val) {
        val.classList.remove("btn-tip-active");
        if (e.target.innerHTML === val.innerHTML) {
            val.classList.add("btn-tip-active");
            tip = parseFloat(val.innerHTML);
        }
    });
    console.log(tip);
    updateTipAndTotal();
}

inputCustomTip.addEventListener('input', (e) => {
    if (e.target.value === "") {
        tip = 0.0;
    } else {
        tip = parseFloat(e.target.value);
    }
    buttons.forEach(function (val) {
        val.classList.remove("btn-tip-active");
    });
    if (checkForValid(bill, people)) {
        let tipCalculated = calculateTip(bill, tip, people);
        setTipAmount(tipCalculated);
        setTotalPerson(totalAmount(bill, tipCalculated, people));
    }
});

inputNumberOfPeople.addEventListener('input', (e) => {
    people = parseInt(e.target.value);
    buttonReset.style.background = 'var(--color-strong-cyan)';
    updateTipAndTotal();

    if (people <= 0) {
        errZero.removeAttribute("hidden");
    } else {
        errZero.setAttribute("hidden", "");
    }
});

function calculateTip(billValue, tip, peopleQuantity) {
    let tipAmount = (billValue * (tip / 100)) / peopleQuantity;
    return parseFloat(Math.floor(tipAmount * 100) / 100);
    console.log('>[calculateTip] Done!');
}

function totalAmount(billValue, tipCalculated, people) {
    return parseFloat((billValue / people) + tipCalculated);
}

function checkForValid(bill, numPeople) {
    if ( isNaN(numPeople) || isNaN(bill) || bill <= 0 || numPeople <= 0) {
        outputTipAmount.textContent = '-';
        outputTotalPerson.textContent = '-';
        return false;
    }
    return true;
}

function setTipAmount(valueTip) {
    outputTipAmount.textContent = valueTip.toFixed(2);
}

function setTotalPerson(ppl) {
    outputTotalPerson.textContent = ppl.toFixed(2);
}

function resetValues() {
    outputTipAmount.textContent = '$0.00';
    outputTotalPerson.textContent = '$0.00';
    buttons.forEach(function (val) { val.classList.remove("btn-tip-active"); });
    inputCustomTip.value = '';
    buttonReset.style.background = 'var(--color-light-cyan)';
    buttonReset.style.color = 'var(--color-very-dark-cyan)';
    errZero.setAttribute('hidden', '');
    people = 1;
    tip = 0;
    bill = 0;
};

buttonReset.addEventListener('click', () => {
    console.log('>[Reset] Starting...');
    resetValues();
    console.log('>[Reset] Done!');
});

function updateTipAndTotal() {
    let tipCalculated = calculateTip(bill, tip, people);
    console.log(tipCalculated);
    console.log("Total Amount " + totalAmount(bill, tipCalculated, people));
    let totalPerson = totalAmount(bill, tipCalculated, people);

    if (checkForValid(bill, people)) {
        setTipAmount(tipCalculated);
        setTotalPerson(totalPerson);
    }
}
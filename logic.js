const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies"
const exchangebtn = document.querySelector("#getExchange");
const outputMessage = document.querySelector(".outputMessage");
const inpObj = document.querySelector("#amountInput");

const msgcontainer = document.querySelector(".exchange");
const msg = document.createElement('p');
msg.style.fontSize = "0.8rem";
msg.style.paddingTop = "0.2rem";

function validateInput() {
    const message = document.querySelector(".inputcheckmessage");
    if (!inpObj.checkValidity()) {
        message.innerHTML = inpObj.validationMessage;
        message.style.color = "red";
        outputMessage.style.visibility = "hidden";
        msg.style.visibility = "hidden";
        inpObj.style.border = " 0.7px solid red";
        inpObj.focus();
    } else {
        message.innerHTML = "";
        message.style.color = "";
        outputMessage.style.visibility = "";
        msg.style.visibility = "";
        inpObj.style.border = "";
    }
}

exchangebtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    validateInput();
    calculateExchangeRage();
})

const dropdownSelects = document.querySelectorAll(".dropdowns select");
for (let select of dropdownSelects) {
    for (code in countryList) {
        const newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        select.append(newOption);

        if (newOption.value === "USD" && select.id === "fromselect") {
            newOption.selected = true;
        } else if (newOption.value === "INR" && select.id === "toselect") {
            newOption.selected = true;
        }
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
    calculateExchangeRage();
}

const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let imgElement = element.parentElement.querySelector("img");
    imgElement.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

async function calculateExchangeRage() {
    let from = document.querySelector("#fromselect").value;
    let to = document.querySelector("#toselect").value;
    const apiURL = `${BASE_URL}/${from.toLowerCase()}.json`;
    let conversion = await fetch(apiURL);
    let result = await conversion.json();
    let finalresult = result[from.toLowerCase()][to.toLowerCase()]
    outputMessage.innerHTML = `${inpObj.value} ${from} = ${inpObj.value * finalresult} ${to}`;
    msg.innerHTML = `Exchange rates are as of ${result.date}`;
    msgcontainer.appendChild(msg);
}

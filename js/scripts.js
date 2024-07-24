const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");
const nameInput = document.querySelector("#name")
const foneInput = document.querySelector("#fone")
const emailInput = document.querySelector("#e-mail")
const closeButton = document.querySelector("#close-message");

// Validate name

nameInput.addEventListener('keydown', function(event) {
    // Allow control keys like backspace, delete, arrow keys, etc.
    const controlKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete', 'Tab'];
    
    // Allow letters (A-Z and a-z) and space
    if (!controlKeys.includes(event.key) && !event.key.match(/^[a-zA-Z\s]$/)) {
        event.preventDefault();
    }
});

// Validate cell phone

function validatePhone() {
    const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/;
    
    if (!phonePattern.test(foneInput.value)) {
        foneInput.setCustomValidity('Use (XX) XXXXX-XXXX');
    } else {
        foneInput.setCustomValidity('');
    }
    
    foneInput.reportValidity();
}

function formatPhone() {
    let value = foneInput.value.replace(/\D/g, ''); // Remove all non-digit characters
    if (value.length > 0) {
        value = '(' + value;
    }
    if (value.length > 3) {
        value = value.slice(0, 3) + ') ' + value.slice(3);
    }
    if (value.length > 10) {
        value = value.slice(0, 10) + '-' + value.slice(10);
    }
    if (value.length > 15) {
        value = value.slice(0, 15); // Ensure the value doesn't exceed the maximum length
    }
    foneInput.value = value;
}

foneInput.addEventListener('input', formatPhone);
foneInput.addEventListener('blur', validatePhone);
foneInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        validatePhone();
    }
});

// Validate e-mail

function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(emailInput.value)) {
        emailInput.setCustomValidity('E-mail invalido');
    } else {
        emailInput.setCustomValidity('');
    }
    
    emailInput.reportValidity();
}

emailInput.addEventListener('blur', validateEmail);
emailInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        validateEmail();
    }
});

// Validate CEP input
cepInput.addEventListener("keypress", (e) => {

    const onlyNumbers = /[0-9]|\./;
    const key = String.fromCharCode(e.keyCode);

   // allow oly numbers
   if(!onlyNumbers.test(key)) {
    e.preventDefault();
    return;
   } 

});

// Get addres event
cepInput.addEventListener("keyup", (e) => {

    const inputValue = e.target.value; 
    
    // Check if we have the correct length
    if(inputValue.length === 8) {
        getAddress(inputValue);

    }
});

// Get customer address from API
const getAddress = async (cep) => {
    toggleLoader();
    cepInput.blur();
    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

         // Show error and reset form
        if(data.erro === "true") {
            if (!addressInput.hasAttribute("disable")) {
                toggleDisabled();
            }
            addressForm.reset();
            toggleLoader();
            toggleMessage("CEP invalido");
            return;
        }

        if (addressInput.value === "") {
            toggleDisabled();
        }

        addressInput.value = data.logradouro
        cityInput.value = data.localidade
        neighborhoodInput.value = data.bairro
        regionInput.value = data.uf

        toggleLoader();
         
    } catch (error) {
        toggleLoader();
        toggleMessage("Erro ao buscar endereço");
    }  
};

// Add or remove disable attribute

const toggleDisabled = () => {

    if(regionInput.hasAttribute("disabled")) {
        formInputs.forEach((input) => {
            input.removeAttribute("disabled");
        });
    } else {
        formInputs.forEach((input) => {
            input.setAttribute("disabled", "disabled");       
        });
    }
}

// Show or hide loader
const toggleLoader = () => {
    
    const fadeElement = document.querySelector("#fade");
    const loaderElement = document.querySelector("#loader");

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");

};


// Show or hide message
const toggleMessage = (msg) => {
    const fadeElement = document.querySelector('#fade');
    const messageElement = document.querySelector("#message");
    const messageElementText = document.querySelector("#message p");

    messageElementText.innerText = msg;

    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide");
};

// Close message modal
closeButton.addEventListener("click", () => toggleMessage());


// Save address
addressForm.addEventListener("submit", (e) => {

    e.preventDefault();
    toggleLoader();

    setTimeout(() => {

        toggleLoader();

        toggleMessage("Salvo com sucesso");

        addressForm.reset();

        toggleDisabled();
    }, 1000);
});



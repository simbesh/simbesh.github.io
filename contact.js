window.onload = function () {
    registerListeners()
};

function storeIP(json) {
    console.log("My public IP address is: ", json.geobytesipaddress);
  }

const registerListeners = () => {
    document.getElementById("submit-button").addEventListener("click", async function (event) {
        event.preventDefault()
        document.getElementById("submit-button").setAttribute('disabled', '');
        let errors = false
        let errorMessage = ""
        const options = `&parse_mode=HTML&disable_web_page_preview=true`
        const fname = document.getElementById("fname").value.trim()
        errorMessage = checkRequired(fname, "First Name");
        if (errorMessage) {
            displayError(errorMessage);
            return;
        }
        const lname = document.getElementById("lname").value.trim()
        const email = document.getElementById("email").value.trim()
        errorMessage = validateEmail(email)
        if (errorMessage) {
            displayError(errorMessage);
            return;
        }
        const message = document.getElementById("message").value.trim()
        errorMessage = checkRequired(message, "Message");
        if (errorMessage) {
            displayError(errorMessage);
            return;
        }
        const ip = localStorage.getItem('clientIp') || "could not retrieve"
        const text = encodeURIComponent(`Contact from bechard.dev!
First Name:      ${fname}
Last Name:      ${lname}
Email:                ${email}
Message:
${message}
IP: ${ip}
<a href="https://tools.keycdn.com/geo?host=${ip}">Geolocation info</a>`)

        const url = `https://api.telegram.org/bot816925224:AAGkot8xPR1aMOSg8Xowpj_DUjK_A-B9HKU/sendMessage?chat_id=386572077&text=${text}${options}`
        const res = await fetch(url)
        console.log('response :', res)
        if (res.status >= 200 && res.status < 300){
            document.getElementById("contact-container").classList.add('d-none')
            document.getElementById("contact-success").classList.remove('d-none')
        } else {
            document.getElementById("contact-container").classList.add('d-none')
            const errorCard = document.getElementById("contact-error")
            errorCard.classList.remove('d-none')
            const p = document.createElement('p')
            const text = document.createTextNode(`Error Code: ${res.status} - ${res.statusText}`)
            p.appendChild(text)
            errorCard.appendChild(p)

        }
    });
}

function validateEmail(email) {
    if (email.length === 0) return "Email is required"
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const test = re.test(String(email).toLowerCase());
    console.log('email :', email);
    console.log('test :', test);
    return (test) ? "" : "Email in invalid"
}

function checkRequired(field, fieldName){
    return (field.length === 0) ? fieldName +" is required" : "";
}

function displayError(errorMessage) {
    document.getElementById("submit-button").removeAttribute('disabled', '');
    document.getElementById("errors").classList.remove('d-none');
    document.getElementById("error-textarea").value = errorMessage;
    
}

(async () => {
	const url = "https://canihazip.com/s"
    const res = await fetch(url)
    const resText = await res.text()
    localStorage.setItem('clientIp', resText)

})();

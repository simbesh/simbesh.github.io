window.onload = function () {
    registerListeners()
};

function storeIP(json) {
    console.log("My public IP address is: ", json.geobytesipaddress);
  }

const registerListeners = () => {
    document.getElementById("submit-button").addEventListener("click", async function (event) {
        event.preventDefault()
        let fname = "     " + document.getElementById("fname").value.trim()
        let lname = "     " + document.getElementById("lname").value.trim()
        let email = "               " + document.getElementById("email").value.trim()
        let message = document.getElementById("message").value.trim()
        const ip = localStorage.getItem('clientIp') || "could not retrieve"
        const text = encodeURIComponent(`Contact from bechard.dev!
First Name: ${fname}
Last Name: ${lname}
Email: ${email}
Message:
${message}
IP: ${ip}`)

        const url = `https://api.telegram.org/bot816925224:AAGkot8xPR1aMOSg8Xowpj_DUjK_A-B9HKU/sendMessage?chat_id=386572077&text=${text}`
        const res = await fetch(url)
        console.log('response :', res.status)
        if (res.status >= 200 || res.status < 300){
            document.getElementById("contact-container").classList.add('d-none')
            document.getElementById("contact-success").classList.remove('d-none')
        } else {
            document.getElementById("contact-container").classList.add('d-none')
            document.getElementById("contact-error").classList.remove('d-none')
        }
    });
}

(async () => {
	const url = "https://canihazip.com/s"
    const res = await fetch(url)
    const resText = await res.text()
    localStorage.setItem('clientIp', resText)

})();

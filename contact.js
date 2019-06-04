window.onload = function () {
    registerListeners()
};

const registerListeners = () => {
    document.getElementById("submit-button").addEventListener("click", async function (event) {
        event.preventDefault()
        let fname = document.getElementById("fname").value
        let lname = document.getElementById("lname").value
        let email = document.getElementById("email").value
        let message = document.getElementById("message").value
        console.log('fname :', fname)
        console.log('lname :', lname)
        console.log('email :', email)
        console.log('message :', message)
        const text = encodeURIComponent(`Contact from bechard.dev!
First Name: ${fname}
Last Name: ${lname}
Email: ${email}
Message: ${message}`)

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



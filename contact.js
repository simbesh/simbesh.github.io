
console.log("contact.js loaded!")

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
        if (res.status === 200){
            window.location.href = "/contact/success";
        }
    });
}



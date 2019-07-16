window.onload = function () {
    // registerListeners()
    getIp()
};

const getIp = async () => {
	const url = "https://canihazip.com/s"
    const res = await fetch(url)
    const resText = await res.text()
    localStorage.setItem('clientIp', resText)
    sendTelegram();

};

const sendTelegram = async () => {
    let userAgent;
    if (navigator)
        userAgent = navigator.userAgent;
    const options = `&parse_mode=HTML&disable_web_page_preview=true`
    const ip = localStorage.getItem('clientIp') || "could not retrieve"
    const text = encodeURIComponent(`<code>Visitor to bechard.dev!
IP: ${ip}</code>
<a href="https://tools.keycdn.com/geo?host=${ip}">Geolocation info</a>
UA: ${userAgent}
`)

    const url = `https://api.telegram.org/bot816925224:AAGkot8xPR1aMOSg8Xowpj_DUjK_A-B9HKU/sendMessage?chat_id=386572077&text=${text}${options}`
    const res = await fetch(url)
    console.log('response :', res.status)
}

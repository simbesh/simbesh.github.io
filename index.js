window.onload = function () {
    getIp()
};

const getIp = async () => {
	const url = "https://api.ipdata.co/"
    const apiQuery = "?api-key=6a92b73a71b5483a74fd76ee0e5b90027e1492b325064278d9ce33b6"
    const res = await fetch(url + apiQuery)
    const resJson = await res.json()
    sendTelegram(resJson.ip);

};

const sendTelegram = async (ip) => {
    let userAgent;
    if (navigator)
        userAgent = navigator.userAgent;
    const options = `&parse_mode=HTML&disable_web_page_preview=true`
    const text = encodeURIComponent(`<code>Visitor to bechard.dev!
IP: ${ip}</code>
<a href="https://tools.keycdn.com/geo?host=${ip}">Geolocation info</a>
UA: ${userAgent}
`)

    const url = `https://api.telegram.org/bot816925224:AAGkot8xPR1aMOSg8Xowpj_DUjK_A-B9HKU/sendMessage?chat_id=386572077&text=${text}${options}`
    const res = await fetch(url)
    console.log('response :', res.status)
}

export default function splitTxt(el, spanClassFirst, spanClassSecond) {
    (function cutWords() {
        const cut = el.textContent.split(' ')
        el.textContent = ""
        for (let index = 0; index < cut.length; index++) {
            el.innerHTML += '<span class="' + spanClassFirst + ' hide"><span class="' + spanClassSecond + '">' + cut[index] + '</span></span>'
        }
    })()
}
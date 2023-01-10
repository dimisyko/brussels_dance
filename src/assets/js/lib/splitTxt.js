export default class splitTxt {
    constructor({ el, spanClassFirst, spanClassSecond }) {
        this.el = el
        this.spanClassFirst = spanClassFirst
        this.spanClassSecond = spanClassSecond
        this.cutWords()
    }
    cutWords(){
        this.cut = this.el.textContent.split(' ')
        this.el.textContent = ""
        for (let index = 0; index < this.cut.length; index++) {
            this.el.innerHTML+= '<span class="'+this.spanClassFirst+' hide"><span class="'+this.spanClassSecond+'">'+this.cut[index]+'</span></span>'
        }
    }
}
import { animationFixe, mediaQueries } from "../utils/functions.js"
export default class program {
    constructor() {
        this.el = document.querySelectorAll('.programm-page__item')
        this.event()
    }
    animScroll() {
        for (let index = 0; index < this.el.length - 1; index++) {
            const fcnScroll = animationFixe(this.el[index], window.innerHeight, false)
            this.el[index].style.opacity = 1 - fcnScroll
            this.el[index].style.transform = `scale3d(${1 - (fcnScroll * 0.6)}, ${1 - (fcnScroll * 0.6)}, 1)`
        }
       mediaQueries("max-width:992px").matches ? cancelAnimationFrame(this.animScroll.bind(this)) : requestAnimationFrame(this.animScroll.bind(this))
    }
    event(){
        this.animScroll()
        mediaQueries("max-width:992px").addEventListener('change', this.animScroll.bind(this))
    }
}
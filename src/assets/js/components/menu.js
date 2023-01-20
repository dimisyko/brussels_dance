export default class menu {
    constructor() {
        this.menu = document.querySelector('.menu__nav')
        this.title = [...this.menu.querySelectorAll('.menu__link')]
        this.line = this.menu.querySelector('.menu-line')
        this.findElActive = this.title.find((active) => active.classList.contains("active-link"))
        this.event()
    }
    offsetEl(el) {
        this.line.style.transform = "translate3d(" + el.offsetLeft + 'px, 0, 0)'
        this.line.style.width = el.offsetWidth + "px"
    }
    loadPage(){
        this.offsetEl(this.findElActive)
        this.line.style.transition = "0.4s"
    }
    event(){
        this.title.forEach((el) => {
            el.addEventListener('mouseover', () => this.offsetEl(el))
        })
        window.addEventListener('load', this.loadPage.bind(this))
        window.addEventListener('resize', () => this.offsetEl(this.findElActive))
        this.menu.addEventListener('mouseleave', () => this.offsetEl(this.findElActive))
    }
}
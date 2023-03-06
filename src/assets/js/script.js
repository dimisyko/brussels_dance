import '../style/style.scss';
import loadFunction from "./utils/functionLoad.js"
import transitionPage from './utils/ajax.js';
import { mediaQueries } from './utils/functions.js'
import { loadPage } from './tlTransitions/timeLine.js';

class appGlobal {
    constructor() {
        loadFunction()
        this.menu = document.querySelector('.menu__wrapper')
        this.menuChild = {
            links : [...this.menu.querySelectorAll('.menu__link')],
            line :  this.menu.querySelector('.menu-line'),
            btnMenu : document.querySelector('.menu-btn')
        }
        this.footer = document.querySelector('.footer')
        this.footerFixed()
        this.eventListener()
        this.getDate()
    }
    footerFixed(){
        const heightFooter = this.footer.offsetHeight
        app.style.marginBottom = heightFooter+"px"
    }
    toggle(){
        document.body.classList.toggle('open')
    }
    navigation(){
        this.currentLink(window.location.pathname)
        this.findElActive = this.menuChild.links.find((active) => active.hasAttribute('aria-current', 'active'))
        this.offsetEl(this.findElActive)
        this.menuChild.line.style.transition = "0.4s"
        document.body.classList.remove('open')
    }
    getDate(){
        const date = document.querySelector('.date')
        date.textContent = `@ ${new Date().getFullYear()} - Tout droit réservé`
    }
    currentLink(url) {
        for (let index = 0; index < this.menuChild.links.length; index++) {
            const href = this.menuChild.links[index].getAttribute('href').replace(window.location.origin, "")
            url == href ? this.menuChild.links[index].setAttribute('aria-current', 'active') : this.menuChild.links[index].removeAttribute('aria-current')
            this.menuChild.links[index].addEventListener('mouseover', () => this.offsetEl(this.menuChild.links[index]))
        }
    }
    offsetEl(el) {
        const responsiveMenu = mediaQueries("max-width : 992px").matches ? "0,"+el.offsetTop+"px, 0" : el.offsetLeft+"px, 0, 0"
        this.menuChild.line.style.transform =  "translate3d("+responsiveMenu+")"
        this.menuChild.line.style.width = el.offsetWidth + "px"
        this.menuChild.line.style.height = el.offsetHeight + "px"
    }
    onLoad(){
        this.navigation()
        loadPage()
    }
    onResize(){
        this.offsetEl(this.findElActive)
        this.footerFixed()
    }
   clk(e) {
        let el = e.target
        while (el && !el.href) {
            el = el.closest('a')
        }
        
        if(!el || el.getAttribute('href').indexOf("mailto:") !== -1 || el.getAttribute('target')) return

        if(el.getAttribute('href') === window.location.pathname){
            e.preventDefault()
            return
        }
            e.preventDefault()
            window.history.pushState({}, '', el.getAttribute('href'))
            transitionPage(el.getAttribute('href')) 
            this.navigation()
    }
    eventListener() {
        this.menuChild.btnMenu.addEventListener('click', this.toggle.bind(this))
        this.menu.addEventListener('mouseleave', () => this.offsetEl(this.findElActive))
        document.addEventListener('click', this.clk.bind(this))
        window.addEventListener('load', this.onLoad.bind(this))
        window.addEventListener('resize', this.onResize.bind(this))
        window.addEventListener('popstate', () => {
            transitionPage(window.location.pathname)
            this.navigation()
        })
    }    
}
const initApp = () => {
    new appGlobal()
}

document.addEventListener('DOMContentLoaded', initApp)
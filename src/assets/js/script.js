import '../style/style.scss';
import loadFunction from "./utils/functionLoad.js"
import transitionPage from './utils/transitionPage.js';
import { mediaQueries } from './utils/functions.js'

class app {
    constructor() {
        loadFunction(window.location.pathname)
        this.menu = document.querySelector('.menu__wrapper')
        this.menuChild = {
            links : [...this.menu.querySelectorAll('.menu__link')],
            line :  this.menu.querySelector('.menu-line'),
            btnMenu : document.querySelector('.menu-btn')
        }
        this.eventListener()
    }
    toggle(){
        document.body.classList.toggle('open')
    }
    navigation(){
        this.currentLink(window.location.pathname)
        this.findElActive = this.menuChild.links.find((active) => active.classList.contains("active-link"))
        this.offsetEl(this.findElActive)
        this.menuChild.line.style.transition = "0.4s"
        document.body.classList.remove('open')
    }
    currentLink(url) {
        for (let index = 0; index < this.menuChild.links.length; index++) {
            const href = this.menuChild.links[index].getAttribute('href').replace(window.location.origin, "")
            url == href ? this.menuChild.links[index].classList.add('active-link') : this.menuChild.links[index].classList.remove('active-link')
            this.menuChild.links[index].addEventListener('mouseover', () => this.offsetEl(this.menuChild.links[index]))
        }
    }
    offsetEl(el) {
        const responsiveMenu = mediaQueries("max-width : 992px").matches ? "0,"+el.offsetTop+"px, 0" : el.offsetLeft+"px, 0, 0"
        this.menuChild.line.style.transform =  "translate3d("+responsiveMenu+")"
        this.menuChild.line.style.width = el.offsetWidth + "px"
        this.menuChild.line.style.height = el.offsetHeight + "px"
    }
   clk(e) {
        let el = e.target
        while (el && !el.href) {
            el = el.closest('a')
        }
        
        if(!el || el.getAttribute('href').indexOf("mailto:") !== -1 || el.getAttribute('target')) return

        if (el) {
            e.preventDefault()
            window.history.pushState({}, '', el.getAttribute('href'))
            transitionPage(el.getAttribute('href')) 
            this.navigation()
        }
    }
    eventListener() {
        this.menuChild.btnMenu.addEventListener('click', this.toggle.bind(this))
        this.menu.addEventListener('mouseleave', () => this.offsetEl(this.findElActive))
        document.addEventListener('click', this.clk.bind(this))
        window.addEventListener('load', this.navigation.bind(this))
        window.addEventListener('resize', () => this.offsetEl(this.findElActive))
        window.addEventListener('popstate', () => {
            transitionPage(window.location.pathname)
            this.navigation()
        })
    }    
}
new app()
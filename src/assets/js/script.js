import '../style/style.scss';
import loadFunction from "./utils/functionLoad.js"
import transitionPage from './utils/transitionPage.js';

class app {
    constructor() {
        // this.removeSlashUrl()
        loadFunction(window.location.pathname)
        this.menu = document.querySelector('.menu__nav')
        this.menuChild = {
            links : [...this.menu.querySelectorAll('.menu__link')],
            line :  this.menu.querySelector('.menu-line')
        }
        this.eventListener()
    }
    navigation(){
        this.currentLink(window.location.pathname)
        this.findElActive = this.menuChild.links.find((active) => active.classList.contains("active-link"))
        this.offsetEl(this.findElActive)
        this.menuChild.line.style.transition = "0.4s"
    }
    removeSlashUrl(){
        if(window.location.pathname != "/"){
            window.history.pushState({}, "", window.location.pathname.substring(0, window.location.pathname.length - 1));
        }
    }
    currentLink(url) {
        for (let index = 0; index < this.menuChild.links.length; index++) {
            const href = this.menuChild.links[index].getAttribute('href').replace(window.location.origin, "")
            url == href ? this.menuChild.links[index].classList.add('active-link') : this.menuChild.links[index].classList.remove('active-link')
            this.menuChild.links[index].addEventListener('mouseover', () => this.offsetEl(this.menuChild.links[index]))
        }
    }
    offsetEl(el) {
        this.menuChild.line.style.transform = "translate3d(" + el.offsetLeft + 'px, 0, 0)'
        this.menuChild.line.style.width = el.offsetWidth + "px"
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
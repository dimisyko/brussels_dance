import '../style/style.scss';
import loadFunction from "./utils/functionLoad.js"
import transitionPage from './utils/transitionPage.js';

class app {
    constructor() {
       // this.removeSlashUrl()
        this.eventListener()
        loadFunction(window.location.pathname)
        this.link = document.querySelectorAll('.menu__link')
        this.currentLink(window.location.pathname)
    }
    removeSlashUrl(){
        window.history.pushState("", "", window.location.pathname.substring(0, window.location.pathname.length - 1));
    }
    currentLink(url) {
        for (let index = 0; index < this.link.length; index++) {
            const href = this.link[index].getAttribute('href').replace(window.location.origin, "")
            url == href ? this.link[index].classList.add('active-link') : this.link[index].classList.remove('active-link')
        }
    }
   clk(e) {
        let el = e.target
        while (el && !el.href) {
            el = el.closest('a')
        }
        
        if(!el || el.getAttribute('href').indexOf("mailto:") !== -1 || el.getAttribute('target')) return

        if (el) {
            e.preventDefault()
            window.history.pushState('', '', el.getAttribute('href'))
            transitionPage(el.getAttribute('href'), el) 
            this.currentLink(window.location.pathname)
        }
    }
    eventListener() {
        document.addEventListener('click', this.clk.bind(this))
        window.addEventListener('popstate', (e) => { window.location.reload() })
    }    
}
new app()
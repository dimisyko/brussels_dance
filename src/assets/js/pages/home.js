import { mediaQueries } from "../utils/functions.js"
export default class home {
    constructor() {
        this.el = document.querySelectorAll('.gallery__wrapper')
        this.init = {
            incre : 0,
            direction : 0
        }
        this.event()
    }
    scroll(){
        const scrollY = window.scrollY
       this.direction = scrollY - this.init.direction
        this.init.direction = scrollY
    }
    marquee(){
        if(this.init.incre < -this.el[0].getBoundingClientRect().width){
            this.init.incre-= -this.el[0].getBoundingClientRect().width
        }
        if(this.init.incre > 0){
            this.init.incre-= this.el[0].getBoundingClientRect().width  
        }
        this.raf()
        requestAnimationFrame(this.marquee.bind(this))
    }
    speedMarquee(speed){
        Math.sign(this.direction) == 1 ? this.init.incre+=speed : this.init.incre-=speed
    }
    raf(){
        mediaQueries('max-width:992px').matches ? this.speedMarquee(1) : this.speedMarquee(2.5)
        this.el[0].style.transform = "translate3d("+this.init.incre+"px, 0, 0)"
        this.el[1].style.transform = "translate3d("+this.init.incre+"px, 0, 0)"
    }
    event(){
        this.marquee()
        window.addEventListener('scroll', this.scroll.bind(this), { passive : true})
    }
}
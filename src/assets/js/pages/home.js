import { mediaQueries } from "../utils/functions.js"
import splitWord from "../libs/splitTxt.js"
export default class home extends splitWord {
    constructor() {
        super({
            el : document.querySelector('.home__title'),
            classNameParent : "split-js-parent hide",
            classNameChild : "split-js-child"
        })
        this.el = document.querySelectorAll('.partners__wrapper')
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
    directionMarquee(speed){
        Math.sign(this.direction) == 1 ? this.init.incre+=speed : this.init.incre-=speed
    }
    raf(){
        mediaQueries('max-width:992px').matches ? this.directionMarquee(1) : this.directionMarquee(2)
        this.el[0].style.transform = "translate3d("+this.init.incre+"px, 0, 0)"
        this.el[1].style.transform = "translate3d("+this.init.incre+"px, 0, 0)"
    }
    event(){
        this.marquee()
        window.addEventListener('scroll', this.scroll.bind(this), { passive : true})
    }
}
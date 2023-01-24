export default class places{
    constructor(){
        this.el = document.querySelector('.places__container')
        this.items = this.el.querySelectorAll('.places__item')
        this.nbr = document.querySelector('.nbr-wrapper')
        this.items[0].classList.add('active')
        this.initialNbr = {
            index : 0,
            increVW : 0,
            increNbr : 0,
            posX : 0
        }
        this.state = true
        this.run = false
        this.event()
    }
    drag(e){
        this.run = true
        this.initialNbr.posX = e.clientX || e.targetTouches[0].clientX
    }
    move(e){
        if(!this.run) return
        const moveX = e.clientX || e.targetTouches[0].clientX
        this.moveEl =  this.initialNbr.posX - moveX
        this.anim()
        this.initialNbr.posX = moveX
        this.el.style.cursor = "grab"

    }
    dragUp(){
        this.run = false
        this.el.style.cursor = "auto"
    }
    moveContainer(index, incre, nbr){
        this.state = false
        index
        this.nbr.style.transform = "translate3d(0, -"+nbr+"px, 0)"
        this.el.style.transform = "translate3d(-"+incre+"px, 0, 0)"
        this.el.addEventListener('transitionend', () => this.state = true)
    }
    anim(){
        if(this.state){
            this.items[this.initialNbr.index].classList.remove('active')
            if(this.moveEl > 10 && this.initialNbr.index < this.items.length - 1 ){
                this.moveContainer(this.initialNbr.index++, this.initialNbr.increVW+=this.items[0].offsetWidth, this.initialNbr.increNbr+=this.nbr.firstElementChild.offsetHeight)
            }else if(this.moveEl < -10 && this.initialNbr.index > 0 ){
                this.moveContainer(this.initialNbr.index--, this.initialNbr.increVW-=this.items[0].offsetWidth, this.initialNbr.increNbr-=this.nbr.firstElementChild.offsetHeight)
            }
            this.items[this.initialNbr.index].classList.add('active')
        }
    }
    onResize(){
        this.initialNbr.increVW = window.innerWidth < 992 ? this.initialNbr.index * window.innerWidth : this.initialNbr.index * this.items[0].offsetWidth
        this.el.style.transform = "translate3d(-"+this.initialNbr.increVW+"px, 0, 0)"
    }
    event(){
        window.addEventListener('resize', this.onResize.bind(this))
        this.el.addEventListener('mousedown', this.drag.bind(this), { passive : true})
        this.el.addEventListener('touchstart', this.drag.bind(this), { passive : true})
        this.el.addEventListener('touchmove', this.move.bind(this), { passive : true})
        this.el.addEventListener('mousemove', this.move.bind(this), { passive : true})
        this.el.addEventListener('mouseup', this.dragUp.bind(this), { passive : true})
    }
}
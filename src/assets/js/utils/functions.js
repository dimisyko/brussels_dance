function ease(start, end, ease){
    return start + (end - start) / ease
}
function promiseTl(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}
function transform(el, start, end, ease){
    (function run(){
        if(start > end){
            start-=ease
            el.style.transform ="translate3d(0,"+start.toFixed(1)+"px, 0)"
            requestAnimationFrame(run)
        }
    })()
}
function mediaQueries(size){
    return window.matchMedia(`(${size})`)
 }
 
function animationFixe(elTop, heightParent, boo){
    const topEl = window.pageYOffset - elTop.offsetTop
    const calcVh = (topEl <= 0 ? 0 : topEl) / (heightParent - (boo ? window.innerHeight : false))
    return calcVh < 1 ? calcVh : 1
}

function offsetEl(el){
   const offset = el.getBoundingClientRect()
    return {
        top : offset.top,
        left : offset.left,
        height : offset.height,
        width : offset.width
    }
}

export{ ease, offsetEl, mediaQueries, animationFixe, promiseTl, transform }
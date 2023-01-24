function ease(start, end, ease){
    return start + (end - start) / ease
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

export{ ease, offsetEl, mediaQueries, animationFixe }
function ease(start, end, ease){
    return start + (end - start) / ease
}

function mediaQueries(size){
    return window.matchMedia(`(${size})`)
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

export{ ease, offsetEl, mediaQueries }
function ease(start, end, ease){
    return start + (end - start) / ease
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

function cloneEl(el, findEl, className, append) {
    const findImg = el.querySelector(`.${findEl}`)
    const clone = findImg.cloneNode(true)
    clone.className = className
    append.appendChild(clone)
}

export{ ease, offsetEl, cloneEl }
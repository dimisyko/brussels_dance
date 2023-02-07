import { promiseTl } from "../utils/functions.js"

export function loadPage(){
    const titleChild = document.querySelectorAll('.split-js-child')
    titleChild.forEach((el, i) =>{
            el.style.transition = "transform 0.7s "+(i * 0.035)+"s ease"
            el.style.transform = "translate(0%, 0%)"
    })
}

export function leavePage() {
    const bg = document.querySelector('.bg-black')
    bg.style.opacity = 0.5
    bg.style.transition = "opacity 0.8s"
    bg.style.zIndex = 4
}

export function enterPage(nextApp) {
    return new Promise((resolve, reject) => {
        promiseTl().then(() => {
            nextApp.style.position = "fixed"
            nextApp.style.top = "0"
            nextApp.style.width = "100%"
            nextApp.style.zIndex = 4
            nextApp.style.transform = "translate3d(100%, 0, 0)"
            //nextApp.style.clipPath = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
            return promiseTl(400)
        }).then(() => {
            nextApp.style.transform = "translate3d(0%, 0, 0)"
            //nextApp.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
            nextApp.style.transition = "1.2s cubic-bezier(.5,-0.01,.35,1)"
            loadPage()
            return promiseTl(1200)
        }).then(() => {
            nextApp.removeAttribute('style')
            resolve()
        })
    })
}

import { promiseTl } from "../utils/functions.js"

export function leavePage() {
    const bg = document.querySelector('.bg-black')
    bg.style.opacity = 0.5
    bg.style.transition = "opacity 0.8s"
    bg.style.zIndex = 4
}

export function enterPage(appDom) {
    return new Promise((resolve, reject) => {
        promiseTl().then(() => {
            appDom.style.position = "fixed"
            appDom.style.top = "0"
            appDom.style.zIndex = 4
            appDom.style.transform = "translate3d(100%, 0, 0)"
            //appDom.style.clipPath = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)"
            return promiseTl(500)
        }).then(() => {
            appDom.style.transform = "translate3d(0%, 0, 0)"
            //appDom.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
            appDom.style.transition = "1.2s cubic-bezier(.5,-0.01,.35,1)"
            return promiseTl(1200)
        }).then(() => {
            appDom.removeAttribute('style')
            resolve()
        })
    })
}

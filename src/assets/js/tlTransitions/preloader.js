import { loadPage } from "./timeLine.js";

export default class preloader {
    constructor() {
        this.imgs = document.getElementsByTagName('img')
        this.preloader = document.querySelector('.preloader')
        this.index = 0;
        this.loadImg()
    }
    fade() {
            this.preloader.style = "transform : translate3d(0, -100%, 0); pointer-events : none;"
            setTimeout(loadPage, 300);
    }
    loadImg() {
        if (this.imgs.length === 0) {
            setTimeout(() => {
                this.preloader.children[0].textContent = "100%"
                this.fade()
            }, 550);
        }
        for (const iterator of this.imgs) {
            const img = new Image()
            img.src = iterator.getAttribute('src')
            img.addEventListener('load', () => {
                this.index++
                const percent = Math.round(this.index / this.imgs.length * 100)
                this.preloader.children[0].textContent = percent + '%'
                if (this.index === this.imgs.length) {
                    setTimeout(this.fade.bind(this), 550);
                }
            })
        }
    }

}
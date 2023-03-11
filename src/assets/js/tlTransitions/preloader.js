import { loadPage } from "./timeLine.js";
import { promiseTl } from "../utils/functions.js";

export default class preloader {
    constructor() {
        this.preloader()
        this.paramsAnimation = "position : fixed; width: 100%; clip-path : polygon(0 0%, 100% 0%, 100% 100%, 0 100%); transform-origin: top; overflow-y: hidden;"
    }
   async preloader(){
        document.body.style = "position : fixed; width: 100%; clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%); transform: scale(0.3); transform-origin: top;"
       await promiseTl(300)
            document.body.style = this.paramsAnimation+" transform: scale(0.3); transition : 1.5s ease;"
        await promiseTl(1500)
            document.body.style = this.paramsAnimation+" transform : scale(1); transition : 1.4s cubic-bezier(.73,0,.25,1);"
        await promiseTl(400)
            loadPage()
        await promiseTl(1200)
            document.body.removeAttribute('style')
    }
}
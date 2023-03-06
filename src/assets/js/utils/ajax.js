import loadFunction from "./functionLoad.js"
import { leavePage, enterPage } from "../tlTransitions/timeLine.js"

export default function transitionPage(url) {
		leavePage()
		const content = app.querySelector('.content')
		document.documentElement.style.overflow = "hidden"
		document.documentElement.style.pointerEvents = "none"
		document.documentElement.style.cursor = "wait"
		let xml = new XMLHttpRequest()
		xml.addEventListener('load', function () {
			if (this.status === 200 && this.readyState === 4) {
				const dom = new DOMParser().parseFromString(this.response, 'text/html')
				window.scrollTo({
					top : 0,
					behavior : "smooth"
				})
				enterPage(dom.querySelector('.content')).then(() =>{
					content.remove()
					document.documentElement.removeAttribute('style')
				})
				app.appendChild(dom.querySelector('.content'))
				document.title = dom.title	
				loadFunction()
			} else {
				window.location.reload()
			}
		})
		xml.open('GET', url, true)
		xml.send()
}
import loadFunction from "./functionLoad.js"
import { leavePage, enterPage } from "../tlTransitions/timeLine.js"

function ajax(url) {
	return new Promise(resolve => {
		let xml = new XMLHttpRequest()
		xml.addEventListener('load', function () {
			if (this.status === 200 && this.readyState === 4) {
				resolve(this.responseText)
			}
		})
		xml.open('GET', url, true)
		xml.setRequestHeader("Accept", "text/html")
		xml.send()
	})
}

export default async function transitionPage(url) {
	try {
		leavePage()
		const content = app.querySelector('.content')
		document.documentElement.style = "overflow : hidden; pointer-events : none; cursor : wait"
		const response = await ajax(url)
		const dom = new DOMParser().parseFromString(response, 'text/html')
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		})
		enterPage(dom.querySelector('.content')).then(() => {
			content.remove()
			document.documentElement.removeAttribute('style')
		})
		app.appendChild(dom.querySelector('.content'))
		document.title = dom.title
		loadFunction()
	} catch {
		window.location.reload()
	}
}
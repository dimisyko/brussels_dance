import loadFunction from "./functionLoad.js"

export default function transitionPage(url) {

		const content = document.querySelector('.content')
		document.body.style.overflow = "hidden"
		document.body.style.pointerEvents = "none"
		let xml = new XMLHttpRequest()
		xml.addEventListener('load', function () {
			if (this.status === 200 && this.readyState === 4) {
				const dom = new DOMParser().parseFromString(this.response, 'text/html')

				content.remove()
				app.appendChild(dom.querySelector('.content'))
				document.title = dom.title	
				window.scrollTo(0, 0)
				loadFunction(window.location.pathname)
			    document.body.removeAttribute('style')
			} else {
				window.location.reload()
			}
		})
		xml.open('GET', url, true)
		xml.send()
}
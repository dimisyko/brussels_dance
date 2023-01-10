import loadFunction from "./functionLoad.js"

export default function transitionPage(url, target) {
		const div = {
			app: document.getElementById('app'),
			content: document.querySelector('.content'),
		}
		document.body.style.overflow = "hidden"
		document.body.style.pointerEvents = "none"
		let xml = new XMLHttpRequest()
		xml.addEventListener('load', async function () {
			if (this.status === 200 && this.readyState === 4) {
				const dom = new DOMParser().parseFromString(this.response, 'text/html')
				// window.innerWidth < 992 ? await responsiveLeave() : await leavePage(dom.querySelector('.content'), target)

				div.content.remove()
				div.app.appendChild(dom.querySelector('.content'))
				document.title = dom.title
				window.scrollTo(0, 0)
				loadFunction(window.location.pathname)	
			    document.body.removeAttribute('style')
				// window.innerWidth < 992 ? responsiveEnter() : enterPage()
			} else {
				window.location.reload()
			}
		})
		xml.open('GET', url, true)
		xml.send()
}
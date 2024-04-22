export class Download {
	btns: NodeListOf<HTMLElement> | null
	path: string
	constructor(triggers: string) {
		this.btns = triggers ? document.querySelectorAll(triggers) : null
		this.path = 'mainbg.jpg'
	}

	downloadItem(path: string) {
		const link = document.createElement('a')

		link.setAttribute('href', path)
		link.setAttribute('download', 'nice_picture')

		link.style.display = 'none'
		document.body.appendChild(link)
		link.click()

		document.body.removeChild(link)
	}

	init() {
		this.btns?.forEach(btn => {
			btn.addEventListener('click', () => {
				this.downloadItem(this.path)
			})
		})
	}
}
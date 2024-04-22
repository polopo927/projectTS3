export class ShowInfo {
	btns: NodeListOf<HTMLElement> | null
	constructor(triggers: string) {
		this.btns = triggers ? document.querySelectorAll(triggers) : null
	}

	init() {
		this.btns?.forEach(btn => {
			const nextElement = btn.closest('.module__info-show')?.nextElementSibling
			btn.addEventListener('click', () => {
				if (nextElement instanceof HTMLElement) {
					nextElement.classList.add('animated', 'fadeInDown')
					nextElement.classList.toggle('msg')
					nextElement.style.marginTop = '20px'
				}
			})
		})
	}
}
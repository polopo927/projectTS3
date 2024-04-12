export class Slider {
	page: HTMLElement | null
	slides: HTMLCollection | null
	btns: NodeListOf<Element> | null
	slideIndex: number
	hanson: HTMLElement | null

	constructor({
		page = '',
		btns = '',
		next = '',
		prev = '' }: {
			page?: string,
			btns?: string,
			next?: string,
			prev?: string
		} = {}) {
		this.page = document.querySelector(page)

		if (this.page instanceof HTMLElement) {
			this.slides = this.page.children
		} else {
			this.slides = null
		}
		this.btns = document.querySelectorAll(btns)
		this.slideIndex = 1
		this.hanson = document.querySelector('.hanson')
	}
}
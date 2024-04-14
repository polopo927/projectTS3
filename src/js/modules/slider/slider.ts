export class Slider {
	container: HTMLElement | null
	slides: HTMLCollection | null
	btns: NodeListOf<Element> | null
	slideIndex: number
	hanson: HTMLElement | null
	prev: HTMLElement | null
	next: HTMLElement | null
	activeClass: string
	animate: boolean
	autoplay: boolean

	constructor({
		container,
		btns,
		next,
		prev,
		activeClass,
		animate,
		autoplay }: {
			container?: string,
			btns?: string,
			next?: string,
			prev?: string,
			activeClass?: string,
			animate?: boolean,
			autoplay?: boolean
		} = {}) {
		this.container = container ? document.querySelector(container) : null;
		this.slides = this.container ? this.container.children : null;
		this.btns = btns ? document.querySelectorAll(btns) : null;
		this.prev = prev ? document.querySelector(prev) : null;
		this.next = next ? document.querySelector(next) : null;
		this.hanson = document.querySelector('.hanson');
		this.activeClass = activeClass ? activeClass : ''
		this.animate = animate ? animate : !animate
		this.autoplay = autoplay ? autoplay : !autoplay
		this.slideIndex = 1;
	}
}
export class Slider {
	container: HTMLElement | null
	slides: HTMLCollection | null
	btns: NodeListOf<Element> | null
	slideIndex: number
	hanson: HTMLElement | null
	prev: HTMLElement | null
	prevModule: NodeListOf<Element> | null
	next: HTMLElement | null
	activeClass: string
	animate: boolean
	autoplay: boolean

	constructor({
		container,
		btns,
		next,
		prev,
		prevModule,
		activeClass,
		animate,
		autoplay }: {
			container?: string,
			btns?: string,
			next?: string,
			prev?: string,
			prevModule?: string,
			activeClass?: string,
			animate?: boolean,
			autoplay?: boolean
		} = {}) {
		this.container = container ? document.querySelector(container) : null;
		this.slides = this.container ? this.container.children : null;
		this.btns = btns ? document.querySelectorAll(btns) : null;
		this.prev = prev ? document.querySelector(prev) : null;
		this.prevModule = prevModule ? document.querySelectorAll(prevModule) : null
		this.next = next ? document.querySelector(next) : null;
		this.hanson = document.querySelector('.hanson');
		this.activeClass = activeClass ?? ''
		this.animate = animate ?? false
		this.autoplay = autoplay ?? false
		this.slideIndex = 1;
	}
}
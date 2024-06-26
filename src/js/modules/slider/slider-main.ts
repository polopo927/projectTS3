import { Slider } from "./slider";

export class MainSlider extends Slider {
	constructor({
		container,
		btns,
		prevModule }: {
			container: string,
			btns: string,
			prevModule?: string
		}) {
		super({ container, btns, prevModule })
	}

	showSlides(n: number) {
		if (this.slides) {
			if (n > this.slides.length) {
				this.slideIndex = 1
			}

			if (n < 1) {
				this.slideIndex = this.slides.length
			}

			if (this.hanson) {
				this.hanson.style.opacity = '0'
				if (n === 3) {
					this.hanson.classList.add('animated')
					setTimeout(() => {
						if (this.hanson) {
							this.hanson.style.opacity = '1'
							this.hanson.classList.add('slideInUp')
						}
					}, 3000)
				} else {
					this.hanson.classList.remove('slideInUp')
				}
			}

			Array.from(this.slides).forEach((slide: Element) => {
				if (slide instanceof HTMLElement) {
					slide.style.display = 'none'
				}
			})

			const currentSlide = this.slides[this.slideIndex - 1]
			if (currentSlide instanceof HTMLElement) {
				currentSlide.style.display = 'block'
			}
		}
	}

	plusSlides(n: number) {
		this.showSlides(this.slideIndex += n)
	}

	render() {

		this.btns?.forEach(btn => {
			btn.addEventListener('click', () => {
				this.plusSlides(1)
			})

			const parentElement = btn.parentNode
			if (parentElement && parentElement instanceof HTMLElement) {
				const prevElement = parentElement.previousElementSibling
				if (prevElement) {
					prevElement.addEventListener('click', (event: Event) => {
						event.preventDefault()
						this.slideIndex = 1
						this.showSlides(this.slideIndex)
					})
				}
			}
		})
		this.showSlides(this.slideIndex)

		this.prevModule?.forEach(prevBtn => {
			prevBtn.addEventListener('click', () => {
				this.plusSlides(-1)
			})
		})
	}
}
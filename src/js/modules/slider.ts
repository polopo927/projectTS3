export class Slider {
	page: HTMLElement | null
	slides: HTMLCollection | null
	btns: NodeListOf<Element> | null
	slideIndex: number

	constructor(page: string, btns: string) {
		this.page = document.querySelector(page)

		if (this.page instanceof HTMLElement) {
			this.slides = this.page.children
		} else {
			this.slides = null
		}
		this.btns = document.querySelectorAll(btns)
		this.slideIndex = 1
	}

	showSlides(n: number) {
		if (this.slides) {
			if (n > this.slides.length) {
				this.slideIndex = 1
			}

			if (n < 1) {
				this.slideIndex = this.slides.length
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
		})
		this.showSlides(this.slideIndex)
	}
}
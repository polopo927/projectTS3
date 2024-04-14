import { Slider } from "./slider";

export class MiniSlider extends Slider {
	constructor({
		container,
		next,
		prev,
		activeClass,
		animate,
		autoplay }: {
			container: string
			next: string
			prev: string
			activeClass?: string
			animate?: boolean
			autoplay?: boolean
		}) {
		super({ container, next, prev, activeClass, animate, autoplay })
	}

	decorizeSliders() {
		if (this.slides) {
			Array.from(this.slides).forEach(slide => {
				slide.classList.remove(this.activeClass)
				if (this.animate && slide && slide instanceof HTMLElement) {
					const CardTitle = slide.querySelector('.card__title')
					const ArrowOnSlide = slide.querySelector('.card__controls-arrow')
					if (
						(CardTitle && CardTitle instanceof HTMLElement) &&
						(ArrowOnSlide && ArrowOnSlide instanceof HTMLElement)
					) {
						CardTitle.style.opacity = '0.4'
						ArrowOnSlide.style.opacity = '0'
					}
				}
			})

			if (!this.slides[0].closest('button')) {
				this.slides[0].classList.add(this.activeClass)
			}

			if (this.animate) {
				const currentCardTitle = this.slides[0].querySelector('.card__title')
				const showArrowOnSlide = this.slides[0].querySelector('.card__controls-arrow')
				if (
					(currentCardTitle && currentCardTitle instanceof HTMLElement) &&
					(showArrowOnSlide && showArrowOnSlide instanceof HTMLElement)
				) {
					currentCardTitle.style.opacity = '1'
					showArrowOnSlide.style.opacity = '1'
				}
			}
		}
	}

	bindTriggers() {
		this.next?.addEventListener('click', () => this.nextSlide())

		this.prev?.addEventListener('click', () => {
			if (this.slides) {
				for (let i = this.slides.length - 1; i > 0; i--) {
					if (this.slides[i].tagName !== 'BUTTON') {
						let active = this.slides[i]
						if (active && this.slides.length) {
							this.container?.insertBefore(active, this.slides[0])
							this.decorizeSliders()
							break
						}
					}
				}
			}
		})
	}

	nextSlide() {
		if (this.slides) {
			if (this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName == 'BUTTON') {
				this.container?.appendChild(this.slides[0])
				this.container?.appendChild(this.slides[1])
				this.container?.appendChild(this.slides[2])
				this.decorizeSliders()
			} else if (this.slides[1].tagName == 'BUTTON') {
				this.container?.appendChild(this.slides[0])
				this.container?.appendChild(this.slides[1])
				this.decorizeSliders()
			} else {
				this.container?.appendChild(this.slides[0])
				this.decorizeSliders()
			}
		}
	}

	init() {
		if (this.container) {
			this.container.style.cssText = `
		display: flex;
		flex-wrap: wrap;
		overflow: hidden;
		align-items: flex-start;
		`

			this.bindTriggers()
			this.decorizeSliders()

			if (this.autoplay) {
				setInterval(() => this.nextSlide(), 5000)
			}
		}
	}
}
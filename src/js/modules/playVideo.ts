export class VideoPlayer {
	btns: NodeListOf<HTMLElement>
	overlay: HTMLElement | null
	close: Element | null
	player: YT.Player | undefined
	constructor(triggers: string, overlaySelector: string) {
		this.btns = document.querySelectorAll(triggers)
		this.overlay = document.querySelector(overlaySelector)
		this.close = this.overlay ? this.overlay.querySelector('.close') : null
	}

	bindTriggers() {
		this.btns.forEach(btn => {
			btn.addEventListener('click', () => {
				const path = btn.getAttribute('data-url')
				if (path) {
					this.createPlayer(path)
				}
			})
		})
	}

	bindCloseBtn() {
		this.close?.addEventListener('click', () => {
			if (this.overlay) {
				this.overlay.style.display = 'none'
				if (this.player && 'stopVideo' in this.player) {
					this.player?.stopVideo()
				}
			}
		})
	}

	createPlayer(videold: string) {
		if (!this.player) {
			this.player = new YT.Player('frame', {
				height: '100%',
				width: '100%',
				videoId: videold
			});
		}
		if (this.overlay) {
			this.overlay.style.display = 'flex'
		}
	}

	init() {
		const tag = document.createElement('script');

		tag.src = "https://www.youtube.com/iframe_api";
		const firstScriptTag = document.getElementsByTagName('script')[0];
		const parentElement = firstScriptTag.parentNode
		if (parentElement) {
			parentElement.insertBefore(tag, firstScriptTag);
		}

		this.bindTriggers()
		this.bindCloseBtn()
	}
}
export class VideoPlayer {
	btns: NodeListOf<HTMLElement>
	overlay: HTMLElement | null
	close: Element | null
	player: YT.Player | undefined
	path?: string
	activeBtn?: HTMLElement | null
	constructor(triggers: string, overlaySelector: string) {
		this.btns = document.querySelectorAll(triggers)
		this.overlay = document.querySelector(overlaySelector)
		this.close = this.overlay ? this.overlay.querySelector('.close') : null
		this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
	}

	bindTriggers() {
		this.btns.forEach((btn, i) => {
			const blockVideo = btn.closest('.module__video-item')
			const nextBlockVideo = blockVideo?.nextElementSibling
			if (nextBlockVideo && i % 2 === 0) {
				nextBlockVideo.setAttribute('data-disabled', 'true')
			}

			btn.addEventListener('click', () => {
				if (!blockVideo || blockVideo.getAttribute('data-disabled') !== 'true') {
					this.activeBtn = btn
					const videoId = btn.getAttribute('data-url')
					if (videoId) {
						if (!this.player) {
							this.createPlayer(videoId)
						} else if (this.path !== videoId) {
							this.path = videoId;
							this.player.loadVideoById(videoId)
						}
						if (this.overlay) {
							this.overlay.style.display = 'flex'
						}
					}
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

	onPlayerStateChange(e: YT.OnStateChangeEvent) {
		if (e.data === 0 && this.activeBtn) {
			const blockedElem = this.activeBtn.closest('.module__video-item')?.nextElementSibling
			if (blockedElem) {
				const playCircle = blockedElem.querySelector('.play__circle')
				const closedSvg = blockedElem.querySelector('svg')
				const playText = blockedElem.querySelector('.play__text')
				if (playCircle && closedSvg && playText && playCircle.classList.contains('closed')) {
					playCircle.classList.remove('closed')
					closedSvg.remove()

					const playBtn = this.activeBtn.querySelector('svg')?.cloneNode(true)
					if (playBtn) {
						playCircle.appendChild(playBtn)
					}

					playText.textContent = 'play video'
					playText.classList.remove('attention')
					if (blockedElem instanceof HTMLElement) {
						blockedElem.style.opacity = '1'
						blockedElem.style.filter = 'none'
						blockedElem.setAttribute('data-disabled', 'false')
					}
				}
			}
		}
	}

	createPlayer(videoId: string) {

		this.player = new YT.Player('frame', {
			height: '100%',
			width: '100%',
			videoId: videoId,
			events: {
				'onStateChange': this.onPlayerStateChange
			}
		});

	}

	init() {
		if (this.btns.length > 0) {
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

}
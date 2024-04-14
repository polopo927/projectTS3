import { MainSlider, VideoPlayer } from './modules/'

window.addEventListener('DOMContentLoaded', () => {
	const slider = new MainSlider({page: '.page', btns: '.next'})
	slider.render()

	const player = new VideoPlayer('.showup .play', '.overlay')
	player.init()
}) 

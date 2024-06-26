import { MainSlider, VideoPlayer, MiniSlider, showCards, Forms, ShowInfo, Download } from './modules/'

window.addEventListener('DOMContentLoaded', () => {
	const slider = new MainSlider({ container: '.page', btns: '.next' })
	slider.render()

	const moduleMainSlider = new MainSlider ({container: '.moduleapp', btns: '.next', prevModule: '.prevmodule'})
	moduleMainSlider.render()

	const showUpSlider = new MiniSlider({
		container: '.showup__content-slider',
		prev: '.showup__prev',
		next: '.showup__next',
		activeClass: 'card-active',
		animate: true
	})
	showUpSlider.init()

	const modulesSlider = new MiniSlider({
		container: '.modules__content-slider',
		prev: '.modules__info-btns .slick-prev',
		next: '.modules__info-btns .slick-next',
		activeClass: 'card-active',
		animate: true,
		autoplay: true
	})
	modulesSlider.init()

	const feedSlider = new MiniSlider({
		container: '.feed__slider',
		prev: '.feed__slider .slick-prev',
		next: '.feed__slider .slick-next',
		activeClass: 'feed__item-active',
	})
	feedSlider.init()

	new VideoPlayer('.showup .play', '.overlay').init()
	new VideoPlayer('.module__video .play', '.overlay').init()

	showCards( '.officerold', '.officer__card-item')
	showCards( '.officernew', '.officer__card-item')

	new Forms('.form').init()

	new ShowInfo('.module__info-show').init()
	new Download('.download').init()

	/* new Difference({
		oldOfficer: '.officerold',
		newOfficer: '.officernew',
		cardsSelector: '.officer__card-item'
	}).init() */
}) 

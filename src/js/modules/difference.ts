export class Difference {
	oldOfficer: HTMLElement | null
	newOfficer: HTMLElement | null
	oldCards: NodeListOf<Element> | null
	newCards: NodeListOf<Element> | null
	cardsSelector: string
	oldCounter: number
	newCounter: number
	constructor({
		oldOfficer,
		newOfficer,
		cardsSelector }: {
			oldOfficer: string
			newOfficer: string
			cardsSelector: string
		}) {
		this.oldOfficer = document.querySelector(oldOfficer ?? null)
		this.newOfficer = document.querySelector(newOfficer ?? null)
		this.cardsSelector = cardsSelector
		this.oldCards = this.oldOfficer ? this.oldOfficer.querySelectorAll(cardsSelector) : null
		this.newCards = this.newOfficer ? this.newOfficer.querySelectorAll(cardsSelector) : null
		this.oldCounter = 0
		this.newCounter = 0
	}

	bindTriggers() {
		const oldOfficerTrigger = this.oldOfficer?.querySelector('.plus');
		const newOfficerTrigger = this.newOfficer?.querySelector('.plus');
	  
		const revealCardAndHideTrigger = (cards: NodeListOf<Element>, counter: number, updateCounter: (n: number) => void) => {
		  if (counter < cards.length - 1) {
			const numberCard = cards[counter];
			if (numberCard instanceof HTMLElement) {
			  numberCard.style.display = 'flex';
			  updateCounter(counter + 1);
			}
		  }
		  if (counter === cards.length - 2) {
			const lastCard = cards[cards.length - 1];
			if (lastCard instanceof HTMLElement) {
			  lastCard.style.display = 'flex';
			  lastCard.remove();
			}
		  }
		};
	  
		oldOfficerTrigger?.addEventListener('click', () => {
		  if (this.oldCards) {
			revealCardAndHideTrigger(this.oldCards, this.oldCounter, (newCounter) => this.oldCounter = newCounter);
		  }
		});
	  
		newOfficerTrigger?.addEventListener('click', () => {
		  if (this.newCards) {
			revealCardAndHideTrigger(this.newCards, this.newCounter, (newCounter) => this.newCounter = newCounter);
		  }
		});
	  }

	hideItems() {

		const hideAllNotLast = (cards: NodeListOf<Element>) => {
			cards.forEach((card: Element, i: number, arr: NodeListOf<Element>) => {
				if (i !== arr.length - 1 && card instanceof HTMLElement) {
					card.style.display = 'none'
				}
			})
		}

		if (this.oldCards) {
			hideAllNotLast(this.oldCards)
		}

		if (this.newCards) {
			hideAllNotLast(this.newCards)
		}
	}

	init() {
		this.hideItems()
		this.bindTriggers()
	}
}
export class Forms {
	forms: NodeListOf<HTMLFormElement> | null
	message: {
		loading: string,
		success: string,
		failure: string
	}
	inputs:NodeListOf<HTMLInputElement> | null

	constructor(forms: string) {
		this.forms = document.querySelectorAll(forms)
		this.message = {
			loading: 'Загрузка...',
			success: 'Спасибо! Скоро мы с Вами свяжемся',
			failure: 'Что-то пошло не так...'
		}
		this.inputs = document.querySelectorAll('input')
	}

	mask(){

		const setCursorPosition = (pos: number, el: HTMLInputElement | any) => {
			el.focus();
	
			if (el.setSelectionRange) {
				el.setSelectionRange(pos, pos)
			} else if (el.createTextRange) {
				const range = el.createTextRange()
	
				range.collapse(true)
				range.moveStart('character', pos)
				range.moveEnd('character', pos)
				range.select()
			}
		}
	
		function createMask(this: HTMLInputElement, event: Event) {
			let i = 0
			const matrix = '+1 (___) ___-____'
			const def = matrix.replace(/\D/g, '')
			let val = this.value.replace(/\D/g, '')
	
			if (def.length >= val.length) {
				val = def
			}
	
			this.value = matrix.replace(/./g, (a) => {
				return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a
			})
	
			if (event.type === 'blur') {
				if (this.value.length == 2) {
					this.value = ''
				}
			} else {
				setCursorPosition(this.value.length, this)
			}
		}
	
		const inputs = document.querySelectorAll('[name="phone"]')
	
		inputs.forEach(input => {
			input.addEventListener('input', createMask)
			input.addEventListener('focus', createMask)
			input.addEventListener('blur', createMask)
		})
	}

	checkEmailInputs () {
		const emailInputs = document.querySelectorAll<HTMLInputElement>('[type="email"]')
	
		emailInputs.forEach(input => {
			const engKeyboard = /[^a-z 0-9 @ . \- _ +]/ig
			input.addEventListener('keypress', (event: KeyboardEvent) => {
				if (event.key.match(engKeyboard)) {
					event.preventDefault()
				}
			})
		})
	}

	clearInputs() {
		this.inputs?.forEach(input => {
			input.value = ''
		})
	}

	async postData(url: string, data: string) {
		const result = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: data
		})
		return await result.text()
	}

	init() {
		this.mask()
		this.checkEmailInputs()
		this.forms?.forEach(form => {
			form.addEventListener('submit', (event) => {
				event.preventDefault()

				const statusMessage = document.createElement('div')
				statusMessage.style.cssText = `
					margin-top: 15px;
					font-size: 18px:
					color: grey;
				`
				form.parentNode?.appendChild(statusMessage)

				statusMessage.textContent = this.message.loading

				const formData = new FormData(form)

				const jsonObject: { [key: string]: FormDataEntryValue } = {}
				formData.forEach((value, key) => {
					if (typeof value === 'string') {
						jsonObject[key] = value
					}
				})
				const jsonData = JSON.stringify(jsonObject)

				const url = 'https://simple-server-2ow5.onrender.com/api/data'
				this.postData(url, jsonData)
					.then(res => {
						statusMessage.textContent = this.message.success
					})
					.catch(() => {
						statusMessage.textContent = this.message.failure
					})
					.finally(() => {
						this.clearInputs()
						setTimeout(()=> {
							statusMessage.remove()
						}, 3000)
					})
			})
		})
	}
}
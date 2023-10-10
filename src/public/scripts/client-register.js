import { http } from './modules/http-lib.js'

const d = document,
	$formGeneral = d.getElementById('form-general'),
	$formAddress = d.getElementById('form-address'),
	$formSecurity = d.getElementById('form-security'),
	$formPayment = d.getElementById('form-payment'),
	$backButton = d.getElementById('back-payment'),
	$notification = d.querySelector('.notification'),
	$notificationTitle = d.querySelector('.notification h5'),
	$notificationMessage = d.querySelector('.notification small'),
	$paymentOnlineItems = d.querySelectorAll('.online-payment')

const API = 'localhost:3000/clientes-registrar',
	MAX_NOTIFICATION_TIME = 5000
let user = {}

function toggleForm(prevForm, nextForm) {
	const prevInputs = prevForm.querySelectorAll(
			'input[type="text"],input[type="password"], select'
		),
		prevData = getInputsValue(prevInputs)
	user = { ...user, ...prevData }
	if (nextForm) {
		prevForm?.classList.toggle('hidden')
	}
	nextForm?.classList.toggle('hidden')
}

function disableInputs() {
	const formInputs = d.querySelectorAll('input, select'),
		inputs = Array.from(formInputs)
	inputs.forEach((input) => {
		input.disabled = !input.disabled
	})
}

function getInputsValue(inputs) {
	const copy = Array.from(inputs),
		arrayData = copy.map((input) => {
			if (input.type === 'select-one') {
				const option = input.querySelector(`option[value="${input.value}"]`)
				return [input.name, option.textContent]
			}
			return [input.name, input.value]
		}),
		data = Object.fromEntries(arrayData)
	return data
}

function togglePaymentItems(option) {
	const items = Array.from($paymentOnlineItems)
	items.forEach((item) => {
		if (option > 1) {
			item.classList.remove('hidden')
		} else {
			item.classList.add('hidden')
		}
	})
}

function nofityUser({ title = 'Notificación', message = 'Mensaje' }) {
	const TIME = MAX_NOTIFICATION_TIME

	let counter = TIME / 1000,
		interval = null

	$notificationTitle.textContent = title
	interval = setInterval(() => {
		if (counter < 1) {
			clearInterval(interval)
			$notification.classList.toggle('hidden')
			$notificationTitle.textContent = ''
			$notificationMessage.textContent = ''
		}
		$notificationMessage.textContent = `${message}(${counter}s)`
		counter--
	}, 1000)
	setTimeout(() => {
		$notification.classList.toggle('hidden')
	}, 1000)
}

async function registerUser(newUser) {
	const response = await http({ url: API, body: newUser, method: 'POST' })
}

d.addEventListener('click', async (e) => {
	if (e.target.matches('[id^="submit-"]')) {
		e.preventDefault()
	}
	if (e.target.matches('#submit-general')) {
		toggleForm($formGeneral, $formAddress)
	}
	if (e.target.matches('#submit-address')) {
		toggleForm($formAddress, $formSecurity)
	}
	if (e.target.matches('#submit-security')) {
		toggleForm($formSecurity, $formPayment)
	}
	if (e.target.matches('#submit-payment')) {
		toggleForm($formPayment, null)
		e.target.value = 'Registrando...'
		e.target.style.cursor = 'not-allowed'
		e.target.style.disabled = true
		$backButton.style.visibility = 'hidden'
		disableInputs()
		setTimeout(() => {
			e.target.value = 'Registrarme'
			nofityUser({ title: 'Registro', message: 'Usuario registrado con éxito' })
		}, 2000)
		setTimeout(() => {
			location.href = '/'
		}, 2000 + MAX_NOTIFICATION_TIME)
		//await registerUser(user)
	}
	if (e.target.matches('#back-address')) {
		toggleForm($formAddress, $formGeneral)
	}
	if (e.target.matches('#back-security')) {
		toggleForm($formSecurity, $formAddress)
	}
	if (e.target.matches('#back-payment')) {
		toggleForm($formPayment, $formSecurity)
	}
})
d.addEventListener('change', (e) => {
	if (e.target.matches('#payment-type')) {
		const option = parseInt(e.target.value)
		togglePaymentItems(option)
	}
})

import { http } from './modules/http-lib.js'

const d = document,
	$formGeneral = d.getElementById('form-general'),
	$formAddress = d.getElementById('form-address'),
	$formSecurity = d.getElementById('form-security'),
	$formPayment = d.getElementById('form-payment'),
	$backButton = d.getElementById('back-payment')

const API = 'localhost:3000/clientes-registrar'
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

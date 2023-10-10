const d = document,
	$loginForm = d.getElementById('login-form'),
	$recoverForm = d.getElementById('recover-form'),
	$recoverInput = d.getElementById('recover-input'),
	$recoverPassword = d.getElementById('recover-password'),
	$recoverUser = d.getElementById('recover-user'),
	$notification = d.querySelector('.notification'),
	$notificationTitle = d.querySelector('.notification h5'),
	$notificationMessage = d.querySelector('.notification small')

const MAX_NOTIFICATION_TIME = 5000

function toggleRecoverForm() {
	$loginForm.classList.toggle('hidden')
	$recoverForm.classList.toggle('hidden')
}
function toggleRecoverItem() {
	$recoverPassword.classList.toggle('recover-option')
	$recoverUser.classList.toggle('recover-option')
}

function disableInputs(form) {
	const formInputs = form.querySelectorAll('input,select'),
		inputs = Array.from(formInputs)
	inputs.forEach((input) => {
		input.disabled = !input.disabled
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

d.addEventListener('click', (e) => {
	if (e.target.matches('.help-group-recover')) {
		toggleRecoverForm()
	}
	if (e.target.matches('.back-recover')) {
		toggleRecoverForm()
	}
	if (e.target.matches('#recover-password')) {
		$recoverInput.setAttribute('placeholder', 'Contraseña')
		toggleRecoverItem()
	}
	if (e.target.matches('#recover-user')) {
		$recoverInput.setAttribute('placeholder', 'Nombre de usuario')
		toggleRecoverItem()
	}
	if (e.target.matches('#submit-recover')) {
		e.preventDefault()
		e.target.value = 'Enviando...'
		disableInputs($recoverForm)
		setTimeout(() => {
			nofityUser({
				title: 'Recuperación',
				message: 'Se ha envíado un link de recuperación a tu correo electrónico/teléfono',
			})
			e.target.value = 'Enviar'
		}, 2000)

		setTimeout(() => {
			toggleRecoverForm()
		}, 3000 + MAX_NOTIFICATION_TIME)
	}
})

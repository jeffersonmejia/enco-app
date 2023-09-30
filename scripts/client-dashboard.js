const d = document,
	$account = d.querySelector('.account-navbar-items'),
	$packageForm = d.querySelector('.package-form-modal'),
	$packageClient = d.querySelector('.package-client'),
	$packageDescription = d.querySelector('.package-description'),
	$accountModal = d.querySelector('.account-modal')

function toggleAccountItems() {
	$account.classList.toggle('hidden')
}

function togglePackageForm() {
	$packageForm.classList.toggle('hidden')
}

function togglePackageFieldset() {
	$packageClient.classList.toggle('hidden')
	$packageDescription.classList.toggle('hidden')
}

function toggleAccountModal() {
	$accountModal.classList.toggle('hidden')
}

d.addEventListener('click', (e) => {
	if (e.target.matches('.account-navbar')) {
		toggleAccountItems()
	}
	if (e.target.matches('.new-package-button')) {
		togglePackageForm()
	}
	if (e.target.matches('#cancel-package-button')) {
		togglePackageForm()
	}
	if (e.target.matches('#next-package-button')) {
		e.preventDefault()
		togglePackageFieldset()
	}
	if (e.target.matches('#back-package-button')) {
		togglePackageFieldset()
	}
	if (e.target.matches('#close-account-modal')) {
		toggleAccountModal()
	}
	if (
		e.target.matches('#my-account-button') ||
		e.target.matches('#my-account-button *')
	) {
		toggleAccountItems()
		toggleAccountModal()
	}
	if (e.target.matches('.account-modal')) {
		toggleAccountModal()
	}
	if (e.target.matches('.close-account-modal span')) {
		toggleAccountModal()
	}
})

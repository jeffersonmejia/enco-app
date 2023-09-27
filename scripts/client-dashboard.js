const d = document,
	$account = d.querySelector('.account-navbar-items'),
	$packageForm = d.querySelector('.package-form-modal')

function toggleAccountItems() {
	$account.classList.toggle('hidden')
}

function togglePackageForm() {
	$packageForm.classList.toggle('hidden')
}

d.addEventListener('click', (e) => {
	if (e.target.matches('.account-navbar')) {
		toggleAccountItems()
	}
	if (e.target.matches('.new-package-button')) {
		togglePackageForm()
	}
	if (e.target.matches('.cancel-new-package')) {
		togglePackageForm()
	}
})

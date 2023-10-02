const d = document,
	$account = d.querySelector('.account-navbar-items'),
	$packageForm = d.querySelector('.package-form-modal'),
	$packageClient = d.querySelector('.package-client'),
	$packageDescription = d.querySelector('.package-description'),
	$accountModal = d.querySelector('.account-modal'),
	$accountEdit = d.querySelector('.modal-account-edit'),
	$accountModalItems = d.querySelector('.account-modal-items'),
	$billNumberItems = d.querySelectorAll('[data-bill-number]'),
	$billDateItems = d.querySelectorAll('[data-bill-date]')

let currentSettingSection = ''

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

function toggleAccountSection(section) {
	if (section) {
		currentSettingSection = section?.dataset.account || ''
		if (currentSettingSection.length < 1) {
			currentSettingSection = section.parentElement.dataset.account
		}
	}

	const sectionId = $accountEdit.querySelector(
		`[data-account="${currentSettingSection}"]`
	)
	$accountModalItems.classList.toggle('hidden')
	$accountEdit.classList.toggle('hidden')
	sectionId?.classList.toggle('hidden')
}

function loadBillsNumber() {
	if (window.innerWidth >= 600) {
		$billNumberItems.forEach((bill) => {
			const number = bill.dataset.billNumber
			bill.innerHTML = number
		})
	} else {
		$billNumberItems.forEach((bill) => {
			const number = bill.dataset.billNumber,
				sliced = number.slice(-4)
			bill.innerHTML = `...${sliced}`
		})
	}
}

function loadBillDate() {
	const currentDate = new Date(),
		currentMonth = currentDate.getMonth() + 1,
		currentDay = currentDate.getDay() + 1

	$billDateItems.forEach((bill) => {
		let [year, month, day] = bill.dataset.billDate.split('-')
		year = parseInt(year)
		month = parseInt(month)
		day = parseInt(day)

		const monthDif = currentMonth - month,
			dayDif = currentDay - day
		if (dayDif !== 0) {
			if (dayDif === 1) {
				bill.innerHTML = `Hace ${dayDif} día`
			}
			if (dayDif > 1) {
				bill.innerHTML = `Hace ${dayDif} días`
			}
		}
		if (monthDif !== 0) {
			if (monthDif === 1) {
				bill.innerHTML = `Hace ${monthDif} mes`
			}
			if (monthDif > 1) {
				bill.innerHTML = `Hace ${monthDif} meses`
			}
		}
		if (month < 9) {
			month = `0${month}`
		}
		if (day < 9) {
			day = `0${day}`
		}
		bill.style.cursor = 'pointer'
		bill.title = `${year}-${month}-${day}`
	})
}

d.addEventListener('DOMContentLoaded', (e) => {
	loadBillDate()
	loadBillsNumber()
})

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
	if (
		e.target.matches('.account-modal-items li') ||
		e.target.matches('.account-modal-items li *')
	) {
		toggleAccountSection(e.target)
	}
	if (e.target.matches('.back-account-button')) {
		toggleAccountSection()
	}
	if (e.target.matches('.edit-button')) {
		const parent = e.target.parentElement
		const input = parent.querySelector('input')
		console.log(e.target)
		e.target.textContent = e.target.textContent === 'edit' ? 'save' : 'edit'
		parent.classList.toggle('input-edit-group-active')
		input.disabled = !input.disabled
	}
})

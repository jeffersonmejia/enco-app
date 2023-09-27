const d = document,
	$account = d.querySelector('.account-navbar-items')

function toggleAccountItems() {
	$account.classList.toggle('hidden')
}

d.addEventListener('click', (e) => {
	if (e.target.matches('.account-navbar')) {
		toggleAccountItems()
	}
})

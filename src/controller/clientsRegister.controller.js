function indexController(req, res) {
	res.sendFile('clients-register.html', { root: 'src/public' })
}

module.exports = indexController

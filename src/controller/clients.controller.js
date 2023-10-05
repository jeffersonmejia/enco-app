function indexController(req, res) {
	res.sendFile('clients.html', { root: 'src/public' })
}

module.exports = indexController

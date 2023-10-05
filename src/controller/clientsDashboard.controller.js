function indexController(req, res) {
	res.sendFile('clients-dashboard.html', { root: 'src/public' })
}

module.exports = indexController

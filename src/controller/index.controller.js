function indexController(req, res) {
	res.sendFile('index.html', { root: 'src/public' })
}

module.exports = indexController

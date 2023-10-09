const app = require('express'),
	router = app.Router(),
	indexController = require('../controller/index.controller'),
	clientsController = require('../controller/clients.controller'),
	clientsDashboard = require('../controller/clientsDashboard.controller'),
	clientsRegister = require('../controller/clientsRegister.controller')

router.get('/', indexController)
router.get('/clientes', clientsController)
router.post('/clientes-panel', clientsDashboard)
router.get('/clientes-registrar', clientsRegister)

module.exports = router

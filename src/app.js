const express = require('express'),
	app = express()

app.use(express.static('src/public'))
module.exports = app

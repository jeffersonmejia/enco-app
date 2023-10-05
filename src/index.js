const app = require('./app'),
	port = process.env.PORT ?? 3000,
	router = require('./routes/index')

app.use(router)
app.listen(port, () => {
	console.log(`Server listening at: ${port}`)
})

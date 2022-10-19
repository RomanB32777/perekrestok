const express = require('express')
const app = express()
const fileupload = require("express-fileupload")

const vacancyRouter = require('./routes/vacancy.routes')
const cityController = require('./routes/city.routes')

const cors = require('cors')

const http = require('http');
const server = http.createServer(app);

app.use(cors())
app.use(fileupload())
app.use(express.json())
app.use('/images', express.static(__dirname + '/images'))
app.use('/api/city/', cityController)
app.use('/api/vacancy/', vacancyRouter)

async function start() {
	try {
		const port = process.env.PORT || 4000
		server.listen(port, () => console.log(`App has been started on port ${port}...`))
	} catch (e) {
		console.log('Server error', e.message)
		process.exit(1)
	}
}

start()
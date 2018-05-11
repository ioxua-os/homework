import * as express from 'express'

const app: express.Application = express()
const port: number = Number(process.env.PORT) || 3000;

app.get('/', (req, res) => {
	res.send("olar")
})

app.listen(port, () => {
	console.log("Listening on PORT:", port)
})
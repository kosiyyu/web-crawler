import express from 'express'
import asyncFetchPeeref from './webcrawler.js'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.get('/:value', async (req, res) => {
    const value = req.params.value
    try {
        const data = await asyncFetchPeeref(value)
        res.json(data)
    } catch (error) {
        res.status(500).send('Fetch error')
    }
})

app.listen(port, () => {
    console.log("\x1b[32m%s\x1b[0m",`Server is running 🏃 at port: ${port}`)
})
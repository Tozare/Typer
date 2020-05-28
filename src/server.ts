import express from 'express'
import { Request, Response } from 'express'
import fs from 'fs'

const app = express()

app.use(express.static('./builds/app/'))

const PORT = process.env.PORT || 3001

app.get('/*', (req: Request, res: Response) => {
    fs.readFile('./builds/app/index.html', 'utf8', (err, data) => {
        res.send(data)
    })
})

app.listen(PORT, () => {
    console.log('server started at http://localhost:' + PORT)
})






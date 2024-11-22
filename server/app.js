import express from 'express'
import cors from 'cors';

import routerLogin from './controller/login.js'

// import { executeQuery } from './module/db.js';

// const query = `SELECT * FROM producto`
// const result = await executeQuery(query)
//
// console.log(result.rows)

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/login', routerLogin)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})


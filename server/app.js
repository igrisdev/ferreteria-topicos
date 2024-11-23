import express from 'express'
import cors from 'cors';

import routerLogin from './controller/login.js'
import routerEmpleadoBodega from './controller/empleadoBodega.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', routerLogin)
app.use('/api', routerEmpleadoBodega)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})


import express from 'express'
import cors from 'cors';

import routerLogin from './router/loginRouter.js'
import routerEmpleadoBodega from './router/empleadoBodegaRouter.js'
import routerProveedorBodega from './router/proveedorBodegaRouter.js'
import routerEmpleadosAdmin from './router/empledosAdminRouter.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', routerLogin)
app.use('/api', routerEmpleadoBodega)
app.use('/api', routerProveedorBodega)
app.use('/api', routerEmpleadosAdmin)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})


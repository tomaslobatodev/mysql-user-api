import express from 'express'
import usersRoutes from './routes/users.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

app.use(indexRoutes)
app.use('/api', usersRoutes)

app.listen(port, () => console.log(`http://localhost:${port}`))

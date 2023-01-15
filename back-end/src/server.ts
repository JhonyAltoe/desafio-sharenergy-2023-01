import express from 'express'
import { connectToDatabase } from './infra/repositories/connect'
import { router } from './main/routes/router'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

connectToDatabase()
  .then(() => {
    app.listen(3333, () => { console.log('server running on port 3333') })
  })
  .catch((error) => {
    console.log('Connection with database generated an error:\r\n')
    console.error(error)
    console.log('\r\nServer initialization cancelled')
    process.exit(0)
  })

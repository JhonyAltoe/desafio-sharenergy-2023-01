import express from 'express'
import { connectToDatabase } from './infra/repositories/connect'
import { router } from './main/routes/router'

const app = express()

app.use(express.json())

// route.get('/', (_req: Request, res: Response) => {
//   res.json({ message: 'hello world with Typescript' })
// })

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

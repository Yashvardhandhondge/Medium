import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { userRoute } from './routes/user'
import { postRoute } from './routes/blog'
import { cors } from 'hono/cors'
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_KEY: string
  }
}>()

app.use("/*", cors())

app.route("api/v1/user",userRoute)
app.route("api/v1/blog",postRoute)
 
export default app
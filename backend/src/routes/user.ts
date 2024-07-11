import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
// import z from "zod"


import { signupInput } from '@yashvardhandhondge/medium';
// const signinInput = z.object({
//     username:z.string().email(),
//     password:z.string().min(6),
//     name:z.string().optional()
// }) 

export const userRoute = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_KEY: string
    }
  }>();



userRoute.post('/signup', async (c) => {
    console.log("hh");
    
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json()
    const {success} = signupInput.safeParse(body)
    if(!success){
        c.status(411)
        return c.json({
            message:"Inputs not correct"
        })
    }
    console.log('Request Body:', body)
  
    try {
      const { email, password } = body
      const oldUser = await prisma.user.findUnique({
        where: { email }
      })
  
      if (oldUser) {
        c.status(409) 
        return c.json({ error: "User already exists" })
      }
  
      const newUser = await prisma.user.create({
        data: { email, password }
      })
      console.log('New User:', newUser)
  
      const jwt = await sign({ id: newUser.id }, c.env.JWT_KEY)
      return c.json({ jwt })
  
    } catch (e) {
      console.error('Error during user signup:', e)
      c.status(500) 
      return c.json({ error: "Internal server error" })
    } finally {
      await prisma.$disconnect()
    }
  })
  
  userRoute.post('signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate())
  
    const body = await c.req.json()
    console.log('Request Body:', body)
  
    try {
      const user = await prisma.user.findUnique({
        where: { email: body.email }
      })
  
      if (!user) {
        c.status(404) 
        return c.json({ error: "User not found" })
      }
  
      if (user.password !== body.password) {
        c.status(403) 
        return c.json({ error: "Invalid credentials" })
      }
  
      const jwt = await sign({ id: user.id }, c.env.JWT_KEY)
      return c.json({ jwt })
  
    } catch (e) {
      console.error('Error during user signin:', e)
      c.status(500) 
      return c.json({ error: "Internal server error" })
    } finally {
      await prisma.$disconnect()
    }
  })
  

  
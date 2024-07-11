import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';

export const postRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_KEY: string;
  };
  Variables: {
    userId?: string;
  };
}>();


postRoute.use('/*', async (c, next) => {
  const token = c.req.header('authorization') || '';

  try {
    const user = await verify(token, c.env.JWT_KEY);
    if (user) {
      c.set('userId', user.id as string);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: 'You are not logged in',
      });
    }
  } catch (error) {
    console.error('JWT verification error:', error);
    c.status(403);
    return c.json({
      message: 'Invalid token',
    });
  }
});


postRoute.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const authorId = c.get('userId'); 

    if (!authorId) {
      c.status(403);
      return c.json({ error: 'User not authenticated' });
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId, 
      },
    });

    await prisma.$disconnect();
    return c.json({
      id: blog.id,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    c.status(500);
    return c.json({ error: 'Internal server error' });
  }
});

postRoute.put('/', async (c) => {
  try {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    await prisma.$disconnect();
    return c.json({
      id: blog.id,
    });
  } catch (error) {
    console.error('Error updating post:', error);
    c.status(500);
    return c.json({ error: 'Internal server error' });
  }
});




postRoute.get('/bulk', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    console.log("hi");
    
    const blogs = await prisma.post.findMany({
      select:{
        content:true,
        title:true,
        id:true,
        author:{
          select:{
            name:true
          }
        }
      }
    });
    
    await prisma.$disconnect();
    return c.json({
      blogs,
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    c.status(500);
    return c.json({ error: 'Internal server error' });
  }
});

postRoute.get('/:id', async (c) => {
  try {
    const postId = c.req.param("id");
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      select:{
        id:true,
        title:true,
        content:true,
        author:{
          select:{
            name:true
          }
        }
      }
    });

    await prisma.$disconnect();
    return c.json({
      blog,
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    c.status(500);
    return c.json({ error: 'Internal server error' });
  }
});

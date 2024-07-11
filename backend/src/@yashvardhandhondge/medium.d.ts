// @yashvardhandhondge/medium.d.ts

import * as z from 'zod';

export const signupInput: z.ZodObject<{
  username: z.ZodString;
  password: z.ZodString;
  name?: z.ZodString | undefined;
}>;

export type SignupInput = z.infer<typeof signupInput>;

export const signinInput: z.ZodObject<{
  username: z.ZodString;
  password: z.ZodString;
}>;

export type SigninInput = z.infer<typeof signinInput>;

export const createBlogInput: z.ZodObject<{
  title: z.ZodString;
  content: z.ZodString;
}>;

export type CreateBlogInput = z.infer<typeof createBlogInput>;

export const updateBlogInput: z.ZodObject<{
  title: z.ZodString;
  content: z.ZodString;
  id: z.ZodString;
}>;

export type UpdateBlogInput = z.infer<typeof updateBlogInput>;

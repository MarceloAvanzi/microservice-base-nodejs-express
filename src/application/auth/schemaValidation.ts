import { z } from 'zod';

export const loginSchema = z.object({
  data: z.object({
    attributes: z.object({
      email: z.string().email('Invalid email').min(1),
      password: z.string().min(6, 'Password must be at least 6 characters long'),
    })
  })
});

export const registerSchema = z.object({
  data: z.object({
    attributes: z.object({
      name: z.string().min(6, 'Name must be at least 6 characters long'),
      email: z.string().email('Invalid email').min(1),
      password: z.string().min(6, 'Password must be at least 6 characters long'),
    })
  })
});

export const forgotPasswordSchema = z.object({
  data: z.object({
    attributes: z.object({
      email: z.string().email('Invalid email').min(1),
    })
  })
});

export const passwordResetSchema = z.object({
  data: z.object({
    attributes: z.object({
      email: z.string().email('Invalid email').min(1),
      token: z.string().min(30, 'Token must be valid'),
      password: z.string().min(6, 'Password must be at least 6 characters long'),
      password_confirmation: z.string(),
    }).refine((data) => data.password === data.password_confirmation, {
      message: 'Passwords must match',
      path: ['password_confirmation'], // Specify the path for the error message
    })
  })
});
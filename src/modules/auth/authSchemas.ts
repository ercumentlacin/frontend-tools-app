import z from 'zod';

export const register = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(1, 'Name must be at least 1 character')
      .max(50, 'Name must be less than 50 characters'),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Email must be a valid email address'),
    avatar: z.string().url('Avatar must be a valid URL').optional(),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be less than 20 characters'),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

export const login = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Email must be a valid email address'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be less than 20 characters'),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

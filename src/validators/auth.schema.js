import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  mobileNum: z.string().regex(/^[0-9]{10}$/, { message: 'Mobile number must be 10 digits long' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  NIC: z.string().min(5, { message: 'NIC must be at least 5 characters long' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export const verifyEmailSchema = z.object({
  userId: z.string().min(24, { message: 'Invalid user ID format' }),
});

import * as z from 'zod';
import { ZodSchema } from 'zod';

export const profileSchema = z.object({
  // firstName: z.string().max(5, { message: 'max length is 5' }),
  firstName: z
    .string()
    .min(2, { message: 'first name must be at least 2 characters' }),
  lastName: z
    .string()
    .min(2, { message: 'last name must be at least 2 characters' }),
  username: z
    .string()
    .min(2, { message: 'username must be at least 2 characters' }),
});

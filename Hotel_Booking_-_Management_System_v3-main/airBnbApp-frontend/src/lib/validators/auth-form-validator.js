import {z} from 'zod'

const signUpSchema = z.object({
  name: z
    .string()
    .nonempty('Please enter a valid name')
    .min(2, 'Name must be of at least 2 characters')
    .max(30, 'Name must be less than 30 characters long'),
  email: z.string().email('Please enter a valid email'),
  password: z
    .string()
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,30}$/, {
      message:
        'Password must be 8-30 characters with uppercase, lowercase, number, special character.',
    }),
});

const signInSchema = signUpSchema.omit({name: true});

export {signInSchema, signUpSchema};

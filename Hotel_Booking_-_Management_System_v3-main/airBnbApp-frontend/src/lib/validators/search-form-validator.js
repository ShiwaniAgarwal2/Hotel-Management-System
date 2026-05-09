import {z} from 'zod'

const searchFormSchema = z.object({
  city: z.string().nonempty(),
  bookingDates: z.object({
  from: z.date().nullable(),
  to: z.date().nullable(),
}).refine(
  (val) => val.from && val.to,
  { message: 'Select check-in and check-out dates' }
),

  roomsCount: z.number().min(1).max(10),
});

export {searchFormSchema};

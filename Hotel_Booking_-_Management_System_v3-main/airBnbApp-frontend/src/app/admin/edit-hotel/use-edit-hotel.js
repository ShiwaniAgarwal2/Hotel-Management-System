import { ERROR_FALLBACK } from '@/config/app.config';
import useMutation from '@/lib/hooks/useMutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

const CreateHotelSchema = z.object({
  name: z.string().min(1, 'Hotel Name is required'),
  city: z.string().min(1, 'City is required'),
  photos: z.array(z.string()),
  amenities: z.array(z.string()).nonempty('Amenities are required'),
  address: z.string().min(1, 'Address is required'),
  location: z.string().min(1, 'Location is required'),
  phoneNumber: z.string().min(1, 'Contact Number is required'),
  email: z.string().min(1, 'Email is required'),
});

export default function useEditHotelForm(hotel) {
  const { hotelId } = useParams();
  const { mutate, pending } = useMutation(`/admin/hotels/${hotelId}`, 'PUT');

  const form = useForm({
    resolver: zodResolver(CreateHotelSchema),
    defaultValues: {
      name: hotel.name,
      city: hotel.city,
      photos: hotel.photos,
      amenities: hotel.amenities,
      address: hotel.contactInfo.address,
      location: hotel.contactInfo.location,
      phoneNumber: hotel.contactInfo.phoneNumber,
      email: hotel.contactInfo.email,
    },
  });

  const updateHotelHandler = (data) => {
    const apiBody = {
      name: data.name,
      city: data.city,
      photos: data.photos,
      amenities: data.amenities,
      contactInfo: {
        address: data.address,
        phoneNumber: data.phoneNumber,
        email: data.email,
        location: data.location,
      },
      active: hotel.active,
    };

    mutate(apiBody, {
      onSuccess: () => {
        toast('Hotel details updated successfully', {
          type: 'success',
        });
      },
      onError: (error) => {
        toast(error.message || ERROR_FALLBACK.TITLE, {
          description: ERROR_FALLBACK.DESCRIPTION,
          type: 'error',
        });
      },
    });
  };

  return { form, pending, updateHotelHandler };
}

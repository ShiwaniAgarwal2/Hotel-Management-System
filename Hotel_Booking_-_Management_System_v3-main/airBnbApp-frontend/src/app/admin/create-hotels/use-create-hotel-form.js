import useMutation from '@/lib/hooks/useMutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

const CreateHotelSchema = z.object({
  name: z.string().min(1, 'Hotel name is required'),
  city: z.string().min(1, 'City name is required'),
  photos: z.array(z.string()).nonempty('Hotel Photos are required'),
  amenities: z.array(z.string()).nonempty('Amenities are required'),
  address: z.string().min(1, 'Address is required'),
  location: z.string().min(1, 'Location is required'),
  phoneNumber: z.string().min(1, 'Contact Number is required'),
  email: z.string().email('Email is invalid'),
});

export function useCreateHotelForm() {
  const navigate = useNavigate();
  const { mutate, pending } = useMutation('/admin/hotels', 'POST');
  const form = useForm({
    resolver: zodResolver(CreateHotelSchema),
    defaultValues: {
      name: '',
      city: '',
      photos: [
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/656022653.jpg?k=ec44f82162e7354b457c97f6786102a32f739d97d4973ad30ad7565c55f02848&o=',
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/625615935.jpg?k=376e2a6ba250aec1226b659f0b90a846d4bc6f0ba4f017e679fd782981c5dbcb&o=',
      ],
      amenities: [],
      address: '',
      location: '',
      phoneNumber: '',
      email: '',
    },
  });

  const createHotelHandler = (data) => {
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
    };

    mutate(apiBody, {
      onSuccess: (response) => {
        toast('Hotel created successfully', {
          type: 'success',
        });
        navigate(`/admin/hotels/${response.data.id}`);
      },
      onError: (error) => {
        toast(error.message, {
          type: 'error',
        });
      },
    });
  };

  return { form, createHotelHandler, pending };
}

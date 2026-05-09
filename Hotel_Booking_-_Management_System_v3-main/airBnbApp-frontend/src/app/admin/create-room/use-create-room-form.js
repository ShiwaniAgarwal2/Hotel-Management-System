import useMutation from '@/lib/hooks/useMutation';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

const CreateRoomSchema = z.object({
  type: z.string().min(1, 'Room type is required'),
  basePrice: z.coerce.number().min(1, 'Base price is required'),
  photos: z.array(z.string()).nonempty('Hotel Photos are required'),
  amenities: z.array(z.string()).nonempty('Amenities are required'),
  totalCount: z.coerce.number().min(1, 'Total count is required'),
  capacity: z.coerce.number().min(1, 'Capacity is required'),
});
function useCreateRoomForm() {
  const navigate = useNavigate();
  const { hotelId } = useParams();
  const { mutate, pending } = useMutation(
    `/admin/hotels/${hotelId}/rooms`,
    'POST'
  );
  const form = useForm({
    resolver: zodResolver(CreateRoomSchema),
    defaultValues: {
      type: '',
      basePrice: 0,
      photos: [
        'https://images.oyoroomscdn.com/uploads/hotel_image/47524/thumb/fggonvthomuo.jpg',
      ],
      amenities: [],
      totalCount: 0,
      capacity: 0,
    },
  });
  const createRoomHandler = React.useCallback(
    (data) => {
      mutate(data, {
        onSuccess: () => {
          toast('Room created successfully', {
            type: 'success'
          });
          navigate(`/admin/hotels/${hotelId}/rooms`);
        },
        onError: (error) => {
           toast(error.message, {
             type: 'error',
           });
        },
      });
    },
    [form]
  );
  return {
    form,
    createRoomHandler,
    pending,
  };
}

export default useCreateRoomForm;

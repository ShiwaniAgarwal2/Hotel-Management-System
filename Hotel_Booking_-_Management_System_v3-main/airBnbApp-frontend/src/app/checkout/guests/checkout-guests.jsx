import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import API_CONFIG from '@/config/api.config';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import AddGuestsDialog from './add-guests-dialog';
import useMutation from '@/lib/hooks/useMutation';

const CheckoutGuests = ({ guests, bookingId }) => {
  const [bookingGuests, setBookingGuests] = useState([]);
  const { mutate, pending } = useMutation(
    API_CONFIG.BOOKING.REMOVE_GUEST.URL(bookingId),
    API_CONFIG.BOOKING.ADD_GUEST.METHOD
  );
  const removeGuestHandler = (id) => {
    mutate([id], {
      onSuccess: (response) => {
        setBookingGuests(response.data.guests);
        toast('Guest removed successfully', {
          type: 'success',
        });
      },
      onError: (error) => {
        toast(error.status || ERROR_FALLBACK.TITLE, {
          type: 'error',
        });
      },
    });
  };

  return (
    <div className="px-4 space-y-4">
      <h3 className="text-base font-semibold">Guest Details</h3>
      {bookingGuests.length > 0 && (
        <ul className="grid grid-cols-2 gap-6">
          {bookingGuests.map((guest, index) => (
            <li
              key={index}
              className="flex items-center justify-between pb-2 border-b"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center rounded-full w-7 h-7 bg-secondary">
                  <span className="text-sm font-medium leading-4 uppercase">
                    {guest.name.charAt(0)}
                  </span>
                </div>
                <p className="text-sm font-medium">{guest.name}</p>
              </div>
              <Button
                size="icon"
                className="w-6 h-6"
                variant="ghost"
                aria-label="Remove guest"
                disabled={pending}
                onClick={() => removeGuestHandler(guest.id)}
              >
                <Icon icon="close" size={16} />
              </Button>
            </li>
          ))}
        </ul>
      )}
      <AddGuestsDialog
        bookingId={bookingId}
        bookingGuests={bookingGuests}
        setBookingGuests={setBookingGuests}
      />
    </div>
  );
};

export default CheckoutGuests;

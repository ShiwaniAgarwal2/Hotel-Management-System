import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import API_CONFIG from '@/config/api.config';
import useMutation from '@/lib/hooks/useMutation';

import React from 'react';
import { toast } from 'sonner';

const InitiatePaymentsButton = ({id}) => {
  const { mutate, pending } = useMutation(
    API_CONFIG.BOOKING.PAYMENT_BOOKING.URL(id),
    API_CONFIG.BOOKING.PAYMENT_BOOKING.METHOD
  );
  const initiatePayment = () => {
    mutate(null, {
      onSuccess: (response) => {
        window.location.href = response.data.sessionUrl;
      },
      onError: (error) => {
        toast('Error: ' + error.status, {
          type: 'error',
          description: error.message,
        });
      },
    });
  };

  return (
    <Button
      onClick={initiatePayment}
      size="lg"
      disabled={pending}
      className="w-full h-12 shadow-lg uppercase text-base font-semibold transition-opacity  bg-purple-700 hover:bg-purple-700/80"
    >
      <Icon size="30" icon="shield" />
      Proceed to Pay
    </Button>
  );
};

export default InitiatePaymentsButton;

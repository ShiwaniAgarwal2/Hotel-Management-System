import React from 'react';
import usePollPaymentStatus from './hooks/use-poll-payment-status';
import { BOOKING_STATUS, PAYMENT_STATUS_CONFIG } from '@/config/payment.config';
import { LinkWithIcon } from '@/components/ui/link';
const PaymentStatus = () => {
  const { paymentStatus } = usePollPaymentStatus();

  return (
    <div className="container flex items-center justify-center py-16">
      <div className="flex flex-col items-center justify-center max-w-lg gap-4">
        <div className="flex flex-col items-center justify-center w-full h-24 max-w-52">
          {PAYMENT_STATUS_CONFIG[paymentStatus].icon}
        </div>
        <div className="space-y-2">
          <h1
            className={`text-xl font-bold text-center ${PAYMENT_STATUS_CONFIG[paymentStatus].className}`}
          >
            {PAYMENT_STATUS_CONFIG[paymentStatus].title}
          </h1>
          <p className="text-base font-medium text-center text-muted-foreground">
            {PAYMENT_STATUS_CONFIG[paymentStatus].description}
          </p>
        </div>
        {paymentStatus === BOOKING_STATUS.ERROR && (
          <div>
            <p className="text-sm leading-normal text-center">
              Need help? Please reach out to us at{' '}
              <a
                href="mailto:support@example.com"
                className="text-primary hover:underline"
              >
                support@example.com
              </a>
              . Our team will get back to you as soon as possible.
            </p>
          </div>
        )}
        {paymentStatus === BOOKING_STATUS.CONFIRMED && (
          <LinkWithIcon to={'/me/booking-history'} icon="bookingHistory">
            View Booking History
          </LinkWithIcon>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;

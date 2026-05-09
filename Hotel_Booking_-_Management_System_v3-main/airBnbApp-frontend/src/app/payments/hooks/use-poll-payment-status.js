import API_CONFIG from '@/config/api.config';
import { BOOKING_STATUS } from '@/config/payment.config';
import axiosInstance from '@/lib/axios-instance';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';

function usePollPaymentStatus() {
  const { bookingId } = useParams();
  const MAX_RETRIES = 20;
  const POLLING_DELAY = 5000;

  const [maxRetries, setMaxRetries] = React.useState(MAX_RETRIES);
  const [paymentStatus, setPaymentStatus] = React.useState(
    BOOKING_STATUS.PROCESSING
  );

  async function getPaymentStatus() {
    try {
      const { data } = await axiosInstance.get(
        API_CONFIG.BOOKING.STATUS_BOOKING.URL(bookingId)
      );

      if (
        [
          BOOKING_STATUS.CONFIRMED,
          BOOKING_STATUS.CANCELLED,
          BOOKING_STATUS.EXPIRED,
        ].includes(data.bookingStatus)
      ) {
        setMaxRetries(0);
        setPaymentStatus(data.bookingStatus);
        return;
      }

      setMaxRetries((prev) => prev - 1);
    } catch (err) {
      console.log('error occurred: ', err);
    }
  }

  useEffect(() => {
    if (maxRetries <= 0) {
      setPaymentStatus(BOOKING_STATUS.ERROR);
    }

    const timeoutId = setTimeout(getPaymentStatus, POLLING_DELAY);
    return () => clearTimeout(timeoutId);
  }, [maxRetries]);

  useEffect(() => {
    getPaymentStatus();
  }, []);

  return { paymentStatus };
}

export default usePollPaymentStatus;

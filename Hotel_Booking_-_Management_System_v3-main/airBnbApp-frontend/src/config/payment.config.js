export const BOOKING_STATUS = {
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED',
  ERROR: 'ERROR',
  PROCESSING: 'PROCESSING',
  MAX_RETRIES_EXCEEDED: 'MAX_RETRIES_EXCEEDED',
};

export const PAYMENT_STATUS_CONFIG = {
  [BOOKING_STATUS.PROCESSING]: {
    title: 'Processing Your Payment',
    className: '',
    description:
      'Please wait while we securely process your transaction. Do not refresh or close this page.',
    // icon: <LoadingBar />,
  },
  [BOOKING_STATUS.CONFIRMED]: {
    title: 'Payment Successful',
    className: 'text-green-600',
    description:
      'Your payment was successfully processed. You will receive an email confirmation shortly.',
    // icon: <BellElectricIcon />
  },
  [BOOKING_STATUS.ERROR]: {
    className: 'text-red-600',
    title: 'Payment Failed',
    description: 'Your payment was not successful. Please try again.',
    // icon: <Building2Icon />
  },
  [BOOKING_STATUS.CANCELLED]: {
    className: 'text-amber-600',
    title: 'Payment Cancelled',
    description:
      'Your payment was cancelled. If this was a mistake, please try again.',
    // icon: <CandyCane />
  },
  [BOOKING_STATUS.EXPIRED]: {
    className: 'text-gray-600',
    title: 'Payment Expired',
    description:
      'Your payment session has expired. Please initiate a new payment.',
    // icon: <Rocket />
  },
  [BOOKING_STATUS.MAX_RETRIES_EXCEEDED]: {
    className: 'text-orange-600',
    title: 'Payment Processing Failed',
    description:
      'We were unable to process your payment at this time. Please contact our support team for further assistance.',
    // icon: <PlaneTakeoffIcon />
  },
};

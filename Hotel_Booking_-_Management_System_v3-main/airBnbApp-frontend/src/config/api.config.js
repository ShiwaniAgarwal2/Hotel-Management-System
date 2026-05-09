const API_CONFIG = {
  HOTEL: {
    BROWSE_HOTELS: '/hotels/search',
    HOTEL_INFO: {
      URL: (hotelId) => `/hotels/${hotelId}/info`,
    },
  },
  AUTH: {
    SIGN_IN: '/auth/login',
    SIGN_UP: '/auth/signup',
    LOGOUT: '/auth/logout',
  },
  USER: {
    PROFILE: '/users/profile',
    BOOKING_HISTORY: '/users/myBookings',
  },
  BOOKING: {
    INIT_BOOKING: {
      METHOD: 'POST',
      URL: '/bookings/init',
    },
    ADD_GUEST: {
      METHOD: 'POST',
      URL: (bookingId) => `/bookings/${bookingId}/addGuests`,
    },
    REMOVE_GUEST: {
      METHOD: 'POST',
      URL: (bookingId) => `/bookings/${bookingId}/removeGuests`,
    },
    PAYMENT_BOOKING: {
      METHOD: 'POST',
      URL: (bookingId) => `/bookings/${bookingId}/payments`,
    },
    STATUS_BOOKING: {
      METHOD: 'GET',
      URL: (bookingId) => `/bookings/${bookingId}`,
    },
    CANCEL_BOOKING: {
      METHOD: 'POST',
      URL: (bookingId) => `/bookings/${bookingId}/cancel`,
    },
  },
  TRAVELLER: {
    GET_TRAVELLERS: '/users/guests',
    ADD_TRAVELLER: {
      METHOD: 'POST',
      URL: '/users/guests',
    },
    UPDATE_TRAVELLER: {
      METHOD: 'PUT',
      URL: (guestId) => `/users/guests/${guestId}`,
    },
    DELETE_TRAVELLER: {
      METHOD: 'DELETE',
      URL: (guestId) => `/users/guests/${guestId}`,
    },
  },
};

export default API_CONFIG;

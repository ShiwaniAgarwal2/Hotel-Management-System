import API_CONFIG from '@/config/api.config';
import useQuery from '@/lib/hooks/useQuery';

function useGetBookingHistory() {
  const { data, pending, error } = useQuery({
    url: API_CONFIG.USER.BOOKING_HISTORY,
  });

  return { data, pending, error };
}

export default useGetBookingHistory;

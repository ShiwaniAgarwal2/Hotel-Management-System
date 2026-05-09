import { SEARCH_PARAMS_KEYS } from '@/config/app.config';
import { useSearchParams } from 'react-router';

function useHotelNavigation(id) {
  const [searchParams] = useSearchParams();
  const queries = {
    city: searchParams.get(SEARCH_PARAMS_KEYS.LOCATION) || '',
    startDate: searchParams.get(SEARCH_PARAMS_KEYS.CHECKIN),
    endDate: searchParams.get(SEARCH_PARAMS_KEYS.CHECKOUT),
    roomsCount: searchParams.get(SEARCH_PARAMS_KEYS.ROOMS),
  };
  const params = new URLSearchParams(queries);
  return `/hotels/${id}?${params.toString()}`;
}

export default useHotelNavigation;

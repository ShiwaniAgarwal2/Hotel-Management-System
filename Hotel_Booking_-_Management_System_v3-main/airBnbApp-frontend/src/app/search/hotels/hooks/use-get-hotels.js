import API_CONFIG from '@/config/api.config';
import {
  SEARCH_PARAMS_KEYS,
  SEARCH_RESULT_PAGE_LIMIT,
} from '@/config/app.config';
import useQuery from '@/lib/hooks/useQuery';
import { useSearchParams } from 'react-router';

function useGetHotels() {
  const [searchParams] = useSearchParams();
  const city = searchParams.get(SEARCH_PARAMS_KEYS.LOCATION);

  const {
    data,
    pending,
    error,
  } = useQuery({
    url: API_CONFIG.HOTEL.BROWSE_HOTELS,
    options: {
      params: {
        city: searchParams.get(SEARCH_PARAMS_KEYS.LOCATION),
        startDate: searchParams.get(SEARCH_PARAMS_KEYS.CHECKIN),
        endDate: searchParams.get(SEARCH_PARAMS_KEYS.CHECKOUT),
        roomsCount: searchParams.get(SEARCH_PARAMS_KEYS.ROOMS),
        page: (searchParams.get(SEARCH_PARAMS_KEYS.PAGE) || 1) - 1,
        size: SEARCH_RESULT_PAGE_LIMIT,
      },
    },
  });

  return { data, pending, error, city };
}

export default useGetHotels;

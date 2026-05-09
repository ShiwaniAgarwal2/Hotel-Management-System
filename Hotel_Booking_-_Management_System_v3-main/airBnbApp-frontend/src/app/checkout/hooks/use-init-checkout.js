import API_CONFIG from "@/config/api.config";
import { SEARCH_PARAMS_KEYS } from "@/config/app.config";
import useQuery from "@/lib/hooks/useQuery";
import { useParams, useSearchParams } from "react-router";

function useInitCheckout() {
  const {id} = useParams();
  const [searchParams] = useSearchParams();

  const {data, pending, error} = useQuery({
    url: API_CONFIG.BOOKING.INIT_BOOKING.URL,
    options: {
      method: API_CONFIG.BOOKING.INIT_BOOKING.METHOD,
      data: {
        checkInDate: searchParams.get(SEARCH_PARAMS_KEYS.CHECKIN),
        checkOutDate: searchParams.get(SEARCH_PARAMS_KEYS.CHECKOUT),
        roomsCount: searchParams.get(SEARCH_PARAMS_KEYS.ROOMS),
        roomId: searchParams.get(SEARCH_PARAMS_KEYS.SELECTED_ROOM),
        hotelId: id,
      },
    },
  });

  return {data, pending, error};
}

export default useInitCheckout;
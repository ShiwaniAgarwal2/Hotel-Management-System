import { SEARCH_PARAMS_KEYS } from '@/config/app.config';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, useSearchParams } from 'react-router';

function useConfirmCheckout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const roomsCount = parseInt(searchParams.get(SEARCH_PARAMS_KEYS.ROOMS)) || 1;

  const form = useForm({
    defaultValues: {
      roomsCount,
      bookingDates: {
        from: dayjs(searchParams.get(SEARCH_PARAMS_KEYS.CHECKIN)).toDate(),
        to: dayjs(searchParams.get(SEARCH_PARAMS_KEYS.CHECKOUT)).toDate(),
      },
    },
  });

  const handleUpdateDetailsFormSubmit = (data) => {
    searchParams.set(
      SEARCH_PARAMS_KEYS.CHECKIN,
      dayjs(data.bookingDates.from).format('YYYY-MM-DD')
    );
    searchParams.set(
      SEARCH_PARAMS_KEYS.CHECKOUT,
      dayjs(data.bookingDates.to).format('YYYY-MM-DD')
    );
    searchParams.set(SEARCH_PARAMS_KEYS.ROOMS, data.roomsCount);
    setSearchParams(searchParams);

    form.reset(data);
  };

  const handleCheckoutConfirm = () => {
    const queries = {
      city: searchParams.get(SEARCH_PARAMS_KEYS.LOCATION) || '',
      startDate: searchParams.get(SEARCH_PARAMS_KEYS.CHECKIN),
      endDate: searchParams.get(SEARCH_PARAMS_KEYS.CHECKOUT),
      roomsCount: searchParams.get(SEARCH_PARAMS_KEYS.ROOMS),
      selected_rcid: searchParams.get(SEARCH_PARAMS_KEYS.SELECTED_ROOM),
    };

    const params = new URLSearchParams(queries);
    const url = `/hotels/${id}/checkout?${params.toString()}`;
    navigate(url);
  }

  return { form, handleUpdateDetailsFormSubmit, handleCheckoutConfirm };
}

export default useConfirmCheckout;

import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { SEARCH_PARAMS_KEYS } from '@/config/app.config';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';

const FALLBACK_IMAGE =
  'https://via.placeholder.com/180x120?text=No+Image';

const Room = ({
  id,
  type,
  amenities,
  price,
  isSelected,
  photos,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const safeAmenities = Array.isArray(amenities) ? amenities : [];
  const safePhotos =
    Array.isArray(photos) && photos.length > 0
      ? photos
      : [FALLBACK_IMAGE];
  const safePrice = typeof price === 'number' ? price : 0;

  const roomSelectHandler = () => {
    searchParams.set(SEARCH_PARAMS_KEYS.SELECTED_ROOM, id);
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <article>
      {isSelected && (
        <div className="flex items-center gap-1 px-5 py-1 rounded-t-lg bg-brand">
          <Icon icon="star" size="12" className="fill-amber-500" />
          <p className="text-xs font-bold text-white uppercase">
            Selected Category
          </p>
        </div>
      )}

      <div className="flex border border-border p-4">
        <div className="flex-1 space-y-4">
          <div className="flex gap-2 items-center">
            <h3 className="text-lg font-semibold">
              {type || 'Room'}
            </h3>
            {isSelected && (
              <Icon
                size="26"
                icon="circleCheck"
                className="fill-green-600 text-white"
              />
            )}
          </div>

          <ul className="flex flex-wrap gap-2">
            {safeAmenities.slice(0, 6).map((item, index) => (
              <li
                key={index}
                className="flex gap-2 items-center min-w-[180px]"
              >
                <Icon icon="check" size="18" className="text-green-600" />
                <span className="text-sm text-muted-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-[180px] h-[120px]">
          <img
            src={safePhotos[0]}
            alt="Room"
            className="object-cover size-full rounded-lg"
          />
        </div>
      </div>

      <div className="flex border-x border-b p-4 rounded-b-lg">
        <div className="flex-1 flex gap-2 items-center">
          <span className="text-lg font-bold">
            ₹{safePrice.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            ₹{(safePrice * 1.5).toLocaleString()}
          </span>
        </div>

        <Button
          disabled={isSelected}
          onClick={roomSelectHandler}
          variant="outline"
          size="lg"
          className={`h-12 font-semibold w-[180px] uppercase ${
            !isSelected && 'hover:text-destructive text-destructive'
          }`}
        >
          {isSelected ? 'Selected' : 'Select'}
        </Button>
      </div>
    </article>
  );
};

const HotelRoomPicker = ({ rooms }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const safeRooms = Array.isArray(rooms) ? rooms : [];
  const selectedRoomId = Number(
    searchParams.get(SEARCH_PARAMS_KEYS.SELECTED_ROOM)
  );

  useEffect(() => {
    if (safeRooms.length === 0) return;

    const exists = safeRooms.some(
      (room) => room.id === selectedRoomId
    );

    if (!exists) {
      searchParams.set(
        SEARCH_PARAMS_KEYS.SELECTED_ROOM,
        safeRooms[0].id
      );
      setSearchParams(searchParams, { replace: true });
    }
  }, [safeRooms]);

  if (safeRooms.length === 0) {
    return (
      <section>
        <h2 className="text-xl font-bold">Choose your room</h2>
        <p className="text-muted-foreground mt-2">
          No rooms available for selected dates.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Choose your room</h2>
      <div className="space-y-4">
        {safeRooms.map((room) => (
          <Room
            key={room.id}
            {...room}
            isSelected={selectedRoomId === room.id}
          />
        ))}
      </div>
    </section>
  );
};

export default HotelRoomPicker;

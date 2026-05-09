import Icon from '@/components/ui/icon';
import React from 'react';

const HotelMetaDetails = ({ hotel, info }) => {
  if (!hotel) {
    return null; // or loading skeleton
  }

  const amenities = Array.isArray(hotel.amenities)
    ? hotel.amenities
    : [];

  const address =
    hotel.contactInfo?.address ||
    hotel.address ||
    'Address not available';

  const description =
    info?.description || 'No description available';

  return (
    <>
      <section className="space-y-4">
        <div className="flex">
          <div className="flex-1 space-y-1">
            <h1 className="text-2xl font-bold">
              {hotel.name || 'Unnamed Hotel'}
            </h1>
            <p className="text-muted-foreground">
              {address}, {hotel.city || 'Unknown city'}
            </p>
          </div>

          <div>
            <div className="flex gap-2 items-center justify-center bg-brand px-2 py-1 rounded-t-sm text-white">
              <span className="text-base font-bold">4.8</span>
              <Icon size="14" className="fill-white" icon="star" />
            </div>
            <div className="bg-secondary rounded-b-sm px-2 py-1 flex items-center justify-center">
              <span className="text-xs">663 Ratings</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-1.5 py-1 rounded bg-gray-100 w-fit font-semibold">
          <Icon size="14" icon="gem" />
          <span className="text-xs">Company-Serviced</span>
        </div>

        <div className="flex items-center gap-2 px-2">
          <Icon icon="curve" className="-mt-4 stroke-gray-400" />
          <p>5.0 · Check-in rating &gt; Delightful experience</p>
        </div>

        <div className="text-orange-500 bg-orange-50 flex gap-1 p-2 items-center border rounded-sm">
          <Icon icon="heart" size="16" />
          <p className="text-sm font-medium">
            Located near popular attractions
          </p>
        </div>
      </section>

      <section className="space-y-4 my-8">
        <h2 className="text-xl font-bold">Amenities</h2>

        {amenities.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No amenities listed
          </p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {amenities.map((item, index) => (
              <li
                key={index}
                className="flex gap-2 items-center min-w-[180px]"
              >
                <Icon
                  icon="check"
                  size="18"
                  className="text-green-600"
                />
                <span className="text-sm font-medium text-muted-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-4 my-8">
        <h2 className="text-xl font-bold">About this Property</h2>
        <p className="text-sm leading-relaxed tracking-wide text-muted-foreground">
          {description}
        </p>
      </section>
    </>
  );
};

export default HotelMetaDetails;

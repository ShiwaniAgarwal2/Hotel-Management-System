import useQuery from '@/lib/hooks/useQuery';
import React from 'react';
import EmptyHotels from './empty-hotels';
import { LinkWithIcon } from '@/components/ui/link';
import { LoadingSpinner } from '@/components/ui/loader';

const HotelCard = ({ photos, name, contactInfo, id }) => {
  return (
    <article className="overflow-hidden border rounded-xl">
      <div>
        <img
          height="200"
          className="object-cover w-full h-52"
          src={photos[0]}
          alt={name}
        />
      </div>
      <div className="p-2 space-y-3">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {contactInfo.address}
          </p>
        </div>
        <LinkWithIcon
          to={`/admin/hotels/${id}/overview`}
          icon="rightArrow"
          className="flex-row-reverse justify-center w-full rounded-full"
        >
          Go to Dashboard
        </LinkWithIcon>
      </div>
    </article>
  );
};

const Hotels = () => {
  const { data, pending, error } = useQuery({ url: '/admin/hotels' });

  if (pending)
    return <LoadingSpinner containerClassName={'min-h-[calc(100vh-120px)]'} />;

  return (
    <div className="container">
      {data.length === 0 && <EmptyHotels />}
      {data.length > 0 && (
        <>
          <section className="flex items-center justify-between mt-8">
            <div>
              <h1 className="font-semibold text-2xl">Your Hotels</h1>
              <p className="text-muted-foreground">
                Manage all your hotels in one place
              </p>
            </div>

            <LinkWithIcon
              to={'/admin/hotels/create'}
              icon="plus"
              size="sm"
              className="gap-1"
            >
              Create Hotel
            </LinkWithIcon>
          </section>
          <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 mt-8">
            {data.map((hotel) => (
              <HotelCard key={hotel.id} {...hotel} />
            ))}
          </section>
        </>
      )}
    </div>
  );
};

export default Hotels;

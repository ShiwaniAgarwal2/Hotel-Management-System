import React from 'react'
import HotelCard from './components/hotel-card'
import HotelCardSkeleton from './components/hotel-card-skeleton'

const Hotels = ({isLoading, data, error}) => {
  if(isLoading) return (
    <div className="space-y-4">
      <HotelCardSkeleton />
      <HotelCardSkeleton />
    </div>
  );

  return (
    <div className="space-y-4">
      {data.map((hotel) => (
        <HotelCard key={hotel.id} {...hotel} />
      ))}
    </div>
  );
}

export default Hotels
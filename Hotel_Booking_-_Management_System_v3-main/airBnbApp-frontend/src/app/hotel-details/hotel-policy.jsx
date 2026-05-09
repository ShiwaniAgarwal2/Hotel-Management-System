import { Separator } from '@/components/ui/separator';
import React from 'react';

const HotelPolicy = ({ hotelPolicy }) => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Hotel Policy</h2>
      <div className="space-y-4">
        <div className="flex gap-4 mx-5">
          <div className="">
            <span className="text-sm">Check-in</span>
            <div
              className="mt-3 relative px-4 py-1 border border-border before:absolute before:size-4 
            before:rotate-[44deg] before:bg-background before:-top-2 before:left-2 before:border-t before:border-l before:border-border"
            >
              <p className="text-lg font-semibold">{hotelPolicy.checkIn}</p>
            </div>
          </div>

          {/* <Separator orientation='vertical' className="h-[70px]"/> */}

          <div className="">
            <span className="text-sm">Check-out</span>
            <div
              className="mt-3 relative px-4 py-1 border border-border before:absolute before:size-4 
            before:rotate-[44deg] before:bg-background before:-top-2 before:left-2 before:border-t before:border-l before:border-border"
            >
              <p className="text-lg font-semibold">{hotelPolicy.checkout}</p>
            </div>
          </div>
        </div>
        <ul className='list-disc list-inside'>
          {hotelPolicy.rules.map((rule, index) => (
            <li key={index} className='text-sm text-muted-foreground'>
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HotelPolicy;

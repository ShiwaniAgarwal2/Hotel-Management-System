import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import Icon from '@/components/ui/icon';
import React from 'react';
import useGetSelectedRoomDetails from './hooks/use-selected-room';
import CheckoutSummary from './checkout-summary';

const CancellationPolicy = ({ cancellationPolicy }) => {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger>
        <div className="flex gap-2 text-rose-600 items-center cursor-pointer">
          <span className="text-sm font-medium">Cancellation Policy</span>
          <Icon icon="info" size="16" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        align="center"
        side="left"
        className="w-[350px] space-y-3 border-border"
      >
        <h3 className="text-base font-semibold">Cancellation Policy</h3>
        <ul className="pl-4 space-y-3 list-disc">
          {cancellationPolicy.map((policy, index) => (
            <li
              key={index}
              className="text-sm leading-relaxed font-medium text-accent-foreground"
            >
              {policy}
            </li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
};

export const HotelCheckoutCard = ({ rooms, cancellationPolicy }) => {
  const selectedRoomDetails = useGetSelectedRoomDetails(rooms);

  return (
    <div className="space-y-6">
      <div className="flex-1 flex gap-2 items-center">
        <span className="text-2xl font-bold">{`₹${selectedRoomDetails.totalPrice.toLocaleString()}`}</span>
        <span className="text-base text-muted-foreground line-through">{`₹${selectedRoomDetails.displayPrice.toLocaleString()}`}</span>
      </div>

      <CheckoutSummary selectedRoomDetails={selectedRoomDetails} />

      <div className="flex gap-1">
        <Icon
          icon="zap"
          size="16"
          className="mt-[3px] shrink-0 fill-rose-600 text-rose-600"
        />
        <p className="text-sm font-medium text-rose-600">
          1k+ people booked this OYO in last 6 months
        </p>
      </div>

      <CancellationPolicy cancellationPolicy={cancellationPolicy} />
    </div>
  );
};

import { Form } from '@/components/ui/form';
import React from 'react';
import useConfirmCheckout from './hooks/use-confirm-checkout';
import DateSelectInput from '@/features/search/date-select-input';
import OccupancyInput from '@/features/search/occupancy-input';
import { Button } from '@/components/ui/button';

const CheckoutSummary = ({ selectedRoomDetails }) => {
  const { form, handleUpdateDetailsFormSubmit, handleCheckoutConfirm } =
    useConfirmCheckout();

  return (
    <div className="space-y-4 ">
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(handleUpdateDetailsFormSubmit)}
        >
          <DateSelectInput form={form} />
          <OccupancyInput form={form} />

          {form.formState.isDirty && (
            <Button
              type="submit"
              variant="outline"
              size="lg"
              className="w-full"
              aria-label="Apply Changes"
            >
              Apply Changes
            </Button>
          )}
        </form>
      </Form>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Your savings</span>
          <span className="text-sm font-bold">{`₹${Math.round(
            selectedRoomDetails.displayPrice - selectedRoomDetails.totalPrice
          )}`}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">Total Price</span>
          <span className="text-sm font-bold">{`₹${selectedRoomDetails.totalPrice.toLocaleString()}`}</span>
        </div>
      </div>

      <Button
        onClick={handleCheckoutConfirm}
        className="w-full h-12 text-base font-semibold"
        aria-label="Continue to Book"
      >
        Continue to Book
      </Button>
    </div>
  );
};

export default CheckoutSummary;

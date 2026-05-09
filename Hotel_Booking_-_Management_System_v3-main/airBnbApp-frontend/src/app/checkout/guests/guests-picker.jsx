import { AlertDialogFooter } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import API_CONFIG from '@/config/api.config';
import useMutation from '@/lib/hooks/useMutation';
import { useTravelerContext } from '@/lib/providers/travelers-context';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const GuestPicker = ({
  setIsGuestDialogOpen,
  bookingId,
  setBookingGuests,
  bookingGuests,
}) => {
  const { travelers } = useTravelerContext();

  const form = useForm({
    defaultValues: {
      guests: bookingGuests.map((item) => item.id),
    },
  });

  const { mutate, pending} = useMutation(
    API_CONFIG.BOOKING.ADD_GUEST.URL(bookingId),
    API_CONFIG.BOOKING.ADD_GUEST.METHOD
  );

  function addGuestHandler(data) {
    mutate(data.guests, {
      onSuccess: (response) => {
        setBookingGuests(response.data.guests);
        toast("Guest added Successfully", {
          type: 'success'
        })
        setIsGuestDialogOpen(false);
      },
      onError: (error) => {
        toast(error.status, {
          type: 'error'
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="guests"
          render={() => (
            <FormItem>
              {travelers.map((traveller) => (
                <FormField
                  key={traveller.id}
                  control={form.control}
                  name="guests"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={traveller.id}
                        className="flex flex-row items-center justify-between space-y-0"
                      >
                        <FormItem className="flex flex-row items-center gap-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              className="w-5 h-5 border-muted-foreground data-[state=checked]:border-primary"
                              checked={field.value?.includes(traveller.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      traveller.id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== traveller.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-medium">
                            {traveller.name}
                          </FormLabel>
                        </FormItem>
                        {/* <UpdateExistingTraveller {...traveller} /> */}
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <Button
            isLoading={pending}
            disabled={pending}
            onClick={form.handleSubmit(addGuestHandler)}
            aria-label="Confirm adding guest to list"
          >
            Add To Guest List
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default GuestPicker;

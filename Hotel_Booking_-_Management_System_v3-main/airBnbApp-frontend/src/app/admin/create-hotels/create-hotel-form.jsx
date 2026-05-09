import React from 'react';
import { useCreateHotelForm } from './use-create-hotel-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button, ButtonWithIcon } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import TokenInput from '@/components/ui/token-input';
import HotelImage from '@/components/hotel-image';

const CreateHotelForm = () => {
  const { form, createHotelHandler, pending } = useCreateHotelForm();
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(createHotelHandler)}
          className="space-y-6"
        >
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className={'flex-1'}>
                  <FormLabel>Hotel Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className={'flex-1'}>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="photos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photos</FormLabel>
                <div className="flex flex-wrap gap-6 p-4 border rounded-md">
                  <FormControl>
                    <Input
                      type={'file'}
                      multiple
                      accept="image/*"
                      ref={field.ref}
                      className={'hidden'}
                      onChange={(e) => {
                        field.onChange([...field.value]);
                      }}
                    />
                  </FormControl>
                  {field.value?.map((photo, index) => (
                    <HotelImage key={index} photo={photo} />
                  ))}
                  <FormLabel className="flex items-center justify-center w-24 h-24 border-2 border-dashed rounded-md cursor-pointer group hover:bg-secondary ">
                    <Icon
                      icon="addImage"
                      size="28"
                      className="text-muted-foreground group-hover:text-primary"
                      strokeWidth={1.5}
                    />
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amenities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amenities</FormLabel>
                <FormControl>
                  <TokenInput
                    {...field}
                    placeholder={'Type amenities here...'}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Hotel Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.replace(/[^0-9+]/, ''))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <ButtonWithIcon
            icon={'save'}
            className="px-8 h-11"
            disabled={pending}
            isLoading={pending}
          >
            Create Hotel
          </ButtonWithIcon>
        </form>
      </Form>
    </div>
  );
};

export default CreateHotelForm;

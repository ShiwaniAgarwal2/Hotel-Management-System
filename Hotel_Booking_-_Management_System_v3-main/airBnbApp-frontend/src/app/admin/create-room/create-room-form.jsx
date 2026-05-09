import { Button, ButtonWithIcon } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TokenInput from '@/components/ui/token-input';
import useCreateRoomForm from './use-create-room-form';
import Icon from '@/components/ui/icon';
import HotelImage from '@/components/hotel-image';


const CreateRoomForm = () => {
  const { form, createRoomHandler, pending } = useCreateRoomForm();
  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(createRoomHandler)}
          className="space-y-6 max-w-[568px]"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Room Type</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="basePrice"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Base Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/\D+/g, ''))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photos"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Photos</FormLabel>
                <div className="flex flex-wrap gap-6 p-4 border rounded-md">
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      ref={field.ref}
                      className="hidden"
                      onChange={(e) => {
                        field.onChange([...field.value]);
                      }}
                    />
                  </FormControl>
                  {field.value?.map((photo) => (
                    <HotelImage key={photo} photo={photo} />
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amenities"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Amenities</FormLabel>
                <FormControl>
                  <TokenInput {...field} placeholder="Type amenities here..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalCount"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Total Room Count</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/\D+/g, ''))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Total Capacity</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/\D+/g, ''))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ButtonWithIcon
            icon="save"
            className="px-8 h-11"
            disabled={pending}
            isLoading={pending}
          >
            Create New Room
          </ButtonWithIcon>
        </form>
      </Form>
    </section>
  );
};

export default CreateRoomForm;

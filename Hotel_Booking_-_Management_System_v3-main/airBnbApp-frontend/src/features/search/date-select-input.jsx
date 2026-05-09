import { Calendar } from '@/components/ui/calendar';
import { FormField } from '@/components/ui/form';
import Icon from '@/components/ui/icon';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';

const DateSelectInput = ({ form, className }) => {
  return (
    <FormField
      control={form.control}
      name="bookingDates"
      render={({ field }) => (
        <Popover>
          {/* ✅ SIMPLE BUTTON – NO asChild */}
          <PopoverTrigger>
            <button
              type="button"
              className={cn(
                'flex items-center gap-3 px-4 py-2 rounded bg-background border w-full text-left',
                className
              )}
            >
              <Icon icon="calendar" size={20} className="text-muted-foreground" />

              <span className="text-sm">
                {field.value?.from
                  ? dayjs(field.value.from).format('DD MMM')
                  : 'Check-in'}
              </span>

              <span>-</span>

              <span className="text-sm">
                {field.value?.to
                  ? dayjs(field.value.to).format('DD MMM')
                  : 'Check-out'}
              </span>
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            className="w-auto p-0"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <Calendar
              mode="range"
              numberOfMonths={2}
              selected={field.value}
              fromDate={new Date()}
              onSelect={(range) => {
                field.onChange(range);
              }}
              disabled={(date) =>
                dayjs(date).isBefore(dayjs(), 'day')
              }
            />
          </PopoverContent>
        </Popover>
      )}
    />
  );
};

export default DateSelectInput;

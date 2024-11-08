'use client';

import { addDays, format, subDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FormControl } from './form';
import { ptBR } from 'date-fns/locale';

export type DatePickerProps = {
  value?: Date;
  onChange: (date?: Date) => void;
};

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            className={cn(
              'w-[240px] pl-3 text-left font-normal',
              !value && 'text-muted-foreground'
            )}
          >
            {value ? (
              format(value, 'PPP', {
                locale: ptBR,
              })
            ) : (
              <span>Selecione uma data</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
					locale={ptBR}
          selected={value}
          onSelect={(date) => onChange(date)}
          today={new Date()}
          disabled={(date) =>
            date > addDays(new Date(), 2) || date < subDays(new Date(), 15)
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

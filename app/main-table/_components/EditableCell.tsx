'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Option } from './TableTodo';

interface EditableCellProps {
  field: string;
  value: any;
  isEditing: boolean;
  editValue: any;
  onCellClick: () => void;
  onInputChange?: (value: any) => void;
  onInputBlur?: () => void;
  onSelectChange?: (value: string) => void;
  onCalendarSelect?: (date: Date) => void;
  options?: Option[];
  color?: string;
  isNumeric?: boolean;
}

export default function EditableCell({ field, value, isEditing, editValue, onCellClick, onInputChange, onInputBlur, onSelectChange, onCalendarSelect, options, color, isNumeric = false }: EditableCellProps) {
  if (field === 'date') {
    return isEditing ? (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">{editValue instanceof Date ? format(editValue, 'dd MMM, yyyy') : 'Select date'}</Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={editValue instanceof Date ? editValue : undefined} onSelect={(date) => date && onCalendarSelect?.(date)} initialFocus />
        </PopoverContent>
      </Popover>
    ) : (
      <div className="cursor-pointer" onClick={onCellClick}>
        {value ? format(new Date(value), 'dd MMM, yyyy') : 'Set date'}
      </div>
    );
  }

  if (field === 'status' || field === 'priority' || field === 'type') {
    return isEditing ? (
      <Select value={editValue} onValueChange={onSelectChange} defaultOpen={true}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${field}`} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: option.color }} />
                {option.value}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ) : (
      <div className="cursor-pointer flex items-center" onClick={onCellClick}>
        <div className="w-full h-3 rounded-full mr-2" style={{ backgroundColor: color }} />
      </div>
    );
  }

  if (isNumeric) {
    return isEditing ? (
      <Input type="number" value={editValue} onChange={(e) => onInputChange?.(parseInt(e.target.value) || 0)} onBlur={onInputBlur} autoFocus className="w-16" />
    ) : (
      <div className="cursor-pointer" onClick={onCellClick}>
        {value}
      </div>
    );
  }

  return isEditing ? (
    <Input type="text" value={editValue} onChange={(e) => onInputChange?.(e.target.value)} onBlur={onInputBlur} autoFocus placeholder={field === 'developer' ? 'Separate multiple names with commas' : ''} />
  ) : (
    <div className="cursor-pointer" onClick={onCellClick}>
      {value}
    </div>
  );
}

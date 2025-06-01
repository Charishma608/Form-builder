import React from 'react';
import { FormField } from '@/store/formStore';
import { Input } from '@/components/elements/input';
import { Textarea } from '@/components/elements/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/elements/select';
import { Checkbox } from '@/components/elements/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/elements/radio-group';
import { Label } from '@/components/elements/label';
import { Calendar } from '@/components/elements/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/elements/popover';
import { Button } from '@/components/elements/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface FieldRendererProps {
  field: FormField;
  value?: any;
  onChange?: (value: any) => void;
  error?: string;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  value,
  onChange,
  error,
}) => {
  const handleChange = (val: any) => {
    onChange?.(val);
  };

  const inputStyle =
    'w-full rounded-xl border px-4 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500';

  const labelStyle = 'text-sm font-medium text-gray-700 mb-1 block';

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <Input
            type={field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : 'text'}
            value={value || ''}
            placeholder={field.placeholder}
            onChange={(e) => handleChange(e.target.value)}
            className={`${inputStyle} ${error ? 'border-red-500' : ''}`}
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            placeholder={field.placeholder}
            onChange={(e) => handleChange(e.target.value)}
            className={`${inputStyle} ${error ? 'border-red-500' : ''}`}
          />
        );

      case 'textarea':
        return (
          <Textarea
            value={value || ''}
            placeholder={field.placeholder}
            rows={4}
            onChange={(e) => handleChange(e.target.value)}
            className={`${inputStyle} ${error ? 'border-red-500' : ''}`}
          />
        );

      case 'select':
        return (
          <Select value={value} onValueChange={handleChange}>
            <SelectTrigger className={`${inputStyle} ${error ? 'border-red-500' : ''}`}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt, i) => (
                <SelectItem key={i} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((opt, i) => (
              <label key={i} className="flex items-center space-x-2 text-sm">
                <Checkbox
                  id={`${field.id}-${i}`}
                  checked={Array.isArray(value) ? value.includes(opt) : false}
                  onCheckedChange={(checked) => {
                    const current = Array.isArray(value) ? value : [];
                    handleChange(checked ? [...current, opt] : current.filter((v) => v !== opt));
                  }}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        );

      case 'radio':
        return (
          <RadioGroup value={value} onValueChange={handleChange} className="space-y-2">
            {field.options?.map((opt, i) => (
              <label key={i} className="flex items-center space-x-2 text-sm">
                <RadioGroupItem value={opt} id={`${field.id}-${i}`} />
                <span>{opt}</span>
              </label>
            ))}
          </RadioGroup>
        );

      case 'date':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`${inputStyle} text-left font-normal ${
                  !value ? 'text-muted-foreground' : ''
                } ${error ? 'border-red-500' : ''}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? format(new Date(value), 'PPP') : field.placeholder || 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={value ? new Date(value) : undefined}
                onSelect={(date) => handleChange(date?.toISOString())}
              />
            </PopoverContent>
          </Popover>
        );

      default:
        return (
          <Input
            placeholder={field.placeholder}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            className={`${inputStyle} ${error ? 'border-red-500' : ''}`}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <label className={labelStyle}>
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {renderField()}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FieldRenderer;

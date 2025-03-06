'use client';

import { useField } from 'formik';
import { Input } from '@/components/ui/Input';
import { Select, SelectOption } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Switch } from '@/components/ui/Switch';
import { FileUpload } from '@/components/ui/FileUpload';

interface FormFieldProps {
  name: string;
  label?: string;
  helperText?: string;
  type?: string;
  placeholder?: string;
  options?: SelectOption[];
  multiple?: boolean;
  accept?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function FormField({
  name,
  label,
  helperText,
  type = 'text',
  placeholder,
  options,
  multiple,
  accept,
  disabled,
  required,
  className,
  ...props
}: FormFieldProps) {
  const [field, meta, helpers] = useField(name);
  const error = meta.touched && meta.error ? meta.error : undefined;

  switch (type) {
    case 'select':
      if (!options) {
        throw new Error('Options are required for select fields');
      }
      return (
        <Select
          {...field}
          id={name}
          label={label}
          helperText={helperText}
          error={error}
          options={options}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={className}
          {...props}
        />
      );
    case 'textarea':
      return (
        <Textarea
          {...field}
          id={name}
          label={label}
          helperText={helperText}
          error={error}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={className}
          {...props}
        />
      );
    case 'checkbox':
    case 'switch':
      return (
        <Switch
          {...field}
          id={name}
          label={label}
          helperText={helperText}
          error={error}
          checked={field.value}
          onChange={(e) => helpers.setValue(e.target.checked)}
          disabled={disabled}
          required={required}
          className={className}
          {...props}
        />
      );
    case 'file':
      return (
        <FileUpload
          id={name}
          label={label}
          helperText={helperText}
          error={error}
          onFileChange={(files) => helpers.setValue(files)}
          value={field.value}
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          required={required}
          className={className}
          {...props}
        />
      );
    default:
      return (
        <Input
          {...field}
          id={name}
          type={type}
          label={label}
          helperText={helperText}
          error={error}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={className}
          {...props}
        />
      );
  }
}
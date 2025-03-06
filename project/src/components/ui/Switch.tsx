'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: string;
  label?: string;
  helperText?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, error, label, helperText, ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className={cn(
              'focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        <div className="ml-3 text-sm">
          {label && (
            <label
              htmlFor={props.id}
              className={cn(
                'font-medium',
                props.disabled ? 'text-gray-400' : 'text-gray-700'
              )}
            >
              {label}
            </label>
          )}
          {(error || helperText) && (
            <p
              className={cn(
                'text-sm',
                error ? 'text-red-500' : 'text-gray-500'
              )}
            >
              {error || helperText}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export { Switch };
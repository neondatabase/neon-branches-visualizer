import cx from 'classnames';
import type { InputHTMLAttributes } from 'react';
import * as React from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'password' | 'hidden' | 'number' | 'search';
  className?: string;
  id: string;
  name: string;
  placeholder?: string;
  value?: string;
  autoComplete?: string;
  error?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  function txtInput(
    {
      type = 'text',
      id,
      name,
      className,
      placeholder,
      value,
      autoComplete = 'on',
      error,
      ...props
    }: TextInputProps,
    ref
  ) {
    return (
      <>
        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          value={value}
          autoComplete={autoComplete}
          className={cx(
            className,
            'block w-full rounded-md border-gray-700 bg-gray-200 text-gray-1200 shadow-sm placeholder:text-gray-1100 sm:text-sm',
            error && 'border-red-800 focus-visible:border-red-800 ',
            'disabled:cursor-not-allowed disabled:opacity-40',
            'focus-visible:border-gray-700 focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100',
            'transition-colors hover:border-gray-800'
          )}
          placeholder={placeholder}
          {...props}
        />
        {error && (
          <p className="mt-2  text-sm text-red-1100" id="email-error">
            {error}
          </p>
        )}
      </>
    );
  }
);

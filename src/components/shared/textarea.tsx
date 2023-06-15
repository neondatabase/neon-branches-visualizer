import cx from 'classnames';
import type { HTMLAttributes } from 'react';
import React from 'react';

interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  rows: number;
  error?: string;
}
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function textarea(
    { id, rows, error, placeholder, className, ...props }: TextareaProps,
    ref
  ) {
    return (
      <>
        <textarea
          {...props}
          ref={ref}
          id={id}
          placeholder={placeholder}
          rows={rows}
          className={cx(
            'block w-full rounded-md bg-gray-200',
            'text-sm text-gray-1200 placeholder:text-gray-1100',
            'border-transparent focus-visible:border-transparent',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2',
            error && 'border-red-700',
            className
          )}
        />
        {error && <p className="mt-2 text-xs text-red-1100">{error}</p>}
      </>
    );
  }
);

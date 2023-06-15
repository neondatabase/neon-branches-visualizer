'use client';

import type { ButtonAppearance, ButtonSize } from './button';
import { Button } from './button';
import { Icon } from './icon';
import * as SelectPrimitive from '@radix-ui/react-select';
import cx from 'classnames';
import * as React from 'react';

interface SelectProps
  extends React.ComponentProps<typeof SelectPrimitive.Root> {
  className?: string;
  options: {
    value: string;
    label: string;
    icon?: JSX.Element;
  }[];
  value?: string | undefined;
  defaultValue?: string | undefined;
  onValueChange(value: string): void;
  appearance: ButtonAppearance;
  size?: ButtonSize;
  ariaLabel?: string;
  open?: boolean;
  required?: boolean;
  buttonClassName?: string;
  placeholder?: string;
}

export const Select = ({
  className,
  options,
  value,
  defaultValue,
  placeholder,
  onValueChange,
  appearance,
  ariaLabel,
  size,
  required = false,
  buttonClassName = '',
  open,
}: SelectProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <div>
      <SelectPrimitive.Root
        required={required}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
      >
        {mounted && (
          <>
            <SelectPrimitive.Trigger
              className="relative rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
              aria-label={ariaLabel}
              asChild
            >
              <Button
                className={buttonClassName}
                size={size}
                appearance={appearance}
                leadingIcon={options.find((o) => o.value === value)?.icon}
              >
                <SelectPrimitive.Value placeholder={placeholder}>
                  {value
                    ? options.find((o) => o.value === value)?.label
                    : placeholder}
                </SelectPrimitive.Value>

                <SelectPrimitive.Icon
                  asChild
                  className="ml-2 h-4 w-4 opacity-50"
                >
                  <Icon name="ChevronsUpDown" />
                </SelectPrimitive.Icon>
              </Button>
            </SelectPrimitive.Trigger>

            <SelectPrimitive.Content
              align="center"
              sideOffset={20}
              className={cx('rounded-md border border-gray-700', className)}
            >
              <SelectPrimitive.ScrollUpButton className="flex  items-center justify-center text-gray-1200 ">
                <Icon name="ChevronUp" />{' '}
              </SelectPrimitive.ScrollUpButton>
              <SelectPrimitive.Viewport className="mt-1 rounded-md bg-gray-300 p-2 shadow-md">
                <SelectPrimitive.Group>
                  {options.map((option, i) => (
                    <SelectPrimitive.Item
                      key={`${option.value}-${i}`}
                      value={option.value}
                      className={cx(
                        'relative flex items-center rounded-md px-8 py-2 text-sm text-gray-1100 hover:cursor-pointer hover:bg-gray-500 hover:text-gray-1200 focus-visible:bg-gray-500 focus-visible:text-gray-1200 ',
                        'radix-disabled:opacity-50',
                        'select-none focus-visible:outline-none'
                      )}
                    >
                      {option.icon}
                      <SelectPrimitive.ItemText>
                        {option.label}
                      </SelectPrimitive.ItemText>

                      <SelectPrimitive.ItemIndicator
                        asChild
                        className="absolute left-2 inline-flex items-center"
                      >
                        <Icon className="h-3 w-3" name="Check" />
                      </SelectPrimitive.ItemIndicator>
                    </SelectPrimitive.Item>
                  ))}
                </SelectPrimitive.Group>
              </SelectPrimitive.Viewport>
              <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-1200">
                <Icon name="ChevronDown" />
              </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
          </>
        )}
      </SelectPrimitive.Root>
    </div>
  );
};

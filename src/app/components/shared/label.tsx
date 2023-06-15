import { Root } from '@radix-ui/react-label';
import cx from 'classnames';
import type { FC, LabelHTMLAttributes } from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md';
}

export const Label: FC<Readonly<LabelProps>> = ({
  children,
  className,
  htmlFor,
  size = 'medium',
  ...props
}) => (
  <Root
    {...props}
    className={cx('block text-gray-1100', className, `text-${size}`)}
    htmlFor={htmlFor}
  >
    {children}
  </Root>
);

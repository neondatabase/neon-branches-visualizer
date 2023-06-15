import cx from 'classnames';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
};

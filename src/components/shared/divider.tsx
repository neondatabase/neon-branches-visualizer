import cx from 'classnames';

export const Divider = ({ className }: { className?: string }) => {
  return (
    <div className={cx('relative', className)}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-700/40" />
      </div>
    </div>
  );
};

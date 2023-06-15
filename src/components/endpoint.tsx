import cx from 'classnames';

type Props = { state: 'init' | 'active' | 'idle' };

export const EndpointBadge = ({ state }: Props) => {
  const styles = {
    init: {
      text: 'Init',
      className: 'text-indigo-1100 border-indigo-700 ',
    },
    idle: {
      text: 'Idle',
      className: 'border-orange-700 text-orange-1100',
    },
    active: {
      text: 'Active',
      className: 'border-green-700 text-green-1100',
    },
  };

  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        styles[state].className
      )}
    >
      <svg
        className="-ml-0.5 mr-1.5 h-2 w-2 "
        fill="currentColor"
        viewBox="0 0 8 8"
      >
        <circle cx={4} cy={4} r={3} />
      </svg>
      {styles[state].text}
    </span>
  );
};

export const EndpointDot = ({ state }: Props) => {
  return (
    <span
      className={cx(
        'absolute right-0 top-0 block h-2.5 w-2.5 rounded-full',
        state === 'init' && 'bg-indigo-800',
        state === 'idle' && 'bg-orange-800',
        state === 'active' && 'bg-green-800'
      )}
    />
  );
};

import cx from 'classnames';
import { EndpointDot } from '../endpoint';

interface TreeNodeProps {
  node: {
    name: string;
    id: string;
    endpoint?: {
      autoscaling_limit_max_cu: number;
      autoscaling_limit_min_cu: number;
      branch_id: string;
      created_at: string;
      current_state: 'idle';
      disabled: boolean;
      host: string;
      id: string;
      last_active: string;
      passwordless_access: boolean;
      pooler_enabled: boolean;
      pooler_mode: 'transaction';
      project_id: string;
      proxy_host: 'eu-central-1.aws.neon.tech';
      region_id: 'aws-eu-central-1';
      settings: { pg_settings: {} };
      type: 'read_write' | 'read_only';
    };
  };
}

export const TreeNode = ({ node }: TreeNodeProps) => {
  return (
    <div className="group flex items-center">
      <button
        className={cx(
          'bg-gray-400 text-xs hover:bg-gray-500',
          !node.endpoint &&
            'dark:border-gray-dark-700 border-2 border-dashed border-gray-700',
          'relative rounded-md shadow-md',
          'm-1 px-5 py-2.5',
          'dark:focus-visible:ring-green-dark-700 ring-offset-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2',
          'select-none'
        )}
      >
        {node.endpoint && <EndpointDot state={node.endpoint.current_state} />}
        <h3 className="text-ellipsis text-center text-gray-1200">
          {node.name}
        </h3>
      </button>
    </div>
  );
};

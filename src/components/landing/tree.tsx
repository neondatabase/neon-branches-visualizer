'use client';
import TreeGraph from 'react-d3-tree';
import React, { useCallback, useState } from 'react';
import { TreeNode } from './tree-node';

const data = {
  id: 'br-floral-glitter-846019',
  project_id: 'wandering-wood-851997',
  name: 'main',
  current_state: 'ready',
  physical_size: 106774528,
  created_at: '2022-12-25T10:16:44Z',
  updated_at: '2023-01-15T07:14:11Z',
  endpoint: {
    host: 'ep-curly-snowflake-114153.eu-central-1.aws.neon.tech',
    id: 'ep-curly-snowflake-114153',
    project_id: 'wandering-wood-851997',
    branch_id: 'br-floral-glitter-846019',
    autoscaling_limit_min_cu: 1,
    autoscaling_limit_max_cu: 1,
    region_id: 'aws-eu-central-1',
    type: 'read_write',
    current_state: 'active',
    settings: {
      pg_settings: {},
    },
    pooler_enabled: true,
    pooler_mode: 'transaction',
    disabled: false,
    passwordless_access: true,
    last_active: '2023-01-13T23:06:55Z',
    created_at: '2022-12-25T10:16:44Z',
    updated_at: '2023-01-15T07:14:21Z',
    proxy_host: 'eu-central-1.aws.neon.tech',
  },
  children: [
    {
      id: 'br-lingering-brook-920413',
      project_id: 'wandering-wood-851997',
      parent_id: 'br-floral-glitter-846019',
      parent_lsn: '0/235E6C8',
      name: 'preview-branch-1',
      current_state: 'ready',
      physical_size: 30613504,
      created_at: '2022-12-31T18:42:42Z',
      updated_at: '2023-01-14T03:58:49Z',
      endpoint: {
        host: 'ep-lucky-heart-701547.eu-central-1.aws.neon.tech',
        id: 'ep-lucky-heart-701547',
        project_id: 'wandering-wood-851997',
        branch_id: 'br-lingering-brook-920413',
        autoscaling_limit_min_cu: 1,
        autoscaling_limit_max_cu: 1,
        region_id: 'aws-eu-central-1',
        type: 'read_write',
        current_state: 'idle',
        settings: {
          pg_settings: {},
        },
        pooler_enabled: true,
        pooler_mode: 'transaction',
        disabled: false,
        passwordless_access: true,
        last_active: '2023-01-05T19:50:20Z',
        created_at: '2022-12-31T18:42:42Z',
        updated_at: '2023-01-14T03:59:01Z',
        proxy_host: 'eu-central-1.aws.neon.tech',
      },
    },
    {
      id: 'br-lingering-brook-920413',
      project_id: 'wandering-wood-851997',
      parent_id: 'br-floral-glitter-846019',
      parent_lsn: '0/235E6C8',
      name: 'local-branch-1',
      current_state: 'ready',
      physical_size: 30613504,
      created_at: '2022-12-31T18:42:42Z',
      updated_at: '2023-01-14T03:58:49Z',
      endpoint: {
        host: 'ep-lucky-heart-701547.eu-central-1.aws.neon.tech',
        id: 'ep-lucky-heart-701547',
        project_id: 'wandering-wood-851997',
        branch_id: 'br-lingering-brook-920413',
        autoscaling_limit_min_cu: 1,
        autoscaling_limit_max_cu: 1,
        region_id: 'aws-eu-central-1',
        type: 'read_write',
        current_state: 'active',
        settings: {
          pg_settings: {},
        },
        pooler_enabled: true,
        pooler_mode: 'transaction',
        disabled: false,
        passwordless_access: true,
        last_active: '2023-01-05T19:50:20Z',
        created_at: '2022-12-31T18:42:42Z',
        updated_at: '2023-01-14T03:59:01Z',
        proxy_host: 'eu-central-1.aws.neon.tech',
      },
    },
    {
      id: 'br-square-sunset-716422',
      project_id: 'wandering-wood-851997',
      parent_id: 'br-floral-glitter-846019',
      parent_lsn: '0/1F25650',
      name: 'snapshot-branch-1',
      current_state: 'ready',
      created_at: '2022-12-26T14:31:55Z',
      updated_at: '2022-12-26T14:31:55Z',
    },
  ],
};
// @ts-ignore

const renderForeignObjectNode = ({ nodeDatum, foreignObjectProps }) => (
  <g className="-translate-x-10 -translate-y-5">
    {/* `foreignObject` requires width & height to be explicitly set. */}
    <foreignObject className="h-[100px] max-w-[220px]" {...foreignObjectProps}>
      <TreeNode node={nodeDatum} />
    </foreignObject>
  </g>
);

export const Tree = () => {
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 270, y: 75 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y };

  return (
    <>
      <div
        id="treeWrapper"
        // @ts-ignore
        ref={containerRef}
        className="relative h-[60vh] w-[50rem] rounded-md bg-gray-100 bg-graph p-5 shadow-2xl ring-1 ring-gray-700/60"
      >
        <div className="absolute inset-0 -z-10 m-10 bg-green-900/30 blur-3xl"></div>

        <TreeGraph
          // @ts-ignore
          translate={translate}
          hasInteractiveNodes={true}
          renderCustomNodeElement={(rd3tProps) =>
            // @ts-ignore
            renderForeignObjectNode({ ...rd3tProps, foreignObjectProps, data })
          }
          separation={{ siblings: 2, nonSiblings: 2 }}
          collapsible={false}
          data={data}
          nodeSize={nodeSize}
        />
      </div>
    </>
  );
};

export const useCenteredTree = () => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  // @ts-ignore

  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 8, y: height / 2.5 });
    }
  }, []);
  return [translate, containerRef];
};

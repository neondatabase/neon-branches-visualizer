import type { TBranch } from "./resources/Branch";

type Branch = TBranch & {
  children?: Branch[];
};

export const makeTree = (nodes: Branch[]): Branch[] => {
  const nodesMap = new Map<string | undefined, Branch>(
    nodes.map((node) => [node.id, node])
  );

  const virtualRoot = {} as Partial<Branch>;
  nodes.forEach((node, i) => {
    const parent = nodesMap.get(node.parent_id) ?? virtualRoot;
    (parent.children ??= []).push(node);
  });

  return virtualRoot.children ?? [];
};

import type { IPuzzle, IPuzzleNode } from '@/types/puzzle';

export function addNode(
  tree: Map<string, IPuzzleNode>,
  parentState: IPuzzle,
  childState: IPuzzle,
) {
  const serializedParent = JSON.stringify(parentState);
  const serializedChild = JSON.stringify(childState);

  if (!tree.has(serializedParent)) {
    tree.set(serializedParent, {
      state: parentState,
      children: [],
      parent: undefined,
    });
  }

  if (!tree.has(serializedChild)) {
    const childNode: IPuzzleNode = {
      state: childState,
      children: [],
      parent: tree.get(serializedParent) || undefined,
    };
    tree.get(serializedParent)?.children.push(childNode);
    tree.set(serializedChild, childNode);
  }
}

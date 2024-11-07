import type { IPuzzle, IPuzzleNode, IPuzzleStep } from '@/types/puzzle';

import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { nextOf } from './puzzle';
import { addNode } from './puzzle-tree';

export async function horizontalSearch(
  start: IPuzzle,
  end: IPuzzle,
): Promise<IPuzzle[]> {
  if (isEqual(start, end)) return [];

  const tree = new Map<string, IPuzzleNode>();
  const queue: IPuzzleStep[] = [
    { state: cloneDeep(start), path: [cloneDeep(start)] },
  ];
  const visited = new Set<string>([JSON.stringify(start)]);

  while (queue.length > 0) {
    const { state, path } = queue.shift() as IPuzzleStep;

    for (const nextState of nextOf(state)) {
      const serializedState = JSON.stringify(nextState);
      if (visited.has(serializedState)) continue;

      visited.add(serializedState);
      addNode(tree, state, nextState);

      const newPath = [...path, nextState];
      if (isEqual(nextState, end)) {
        console.log(tree);
        return newPath;
      }

      queue.push({ state: nextState, path: newPath });
    }
  }

  throw new Error('No result found');
}

import type {
  IPuzzle,
  IPuzzleHeuristicStep,
  IPuzzleNode,
} from '@/types/puzzle';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { manhattanDistance, nextOf } from './puzzle';
import { addNode } from './puzzle-tree';

export async function heuristicSearch(
  start: IPuzzle,
  end: IPuzzle,
): Promise<IPuzzle[]> {
  if (isEqual(start, end)) return [];

  const tree = new Map<string, IPuzzleNode>();
  const priorityQueue: IPuzzleHeuristicStep[] = [
    {
      state: cloneDeep(start),
      path: [cloneDeep(start)],
      cost: 0,
      heuristic: 0,
    },
  ];
  const visited = new Set<string>([JSON.stringify(start)]);

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a.cost + a.heuristic - (b.cost + b.heuristic));
    const { state, path, cost } = priorityQueue.shift() as IPuzzleHeuristicStep;

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

      priorityQueue.push({
        state: nextState,
        path: newPath,
        cost: cost + 1,
        heuristic: manhattanDistance(nextState, end),
      });
    }
  }

  throw new Error('No result found');
}

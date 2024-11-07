import type { IPuzzle, IPuzzleNode } from '@/types/puzzle';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { blockOf, nextOf } from './horizontal-search';

function manhattanDistance(state: IPuzzle, goal: IPuzzle): number {
  let distance = 0;
  for (let y = 0; y < state.length; y++) {
    for (let x = 0; x < state[y].length; x++) {
      const value = state[y][x];
      if (value !== 0) {
        const { x: goalX, y: goalY } = blockOf(goal, value);
        distance += Math.abs(x - goalX) + Math.abs(y - goalY);
      }
    }
  }
  return distance;
}

export async function heuristicSearch(
  start: IPuzzle,
  end: IPuzzle,
): Promise<IPuzzle[]> {
  if (isEqual(start, end)) return [];

  const priorityQueue: IPuzzleNode[] = [
    { state: cloneDeep(start), path: [cloneDeep(start)], cost: 0 },
  ];

  const visited = new Set<string>([JSON.stringify(start)]);

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => (a.cost + a.heuristic) - (b.cost + b.heuristic));
    const { state, path, cost } = priorityQueue.shift() as IPuzzleNode;

    for (const nextState of nextOf(state)) {
      const serializedState = JSON.stringify(nextState);
      if (visited.has(serializedState)) continue;

      visited.add(serializedState);

      const newPath = [...path, nextState];
      const heuristic = manhattanDistance(nextState, end);

      if (isEqual(nextState, end)) return newPath;

      priorityQueue.push({
        state: nextState,
        path: newPath,
        cost: cost + 1,
        heuristic,
      });
    }
  }

  throw new Error('No result found');
}

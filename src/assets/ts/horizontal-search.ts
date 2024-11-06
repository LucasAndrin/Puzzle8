import type {
  IPuzzle,
  IPuzzleBlock,
  IPuzzleBlockPos,
  IPuzzleNode,
} from '@/types/puzzle';

import cloneDeep from 'lodash/cloneDeep';
import clone from 'lodash/clone';
import isEqual from 'lodash/isEqual';
import merge from 'lodash/merge';

export function blockOf(state: IPuzzle, value: number): IPuzzleBlock {
  for (let y = 0; y < state.length; y++) {
    for (let x = 0; x < state[y].length; x++) {
      if (state[y][x] === value) {
        return { value, x, y };
      }
    }
  }

  throw new Error(`${value} not found in puzzle ${state}`);
}

export function emptyOf(state: IPuzzle) {
  return blockOf(state, 0);
}

export function toggleBlocksOf(
  state: IPuzzle,
  a: IPuzzleBlockPos,
  b: IPuzzleBlockPos,
): boolean {
  [state[a.y][a.x], state[b.y][b.x]] = [state[b.y][b.x], state[a.y][a.x]];

  return true;
}

export function toggleBlockOf(state: IPuzzle, value: number): boolean {
  const empty = emptyOf(state);
  const target = blockOf(state, value);
  if (blocksAdjacent(empty, target)) {
    return toggleBlocksOf(state, empty, target);
  }

  return false;
}

export function blocksAdjacent(a: IPuzzleBlock, b: IPuzzleBlock): boolean {
  const xAdjacent = Math.abs(a.x - b.x) === 1;
  const yAdjacent = Math.abs(a.y - b.y) === 1;

  return (xAdjacent && !yAdjacent) || (yAdjacent && !xAdjacent);
}

export function blocksInRangeOf(state: IPuzzle, block: IPuzzleBlock): boolean {
  return (
    block.x >= 0 &&
    block.x < state.length &&
    block.y >= 0 &&
    block.y < state.length
  );
}

export function nextOf(state: IPuzzle): IPuzzle[] {
  const empty = emptyOf(state);

  const targets: IPuzzleBlock[] = [
    merge(clone(empty), { y: empty.y + 1 }), // Up
    merge(clone(empty), { y: empty.y - 1 }), // Down
    merge(clone(empty), { x: empty.x - 1 }), // Left
    merge(clone(empty), { x: empty.x + 1 }), // Right
  ];

  const nextStates: IPuzzle[] = [];
  targets.forEach(target => {
    if (blocksInRangeOf(state, target)) {
      const newState = cloneDeep(state);
      toggleBlocksOf(newState, empty, target);

      nextStates.push(newState);
    }
  });

  return nextStates;
}

export async function horizontalSearch(
  start: IPuzzle,
  end: IPuzzle,
): Promise<IPuzzle[]> {
  if (isEqual(start, end)) {
    return [];
  }

  const queue: IPuzzleNode[] = [
    { state: cloneDeep(start), path: [cloneDeep(start)] },
  ];

  const visited = new Set<string>([JSON.stringify(start)]);

  while (queue.length > 0) {
    const { state, path } = queue.shift() as IPuzzleNode;

    for (const nextState of nextOf(state)) {
      const serializedState = JSON.stringify(nextState);
      if (visited.has(serializedState)) continue;

      visited.add(serializedState);

      const newPath = [...path, nextState];
      if (isEqual(nextState, end)) return newPath;

      queue.push({ state: nextState, path: newPath });
    }
  }

  throw new Error('No result found');
}

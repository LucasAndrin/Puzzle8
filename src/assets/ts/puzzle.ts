import type { IPuzzle, IPuzzleBlock, IPuzzleBlockPos } from '@/types/puzzle';
import { clone, cloneDeep, merge } from 'lodash';
import type { Ref } from 'vue';

function wait(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export async function animate(
  path: IPuzzle[],
  resultRef: Ref<IPuzzle | null | undefined>,
) {
  for (const state of path) {
    await wait(100);
    resultRef.value = state;
  }
}

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

export function manhattanDistance(state: IPuzzle, target: IPuzzle): number {
  let distance = 0;
  for (let y = 0; y < state.length; y++) {
    for (let x = 0; x < state[y].length; x++) {
      const value = state[y][x];
      if (value !== 0) {
        const { x: goalX, y: goalY } = blockOf(target, value);
        distance += Math.abs(x - goalX) + Math.abs(y - goalY);
      }
    }
  }
  return distance;
}

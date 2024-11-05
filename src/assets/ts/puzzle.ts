import cloneDeep from 'lodash/cloneDeep';

export type IPuzzleBlock = {
  value: number;
  xAxis: number;
  yAxis: number;
};

export type IPuzzle = IPuzzleBlock[];

export type IPuzzleBlockFind = (block: IPuzzleBlock) => boolean;

export function findBlock(puzzle: IPuzzle, find: IPuzzleBlockFind) {
  return puzzle.find(find);
}

export function findBlockByValue(puzzle: IPuzzle, value: number = 0) {
  return findBlock(puzzle, block => block.value === value);
}

export function blockIsAdjacent(target: IPuzzleBlock, empty: IPuzzleBlock) {
  const xAdjacent = Math.abs(target.xAxis - empty.xAxis) === 1;
  const yAdjacent = Math.abs(target.yAxis - empty.yAxis) === 1;

  return (xAdjacent && !yAdjacent) || (yAdjacent && !xAdjacent);
}

export function moveBlock(puzzle: IPuzzle, value: number): boolean {
  const target = findBlockByValue(puzzle, value);
  const empty = findBlockByValue(puzzle);

  if (target && empty && blockIsAdjacent(target, empty)) {
    return toggleBlocks(target, empty);
  }

  return false;
}

export function toggleBlocks(
  target: IPuzzleBlock,
  empty: IPuzzleBlock,
): boolean {
  [target.xAxis, empty.xAxis] = [empty.xAxis, target.xAxis];
  [target.yAxis, empty.yAxis] = [empty.yAxis, target.yAxis];

  return true;
}

function getPuzzleWeight(puzzle: IPuzzle): number {
  return puzzle.reduce((weight, block) => {
    return weight + block.value * (block.xAxis * 31 + block.yAxis * 17);
  }, 0);
}

export function findHorizontalSequence(
  start: IPuzzle,
  target: IPuzzle,
): IPuzzle[] {
  const visited = new Set<number>();
  const steps: IPuzzle[] = [];

  if (pushHorizontalSequence(start, target, visited, steps)) {
    steps.unshift(cloneDeep(start));
  }

  console.log(steps);

  return steps;
}

export function pushHorizontalSequence(
  puzzle: IPuzzle,
  target: IPuzzle,
  visited: Set<number>,
  steps: IPuzzle[],
): boolean {
  const targetWeight = getPuzzleWeight(target);
  const puzzleWeight = getPuzzleWeight(puzzle);

  if (puzzleWeight === targetWeight) {
    steps.push(cloneDeep(target));
    return true;
  }

  if (visited.has(puzzleWeight)) {
    return false;
  }

  visited.add(puzzleWeight);

  const empty = findBlockByValue(puzzle);

  if (!empty) {
    return false;
  }

  const moves = [
    { xAxis: empty.xAxis + 1, yAxis: empty.yAxis },
    { xAxis: empty.xAxis - 1, yAxis: empty.yAxis },
    { xAxis: empty.xAxis, yAxis: empty.yAxis + 1 },
    { xAxis: empty.xAxis, yAxis: empty.yAxis - 1 },
  ];

  return moves.some(({ xAxis, yAxis }) => {
    const block = findBlock(puzzle, block => {
      return block.xAxis === xAxis && block.yAxis === yAxis;
    });

    if (block) {
      const newPuzzle = cloneDeep(puzzle);
      moveBlock(newPuzzle, block.value);

      if (pushHorizontalSequence(newPuzzle, target, visited, steps)) {
        steps.unshift(newPuzzle);
        return true;
      }
    }

    return false;
  });
}

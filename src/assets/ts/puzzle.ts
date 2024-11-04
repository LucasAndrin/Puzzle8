export type IPuzzleBlock = {
  value: number
  xAxis: number
  yAxis: number
}

export type IPuzzle = IPuzzleBlock[]

export type IPuzzleBlockFind = (el: IPuzzleBlock) => boolean

export function findPuzzleBlock(puzzle: IPuzzle, find: IPuzzleBlockFind) {
  return puzzle.find(find)
}

export function findPuzzleBlockByValue(puzzle: IPuzzle, value: number = 0) {
  return findPuzzleBlock(puzzle, el => el.value === value)
}

export function movePuzzleBlock(puzzle: IPuzzle, value: number) {
  const target = findPuzzleBlockByValue(puzzle, value)
  const empty = findPuzzleBlockByValue(puzzle)

  if (target && empty) {
    ;[target.xAxis, empty.xAxis] = [empty.xAxis, target.xAxis]
    ;[target.yAxis, empty.yAxis] = [empty.yAxis, target.yAxis]
  }
}

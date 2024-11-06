export type IPuzzle = number[][];

export type IPuzzleNode = {
  state: IPuzzle;
  path: IPuzzle[];
};

export type IPuzzleBlock = {
  value: number;
} & IPuzzleBlockPos;

export type IPuzzleBlockPos = {
  x: number;
  y: number;
};

export type IPuzzleBlockMap = Map<IPuzzleBlock['value'], IPuzzleBlock>;

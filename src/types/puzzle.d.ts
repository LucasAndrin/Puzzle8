export type IPuzzle = number[][];

export type IPuzzleStep = {
  state: IPuzzle;
  path: IPuzzle[];
};

export type IPuzzleHeuristicStep = IPuzzleStep & {
  cost: number;
  heuristic: number;
};

export type IPuzzleBlock = {
  value: number;
} & IPuzzleBlockPos;

export type IPuzzleBlockPos = {
  x: number;
  y: number;
};

export type IPuzzleBlockMap = Map<IPuzzleBlock['value'], IPuzzleBlock>;

export type IPuzzleNode = {
  state: IPuzzle;
  children: IPuzzleNode[];
  parent?: IPuzzleNode;
};

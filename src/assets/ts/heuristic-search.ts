import type { IPuzzle } from '@/types/puzzle';

import isEqual from 'lodash/isEqual';

function heuristicSearch(start: IPuzzle, end: IPuzzle) {
  if (isEqual(start, end)) {
    return [];
  }

  return null;
}

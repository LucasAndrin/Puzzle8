import type { IPuzzle } from '@/types/puzzle';
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

import type { Areas, Meters } from '../interfaces/interfaces.inputData';
import { checkFetchError } from './checkFetchError';

export default async function simpleGet(url: string): Promise<Meters | Areas> {
  const options = {
    method: 'GET',
  };

  const response = await fetch(url, options);

  const res = await checkFetchError(response);

  return res;
}

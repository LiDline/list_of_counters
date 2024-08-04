import type {
  Areas,
  GetParam,
  Meters,
} from '../../interfaces/interfaces.inputData';

import { checkFetchError } from './checkFetchError';

export default async function simpleGet(
  url: string,
  params?: GetParam
): Promise<Meters | Areas> {
  const options = {
    method: 'GET',
  };

  const paramsSearch = params ? new URLSearchParams(params).toString() : '';

  const fullUrl = `${url}?${paramsSearch}`;

  const response = await fetch(fullUrl, options);

  const res = await checkFetchError(response);

  return res;
}

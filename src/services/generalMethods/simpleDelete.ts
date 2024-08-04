import { API_URL } from '../../CONST';
import { checkFetchError } from './checkFetchError';

export default async function simpleDelete(endUrl: string) {
  const options = {
    method: 'DELETE',
  };

  const fullUrl = `${API_URL}/`;

  const response = await fetch(fullUrl, options);

  const res = await checkFetchError(response);

  return res;
}

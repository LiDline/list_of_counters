import { API_URL } from '../CONST';
import { checkFetchError } from './checkFetchError';

export default async function deleteMeter(id: string) {
  const options = {
    method: 'DELETE',
  };

  const fullUrl = `${API_URL}/meters/:${id}`;

  const response = await fetch(fullUrl, options);

  const res = await checkFetchError(response);

  return res;
}

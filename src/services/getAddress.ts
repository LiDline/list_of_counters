import type { Areas } from '../interfaces/interfaces.inputData';

import { API_URL } from '../CONST';
import simpleGet from './generalMethods/simpleGet';

export default async function getAddress(idList: string[]) {
  const result = (await simpleGet(`${API_URL}/areas/`, {
    id__in: idList.join(','),
  })) as Areas;

  return result;
}

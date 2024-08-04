import type {
  GetMeters,
  MeterForTableType,
  Meters,
} from '../interfaces/interfaces.inputData';

import { API_URL, LIMIT } from '../CONST';

import getAddress from './getAddress';
import simpleGet from './generalMethods/simpleGet';
import { createMeterForTable } from './generalMethods/utils';

export default async function getMeters(
  offset = 0,
  limit = LIMIT
): Promise<GetMeters> {
  const metersResponse = (await simpleGet(`${API_URL}/meters/`, {
    limit: `${limit}`,
    offset: `${offset}`,
  })) as Meters;

  const { count, result } = metersResponse;

  const areasId = Array.from(new Set(result.map((r) => r.area.id)));

  const areas = await getAddress(areasId);

  const meters: MeterForTableType[] = result.map((m) => {
    const area = areas.result.filter((as) => as.id === m.area.id)[0];

    const res = createMeterForTable(m, area);

    return res;
  });

  const totalPage = Math.ceil(count / LIMIT);

  return { totalPage, meters };
}

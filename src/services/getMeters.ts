import type {
  GetMeters,
  MeterForTableType,
  Meters,
} from '../interfaces/interfaces.inputData';

import { API_URL, LIMIT } from '../CONST';
import simpleGet from './simpleGet';
import getAddress from './getAddress';

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
    const area =
      areas.result.filter((as) => as.id === m.area.id)[0] ?? 'Нет адреса';

    const {
      communication,
      serial_number,
      brand_name,
      model_name,
      ...needReturn
    } = m;

    const res = {
      ...needReturn,
      area: area.house.address + ', ' + area.str_number_full,
    };

    return res;
  });

  const totalPage = Math.ceil(count / LIMIT);

  return { totalPage, meters, areasId };
}

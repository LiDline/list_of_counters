import type {
  GetMeters,
  MeterForTableType,
  Meters,
} from '../interfaces/interfaces.inputData';

import { API_URL, LIMIT } from '../CONST';
import simpleGet from './simpleGet';
import getAddress from './getAddress';

export default async function getMeters(offset = 0): Promise<GetMeters> {
  const metersResponse = (await simpleGet(`${API_URL}/meters/`, {
    limit: `${LIMIT}`,
    offset: `${offset}`,
  })) as Meters;

  const { count, result } = metersResponse;

  const areasId = Array.from(new Set(result.map((r) => r.area.id)));

  const areas = await getAddress(areasId);

  const meters = result.forEach((m) => {
    const area =
      areas.result.filter((as) => as.id === m.area.id)[0] ?? 'Нет адреса';

    const {
      communication,
      serial_number,
      brand_name,
      model_name,
      ...needReturn
    } = m;

    return {
      needReturn,
      area: area.house.address + ', ' + area.str_number_full,
    } as MeterForTableType;
  });

  const totalPage = Math.ceil(count / LIMIT);

  return { totalPage, meters };
}

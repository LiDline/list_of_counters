import type {
  MeterForTableType,
  Meters,
} from '../interfaces/interfaces.inputData';

import getOffset from '../models/func/getOffset';
import simpleDelete from './generalMethods/simpleDelete';
import simpleGet from './generalMethods/simpleGet';
import { API_URL, LIMIT } from '../CONST';
import createNewMeters from './deleteMeters/createNewMeters';

export default async function deleteMeter(
  id: string,
  page: number,
  meters: MeterForTableType[]
): Promise<MeterForTableType[]> {
  const offsetForNewMeter = getOffset(page) + LIMIT;

  const newMeterResponse = (await simpleGet(`${API_URL}/meters/`, {
    limit: `${1}`,
    offset: `${offsetForNewMeter}`,
  })) as Meters;

  await simpleDelete(`meters/:${id}`);

  const metersWithoutDeleted = meters.filter((m, i) => m.id !== id);

  if (!newMeterResponse.result.length) {
    return metersWithoutDeleted;
  }

  const meterForTable = await createNewMeters(newMeterResponse, meters);

  return [...metersWithoutDeleted, meterForTable];
}

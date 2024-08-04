import type {
  MeterForTableType,
  Meters,
} from '../../interfaces/interfaces.inputData';
import {
  createMeterForTable,
  prepareDataForMeterType,
} from '../generalMethods/utils';
import getAddress from '../getAddress';

export default async function createNewMeters(
  newMeter: Meters,
  meters: MeterForTableType[]
) {
  const areaIdOfNewMeter = newMeter.result[0].area.id;

  const areasId = Array.from(new Set(meters.map((r) => r.area.id)));

  let meterForTable: MeterForTableType;

  if (!areasId.includes(areaIdOfNewMeter)) {
    const areas = await getAddress([areaIdOfNewMeter]);

    meterForTable = createMeterForTable(newMeter.result[0], areas.result[0]);
  } else {
    const area = meters.filter((m) => m.area.id === areaIdOfNewMeter)[0].area;

    const needReturn = prepareDataForMeterType(newMeter.result[0]);

    meterForTable = {
      ...needReturn,
      area,
    };
  }

  return meterForTable;
}

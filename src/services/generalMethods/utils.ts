import type {
  Area,
  MeterForTableType,
  MeterType,
} from '../../interfaces/interfaces.inputData';

export const prepareDataForMeterType = (m: MeterType) => {
  const {
    communication,
    serial_number,
    brand_name,
    model_name,
    ...needReturn
  } = m;

  return needReturn;
};

export const createMeterForTable = (
  m: MeterType,
  area: Area | undefined
): MeterForTableType => {
  const needReturn = prepareDataForMeterType(m);

  const res: MeterForTableType = {
    ...needReturn,
    area: {
      id: area?.id ?? '',
      name: area?.house.address + ', ' + area?.str_number_full ?? 'Нет адреса',
    },
  };

  return res;
};

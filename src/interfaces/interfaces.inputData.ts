import { Instance } from 'mobx-state-tree';
import { MeterForTable } from '../models/meterModel';

export type MeterForTableType = Instance<typeof MeterForTable>;

export type MeterType = Omit<MeterForTableType, 'area'> & {
  area: {
    id: string;
  };
  communication: string;
  serial_number: string;
  brand_name: string;
  model_name: string;
};

export type Area = {
  id: string;
  number: number;
  str_number: string;
  str_number_full: string;
  house: {
    address: string;
    id: string;
    fias_addrobjs: string[];
  };
};

export type Meters = {
  count: number;
  next: string;
  previous: string;
  result: MeterType[];
};

export type Areas = Omit<Meters, 'result'> & {
  result: Area[];
};

export type GetParam = Record<string, string>;

export interface GetMeters {
  totalPage: number;
  meters: MeterForTableType[];
}

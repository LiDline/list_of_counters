import { Instance } from 'mobx-state-tree';
import { Meter } from '../models/meterModel';

export type MeterType = Instance<typeof Meter>;

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

export type GetParam = Record<'limit' | 'offset', string>;

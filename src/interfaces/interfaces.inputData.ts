export type MeterType = 'HotWaterAreaMeter' | 'ColdWaterAreaMeter';

export type Meter = {
  id: string;
  _type: (MeterType | 'AreaMeter')[];
  area: {
    id: string;
  };
  is_automatic: boolean;
  communication: string;
  description: string;
  serial_number: string;
  installation_date: string;
  brand_name: string;
  model_name: string;
  initial_values: number[];
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
  result: Meter[];
};

export type Areas = Omit<Meters, 'result'> & {
  result: Area[];
};

export type GetParam = Record<'limit' | 'offset', string>;

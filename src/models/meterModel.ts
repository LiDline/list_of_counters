import { types } from 'mobx-state-tree';

export const Meter = types.model('Meter', {
  id: types.string,
  _type: types.array(
    types.union(
      types.enumeration(['HotWaterAreaMeter', 'ColdWaterAreaMeter']),
      types.literal('AreaMeter')
    )
  ),
  area: types.model({
    id: types.string,
  }),
  is_automatic: types.boolean,
  communication: types.string,
  description: types.string,
  serial_number: types.string,
  installation_date: types.string,
  brand_name: types.string,
  model_name: types.string,
  initial_values: types.array(types.number),
});

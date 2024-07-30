import { types } from 'mobx-state-tree';

export const MeterForTable = types.model('Meter', {
  id: types.string,
  _type: types.array(
    types.union(
      types.enumeration(['HotWaterAreaMeter', 'ColdWaterAreaMeter']),
      types.literal('AreaMeter')
    )
  ),
  area: types.string,
  is_automatic: types.boolean,
  description: types.string,
  installation_date: types.string,
  initial_values: types.array(types.number),
});

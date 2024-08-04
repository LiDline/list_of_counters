import { types, flow, cast } from 'mobx-state-tree';

import type {
  GetMeters,
  MeterForTableType,
} from '../interfaces/interfaces.inputData';

import { MeterForTable } from './meterModel';
import getMeters from '../services/getMeters';
import getOffset from './func/getOffset';
import deleteMeter from '../services/deleteMeters';

export const PaginationModel = types
  .model({
    meters: types.array(MeterForTable),
    currentPage: types.optional(types.number, 1),
    totalPage: types.optional(types.number, 0),
  })
  .actions((self) => ({
    fetchMeters: flow(function* (page: number = 1) {
      const offset = getOffset(page);

      const response: GetMeters = yield getMeters(offset);

      self.meters = cast(response.meters);
      self.totalPage = response.totalPage;
      self.currentPage = page;
    }),

    deleteMeter: flow(function* (id: string) {
      const res: MeterForTableType[] = yield deleteMeter(
        id,
        self.currentPage,
        self.meters
      );

      self.meters = cast(res);
    }),
  }));

import { types, flow } from 'mobx-state-tree';

import { MeterForTable } from './meterModel';
import { LIMIT } from '../CONST';
import getMeters from '../services/getMeters';
import { GetMeters } from '../interfaces/interfaces.inputData';

export const PaginationModel = types
  .model({
    meters: types.array(MeterForTable),
    currentPage: types.optional(types.number, 1),
    totalPage: types.optional(types.number, 0),
  })
  .actions((self) => ({
    fetchMeters: flow(function* (page: number = 1) {
      const offset = (page - 1) * LIMIT;

      const response: GetMeters = yield getMeters(offset);

      self.meters = response.meters;
      self.totalPage = response.totalPage;
      self.currentPage = page;
    }),
  }));

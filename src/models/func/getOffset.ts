import { LIMIT } from '../../CONST';

export default function getOffset(page: number) {
  return (page - 1) * LIMIT;
}

import { Month, Week } from '@prisma/client';

export type MonthDto = Month & {
  weeks: Week[];
};

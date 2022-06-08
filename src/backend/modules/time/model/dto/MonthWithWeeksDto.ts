import { MonthDto } from './MonthDto';
import { Week } from '@prisma/client';

export interface MonthWithWeeksDto {
  month: MonthDto;
  weeks: Week[];
}

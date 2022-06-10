import { CreateMonthDto } from './CreateMonthDto';
import { Week } from '@prisma/client';

export interface MonthWithWeeksDto {
  month: CreateMonthDto;
  weeks: Week[];
}

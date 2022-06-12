import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/services';
import { Month, Prisma, Week } from '@prisma/client';
import { CreateMonthDto } from '../../model/dto/CreateMonthDto';

@Injectable()
export class TimeService {
  constructor(private prisma: PrismaService) {}

  public async createWeek(data: Prisma.WeekCreateInput): Promise<Week> {
    return this.prisma.week.create({ data });
  }

  public async getWeek(
    weekWhereUniqueInput: Prisma.WeekWhereUniqueInput,
  ): Promise<Week | null> {
    return this.prisma.week.findUnique({ where: weekWhereUniqueInput });
  }

  public createMonth(month: CreateMonthDto) {
    const monthMap = new Map<number, string>([
      [1, 'January'],
      [2, 'February'],
      [3, 'March'],
      [4, 'April'],
      [5, 'May'],
      [6, 'June'],
      [7, 'July'],
      [8, 'August'],
      [9, 'September'],
      [10, 'October'],
      [11, 'November'],
      [12, 'December'],
    ]);

    const monthName: string = monthMap.get(month.monthIndex);
    console.log(monthName);
    const monthToCreate: Prisma.MonthCreateInput = {
      name: monthName,
      year: 2022,
    };

    return this.prisma.month.create({ data: monthToCreate });
  }

  public getAllWeeks() {
    return this.prisma.week.findMany();
  }

  public getAllMonthsWithWeeks(): Promise<
    (Month & {
      weeks: Week[];
    })[]
  > {
    return this.prisma.month.findMany({ include: { weeks: true } });
  }

  async addWeekToMonth(
    month: string,
    year: number,
    weekData: Prisma.WeekCreateInput,
  ) {
    const foundMonth = await this.findMonthByNameAndYear(month, year);
    if (foundMonth == null) {
      throw new HttpException(`Month ${month} not found`, HttpStatus.NOT_FOUND);
    }

    // calculate total hours
    let totalHours = 0;
    Object.values(weekData).forEach(
      (hours: number) => (totalHours = totalHours + hours),
    );

    this.createWeek({
      monday: weekData.monday,
      tuesday: weekData.tuesday,
      wednesday: weekData.wednesday,
      thursday: weekData.thursday,
      friday: weekData.friday,
      totalHours: totalHours,
      month: {
        connect: {
          id: foundMonth.id,
        },
      },
    });
  }

  public updateWeekOfMonth(weekId: number, data: Prisma.WeekUpdateInput) {
    const where = { id: weekId };
    return this.prisma.week.update({ data, where });
  }

  public findMonthByNameAndYear(
    month: string,
    year: number,
    includeWeeks = false,
  ): Promise<Month> {
    return this.prisma.month.findFirst({
      where: {
        AND: [
          {
            name: {
              equals: month,
            },
          },
          {
            year: {
              equals: year,
            },
          },
        ],
      },
      include: {
        weeks: includeWeeks,
      },
    });
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/services';
import { Prisma, Week, Month } from '@prisma/client';

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

  public createMonth(data: Prisma.MonthCreateInput) {
    return this.prisma.month.create({ data });
  }

  public getAllWeeks() {
    return this.prisma.week.findMany();
  }

  public getAllMonthsWithWeeks() {
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

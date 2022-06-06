import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/services';
import { Prisma, Week } from '@prisma/client';

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

  getAllWeeks() {
    return this.prisma.week.findMany();
  }

  getAllMonths() {
    return this.prisma.week.findMany();
  }
}

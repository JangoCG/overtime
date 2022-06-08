import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TimeService } from './time.service';
import { Prisma } from '@prisma/client';
import { MonthDto } from '../../model/dto/MonthDto';

@Controller('api/v1/times')
export class TimeController {
  constructor(private timeService: TimeService) {}

  @Get('/weeks')
  public getAllWeeks() {
    return this.timeService.getAllWeeks();
  }

  @Post('/month')
  public createMonth(@Body() month: MonthDto) {
    return this.timeService.createMonth(month);
  }

  @Get('/months')
  public getAllMonths() {
    return this.timeService.getAllMonthsWithWeeks();
  }

  @Patch('/month/:month/:year')
  public addWeekToMonth(
    @Param('month') month: string,
    @Param('year') year: string,
    @Body()
    weekData: Prisma.WeekCreateInput,
  ) {
    return this.timeService.addWeekToMonth(month, parseInt(year), weekData);
  }

  @Get('/month/:month/:year')
  public getMonthByName(
    @Param('month') month: string,
    @Param('year') year: string,
  ) {
    return this.timeService.findMonthByNameAndYear(month, parseInt(year), true);
  }
}

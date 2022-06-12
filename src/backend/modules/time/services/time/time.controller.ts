import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TimeService } from './time.service';
import { Prisma, Week } from '@prisma/client';
import { CreateMonthDto } from '../../model/dto/CreateMonthDto';

@Controller('api/v1/times')
export class TimeController {
  constructor(private timeService: TimeService) {}

  @Get('/weeks')
  public getAllWeeks(): Promise<Week[] | null> {
    const test = this.timeService.getAllWeeks();
    console.log(test);
    return this.timeService.getAllWeeks();
  }

  @Post('/month')
  public createMonth(@Body() month: CreateMonthDto) {
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

  @Patch('/week/:weekId')
  public updateWeekOfMonth(
    @Param('weekId') weekId: string,
    @Body()
    weekData: Prisma.WeekUpdateInput,
  ) {
    return this.timeService.updateWeekOfMonth(Number(weekId), weekData);
  }

  @Get('/month/:month/:year')
  public getMonthByName(
    @Param('month') month: string,
    @Param('year') year: string,
  ) {
    return this.timeService.findMonthByNameAndYear(month, parseInt(year), true);
  }
}

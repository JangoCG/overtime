import { Controller, Get, Post } from '@nestjs/common';
import { TimeService } from './time.service';

@Controller('api/v1/times')
export class TimeController {
  constructor(private timeService: TimeService) {}
  @Get()
  public getWeek(): string {
    this.timeService.getWeek({});
    return 'hi form time asdasdasd';
  }

  @Get('/weeks')
  public getWeeks() {
    return this.timeService.getAllWeeks();
  }

  @Post()
  public createWeek() {
    const res = this.timeService.createWeek({
      monday: 8,
      tusday: 8,
      Month: {
        connect: {
          id: 1,
        },
      },
    });

    // const month = this.timeService.createMonth({
    //   name: 'June',
    //   weeks: {
    //     connect: { id: 1 },
    //   },
    //   year: 2022,
    // });
    //
    // console.log(res);
    // console.log(month);
    return res;
  }

  @Get('/months')
  public getMonths() {
    return this.timeService.getAllMonths();
  }
}

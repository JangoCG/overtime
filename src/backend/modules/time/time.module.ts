import { Module } from '@nestjs/common';
import { TimeController } from './services/time/time.controller';
import { TimeService } from './services/time/time.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  controllers: [TimeController],
  providers: [TimeService],
  imports: [SharedModule],
})
export class TimeModule {}

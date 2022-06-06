import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './modules/shared/shared.module';
import { PostService } from './prisma-example/post/post.service';
import { UserService } from './prisma-example/user-service/user-service.service';
import { TimeModule } from './modules/time/time.module';

@Module({
  imports: [SharedModule, TimeModule],
  controllers: [AppController],
  providers: [AppService, PostService, UserService],
})
export class AppModule {}

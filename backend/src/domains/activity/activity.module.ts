import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Activity } from './entities/activity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Activity])],
  providers: [ActivityService],
  exports: [ActivityService],
})
export class ActivityModule {}

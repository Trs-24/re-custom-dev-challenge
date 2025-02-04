import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { UserModule } from '../user/user.module';
import { ActivityModule } from '../activity/activity.module';

@Module({
  imports: [UserModule, ActivityModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}

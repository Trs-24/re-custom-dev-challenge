import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportService } from './report.service';

@Controller('pdf')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get(':user-id')
  async generatePdf(@Param('user-id') userId: string, @Res() res: Response) {
    return await this.reportService.generateUserReport(userId, res);
  }
}

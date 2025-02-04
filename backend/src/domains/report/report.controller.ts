import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ReportService } from './report.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pdf')
@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get(':id')
  async generatePdf(@Param('id') userId: string, @Res() res: Response) {
    return await this.reportService.generateUserReport(userId, res);
  }
}

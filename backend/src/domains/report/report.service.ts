import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import { Response } from 'express';
import { UserService } from 'src/domains/user/user.service';

@Injectable()
export class ReportService {
  constructor(private readonly userService: UserService) {}
  async generateUserReport(userId: string, response: Response) {
    const user = await this.userService.findById(userId, true);
    const doc = new PDFDocument();

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      `attachment; filename=${user.email}_report.pdf`,
    );

    doc.pipe(response);

    doc.fontSize(18).text('User Report', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Name: ${user.name}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Role: ${user.role}`);
    doc.moveDown();

    doc.text(`Total Logins: ${user.totalLogins}`);
    doc.text(`Total Downloads: ${user.totalDownloads}`);
    doc.moveDown();

    doc.fontSize(14).text('Recent Activity:', { underline: true });
    doc.moveDown();

    const tableTop = doc.y;

    doc.fontSize(12).text('Action', 50, tableTop);
    doc.text('Date', 250, tableTop);
    doc.text('Status', 400, tableTop);
    doc.moveDown();

    user.recentActivity.forEach((activity: any, index: number) => {
      const y = tableTop + 20 + index * 20;
      doc.text(activity.action, 50, y);
      doc.text(activity.date, 250, y);
      doc.text(activity.status, 400, y);
    });

    doc.end();
  }
}

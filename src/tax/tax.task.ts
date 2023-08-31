import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TaxFT, TaxService } from './tax.service';
import { InvoiceService } from 'src/invoice/invoice.service';

@Injectable()
export class TaxTaskService {
  constructor(
    private taxService: TaxService,
    private invoiceService: InvoiceService,
  ) {}
  @Cron('*/30 * * * * *')
  start() {
    const isNestDate = new Date();
    const now = new Date();
    const thirtySecondsAgo = new Date(now.getTime() - 10000);
    console.log(' de ', thirtySecondsAgo, ' à :', now);
    this.taxService
      .findAll({
        where: {
          OR: [
            {
              // nextDate:now,
              nextDate: {
                gte: thirtySecondsAgo, // Date actuelle - 30 secondes
                lte: now, // Date actuelle
              },
              isActif: true,
            },
          ],
        },
      })
      .then((taxList) => {
        for (const tax of taxList) {
          console.log('tax recupperer', tax.id);
          console.log(isNestDate, tax.nextDate);
          this.invoiceService.create(tax);
          this.update(tax);
        }
      });
  }
  async update(tax: TaxFT) {
    const nextDate: Date = new Date();
    if (tax.frequence.isMonth) {
      nextDate.setMonth(nextDate.getMonth() + tax.frequence.recurrence);
    } else {
      nextDate.setFullYear(nextDate.getFullYear() + tax.frequence.recurrence);
    }
    this.taxService.update({
      where: { id: tax.id },
      data: { nextDate: nextDate },
    });
  }
}

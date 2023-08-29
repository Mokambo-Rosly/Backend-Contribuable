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
  @Cron('* * * * * *')
  async start() {
    const taxList = await this.taxService.findAll({
      where: {
        OR: [{ nextDate: new Date(), isActif: true }],
      },
    });
    for (const tax of taxList) {
      console.log('Traitement');
      await this.invoiceService.create(tax);
      await this.update(tax);
    }
    // console.log('Delcaration de payement');
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

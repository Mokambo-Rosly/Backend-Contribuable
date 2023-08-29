import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InvoiceService } from './invoice.service';
import { PenalityService } from './penality.service';

@Injectable()
export class InvoiceTaskService {
  constructor(
    private penalityService: PenalityService,
    private invoiceService: InvoiceService, // private eventService: EventEmitter2,
  ) {}
  @Cron('* * * * * *')
  async start() {
    const invoiceList = await this.invoiceService.findAll({
      lastDelay: new Date(),
    });
    const invoicefilter = invoiceList.filter(
      (invoice) =>
        invoice.montant >
        invoice.payment.reduce((total, p) => total + Number(p.credit), 0),
    );
    for (const invoice of invoicefilter) {
      const lastDelay = new Date();
      lastDelay.setDate(lastDelay.getDate() + invoice.tax.delay);
      this.penalityService.create({
        montant:
          invoice.montant -
          invoice.payment.reduce((total, p) => total + Number(p.credit), 0) +
          Number(invoice.tax.penality),
        lastDelay: lastDelay,
        invoice: {
          connect: {
            id: invoice.id,
          },
        },
      });
    }
  }
}

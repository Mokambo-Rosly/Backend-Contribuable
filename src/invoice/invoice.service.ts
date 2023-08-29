import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import axios from 'axios';
import { TaxFT } from 'src/tax/tax.service';
console.log(process.env.CRON_ENV);
@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}
  async create(tax: TaxFT) {
    return await axios.post(process.env.CRON_ENV, tax);
  }
  findAll(where?: Prisma.InvoiceWhereInput) {
    return this.prisma.invoice.findMany({
      where,
      include: {
        penalyte: true,
        payment: true,
        tax: true,
        taxPayer: { include: { user: true } },
      },
    });
  }
  findSum(
    where?: Prisma.InvoiceWhereInput,
    _sum?: Prisma.InvoiceSumAggregateInputType,
  ) {
    return this.prisma.invoice.aggregate({ where, _sum });
  }
}

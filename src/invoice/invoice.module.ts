import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceTaskService } from './invoice.task';

@Module({
  imports: [],
  controllers: [],
  providers: [InvoiceService, InvoiceTaskService],
  exports: [InvoiceService],
})
export class InvoiceModule {}

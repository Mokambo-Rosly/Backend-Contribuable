import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceTaskService } from './invoice.task';
import { PenalityService } from './penality.service';

@Module({
  imports: [],
  controllers: [],
  providers: [InvoiceService, InvoiceTaskService, PenalityService],
  exports: [InvoiceService],
})
export class InvoiceModule {}

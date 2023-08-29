import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { InvoiceTaskService } from './invoice.task';
import { PenaltyModule } from 'src/penalty/penalty.module';

@Module({
  imports: [PenaltyModule],
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceTaskService],
  exports: [InvoiceService],
})
export class InvoiceModule {}

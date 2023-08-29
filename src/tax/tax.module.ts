import { Module } from '@nestjs/common';
import { TaxService } from './tax.service';
import { TaxTaskService } from './tax.task';
import { InvoiceModule } from 'src/invoice/invoice.module';

@Module({
  imports: [InvoiceModule],
  controllers: [],
  providers: [TaxService, TaxTaskService],
  exports: [TaxService, TaxTaskService],
})
export class TaxModule {}

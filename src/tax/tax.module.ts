import { Module } from '@nestjs/common';
import { TaxService } from './tax.service';
import { TaxController } from './tax.controller';
import { FrequenceModule } from 'src/frequence/frequence.module';
import { TaxTaskService } from './tax.task';
import { InvoiceModule } from 'src/invoice/invoice.module';

@Module({
  imports: [FrequenceModule, InvoiceModule],
  controllers: [TaxController],
  providers: [TaxService, TaxTaskService],
  exports: [TaxService, TaxTaskService],
})
export class TaxModule {}

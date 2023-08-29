import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceModule } from './invoice/invoice.module';
import { TaxModule } from './tax/tax.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [InvoiceModule, TaxModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

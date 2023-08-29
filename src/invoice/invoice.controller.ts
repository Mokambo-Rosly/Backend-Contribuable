import { Controller, Get, Request } from '@nestjs/common';
import { LoginRequest } from 'src/notification-store/notification-store.service';
import { InvoiceService } from './invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  async findAll() {
    return await this.invoiceService.findAll({});
  }

  @Get('me')
  async findOne(@Request() login: LoginRequest) {
    const { user } = login;
    return await this.invoiceService.findAll({ taxPayer: { userId: user.id } });
  }
}

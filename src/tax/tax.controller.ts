import {
  Controller,
  Get,
  Patch,
  Delete,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TaxService } from './tax.service';
import { I18n, I18nContext } from 'nestjs-i18n';
import {
  CreateTaxDto,
  NestDate,
  ToogleTaxDto,
  UpdateTaxDto,
} from './dto/tax.dto';
import { ValidatorRessource } from 'src/common/validator';
import { FrequenceService } from 'src/frequence/frequence.service';
import { InvoiceService } from 'src/invoice/invoice.service';

@Controller('tax')
export class TaxController {
  constructor(
    private readonly taxService: TaxService,
    private readonly invoiceService: InvoiceService,
    private readonly frequenceService: FrequenceService,
  ) {}
  @Post()
  async create(@Body() data: CreateTaxDto, @I18n() lang: I18nContext) {
    const tax = CreateTaxDto.factory(data);
    const vlRessource = new ValidatorRessource(lang);
    await vlRessource.register(tax, 'tax');
    vlRessource.validate();
    const frequence = await this.frequenceService.findOne({
      id: tax.frequenceId,
    });
    const nextDate: Date = new Date();
    if (frequence.isMonth) {
      nextDate.setMonth(nextDate.getMonth() + frequence.recurrence);
    } else {
      nextDate.setFullYear(nextDate.getFullYear() + frequence.recurrence);
    }
    const taxRessource = await this.taxService.create({
      delay: tax.delay,
      describe: tax.describe,
      rate: tax.rate,
      rising: tax.rising,
      penality: tax.penality,
      title: tax.title,
      nextDate: nextDate,
      type: {
        connect: {
          id: tax.taxTypeId,
        },
      },
      frequence: {
        connect: {
          id: tax.frequenceId,
        },
      },
    });
    this.invoiceService.create(taxRessource);
    return { ...taxRessource };
  }
  @Get()
  async find() {
    return await this.taxService.findAll({ where: {} });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.taxService.findOne({ id });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTaxDto,
    @I18n() lang: I18nContext,
  ) {
    const tax = UpdateTaxDto.factory(data);
    const vlRessource = new ValidatorRessource(lang);
    await vlRessource.register(tax, 'tax', { dtoField: 'id', value: id });
    vlRessource.validate();
    const taxRessource = await this.taxService.update({
      where: { id },
      data: {
        delay: tax.delay,
        describe: tax.describe,
        rate: tax.rate,
        rising: tax.rising,
        penality: tax.penality,
        title: tax.title,
        ...(tax.taxTypeId
          ? {
              type: {
                connect: {
                  id: tax.taxTypeId,
                },
              },
            }
          : {}),
        ...(tax.frequenceId
          ? {
              frequence: {
                connect: {
                  id: tax.frequenceId,
                },
              },
            }
          : {}),
      },
    });
    return { ...taxRessource };
  }

  @Patch(':id/lance')
  async lance(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: NestDate,
    @I18n() lang: I18nContext,
  ) {
    const tax = NestDate.factory(data);
    const vlRessource = new ValidatorRessource(lang);
    await vlRessource.register(tax, 'tax', { dtoField: 'id', value: id });
    vlRessource.validate();
    const taxRessource = await this.taxService.update({
      where: { id },
      data: {
        nextDate: tax.nextDate,
      },
    });
    return { ...taxRessource };
  }

  @Patch(':id/toogle')
  async toogleTax(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ToogleTaxDto,
    @I18n() lang: I18nContext,
  ) {
    const tax = ToogleTaxDto.factory(data);
    const vlRessource = new ValidatorRessource(lang);
    await vlRessource.register(tax, 'tax', { dtoField: 'id', value: id });
    vlRessource.validate();
    const dbTax = await this.taxService.findOne({ id: id });
    const nextDate: Date = new Date();
    if (tax.isActif) {
      if (dbTax.frequence.isMonth) {
        nextDate.setMonth(nextDate.getMonth() + dbTax.frequence.recurrence);
      } else {
        nextDate.setFullYear(
          nextDate.getFullYear() + dbTax.frequence.recurrence,
        );
      }
    }

    const taxRessource = await this.taxService.update({
      where: { id },
      data: {
        isActif: tax.isActif,
        nextDate: nextDate,
      },
    });
    return { ...taxRessource };
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.taxService.remove({ id });
  }
}

import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { IsExistPrisma } from 'src/common/decorator/exist.decorator';

export class CreateTaxDto {
  @IsNotEmpty({ message: i18nValidationMessage('validation.IsNotEmpty') })
  @IsString({ message: i18nValidationMessage('validation.IsString') })
  title: string;
  @IsString({ message: i18nValidationMessage('validation.IsString') })
  describe: string;
  @IsNotEmpty({ message: i18nValidationMessage('validation.IsNotEmpty') })
  @IsNumber({}, { message: i18nValidationMessage('validation.IsNumber') })
  delay: number;
  @ValidateIf((ctaxDto: CreateTaxDto) =>
    ctaxDto.rising === undefined ? true : false,
  )
  @IsNotEmpty({ message: i18nValidationMessage('validation.IsNotEmpty') })
  @IsNumber({}, { message: i18nValidationMessage('validation.IsNumber') })
  rate: number;
  @ValidateIf((ctaxDto: CreateTaxDto) =>
    ctaxDto.rate === undefined ? true : false,
  )
  @IsNotEmpty({ message: i18nValidationMessage('validation.IsNotEmpty') })
  @IsNumber({}, { message: i18nValidationMessage('validation.IsNumber') })
  rising: number;
  @IsNotEmpty({ message: i18nValidationMessage('validation.IsNotEmpty') })
  @IsNumber({}, { message: i18nValidationMessage('validation.IsNumber') })
  penality: number;
  @IsNotEmpty({ message: i18nValidationMessage('validation.IsNotEmpty') })
  @IsNumber({}, { message: i18nValidationMessage('validation.IsNumber') })
  @IsExistPrisma('taxType', 'id', {
    message: i18nValidationMessage('validation.IsExist'),
  })
  taxTypeId: number;
  @IsNotEmpty({ message: i18nValidationMessage('validation.IsNotEmpty') })
  @IsNumber({}, { message: i18nValidationMessage('validation.IsNumber') })
  @IsExistPrisma('frequence', 'id', {
    message: i18nValidationMessage('validation.IsExist'),
  })
  frequenceId: number;

  static factory(partial: Partial<CreateTaxDto>): CreateTaxDto {
    const tax = new CreateTaxDto();
    if (partial) {
      tax.title = partial.title;
      tax.describe = partial.describe;
      tax.delay = partial.delay;
      tax.rate = partial.rate;
      tax.rising = partial.rising;
      tax.penality = partial.penality;
      tax.taxTypeId = partial.taxTypeId;
      tax.frequenceId = partial.frequenceId;
    }
    return tax;
  }
}
export class NestDate {
  @IsNotEmpty({ message: i18nValidationMessage('validation.IsNotEmpty') })
  @IsNumber({}, { message: i18nValidationMessage('validation.IsNumber') })
  @IsExistPrisma('tax', 'id', {
    message: i18nValidationMessage('validation.IsExist'),
  })
  id: number;

  @IsNotEmpty({ message: i18nValidationMessage('validation.IsNotEmpty') })
  @IsDate({ message: i18nValidationMessage('validation.IsNumber') })
  nextDate: Date;
  static factory(partial: Partial<NestDate>): NestDate {
    const tax = new NestDate();
    if (partial) {
      tax.id = partial.id;
      if (partial.nextDate) {
        tax.nextDate = new Date(partial.nextDate);
      }
    }
    return tax;
  }
}
export class UpdateTaxDto extends PartialType(CreateTaxDto) {
  @IsNotEmpty({ message: i18nValidationMessage('validation.IsNotEmpty') })
  @IsNumber({}, { message: i18nValidationMessage('validation.IsNumber') })
  @IsExistPrisma('tax', 'id', {
    message: i18nValidationMessage('validation.IsExist'),
  })
  id: number;
  static factory(partial: Partial<UpdateTaxDto>): UpdateTaxDto {
    const tax = new UpdateTaxDto();
    if (partial) {
      tax.id = partial.id;
      tax.title = partial.title;
      tax.describe = partial.describe;
      tax.delay = partial.delay;
      tax.penality = partial.penality;
      tax.rate = partial.rate;
      tax.rising = partial.rising;
    }
    return tax;
  }
}

export class ToogleTaxDto {
  @IsNotEmpty({ message: i18nValidationMessage('validation.IsNotEmpty') })
  @IsBoolean({ message: i18nValidationMessage('validation.IsBoolean') })
  isActif: boolean;
  @IsExistPrisma('id', 'id', {
    message: i18nValidationMessage('validation.IsExist'),
  })
  @IsNotEmpty({ message: i18nValidationMessage('validation.IsNotEmpty') })
  @IsNumber({}, { message: i18nValidationMessage('validation.IsNumber') })
  id: number;
  static factory(partial: Partial<ToogleTaxDto>): ToogleTaxDto {
    const tax = new ToogleTaxDto();
    if (partial) {
      tax.isActif = partial.isActif;
      tax.id = partial.id;
    }
    return tax;
  }
}

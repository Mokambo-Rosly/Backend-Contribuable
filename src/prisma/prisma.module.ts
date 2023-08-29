import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UniqueConstraintPrisma } from 'src/common/decorator/unique.decorator';
import { ValidatorRessource } from 'src/common/validator';
import { I18nModule } from 'nestjs-i18n';
import { ExistConstraintPrisma } from 'src/common/decorator/exist.decorator';
@Global()
@Module({
  providers: [PrismaService,UniqueConstraintPrisma,ExistConstraintPrisma,ValidatorRessource],
  exports:[PrismaService,UniqueConstraintPrisma,ExistConstraintPrisma,ValidatorRessource]
})
export class PrismaModule { }

import { Injectable } from '@nestjs/common';
import { Prisma, Tax } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
// export TaxFT = Prisma.
export type TaxFT = Prisma.TaxGetPayload<{
  include: { frequence: true; type: true };
}>;
@Injectable()
export class TaxService {
  constructor(private prisma: PrismaService) {}

  async create(inputCreate: Prisma.TaxCreateInput) {
    try {
      return await this.prisma.tax.create({
        data: inputCreate,
        include: { frequence: true, type: true },
      });
    } catch (e) {}
  }
  async findAll(param: {
    where: Prisma.TaxWhereInput;
    take?: number;
    skip?: number;
    orderBy?: Prisma.Enumerable<Prisma.TaxOrderByWithRelationInput>;
    cursor?: Prisma.TaxWhereUniqueInput;
  }) {
    const { where, take, skip, orderBy, cursor } = param;
    try {
      return await this.prisma.tax.findMany({
        include: { frequence: true, type: true },
        where,
        take,
        skip,
        orderBy,
        cursor,
      });
    } catch (e) {}
  }

  async findOne(where: Prisma.TaxWhereUniqueInput) {
    try {
      return await this.prisma.tax.findUnique({
        include: { frequence: true, type: true },
        where,
      });
    } catch (e) {}
  }

  async update(param: {
    where: Prisma.TaxWhereUniqueInput;
    data: Prisma.TaxUpdateInput;
  }) {
    const { where, data } = param;
    try {
      return await this.prisma.tax.update({
        include: { frequence: true, type: true },
        where,
        data,
      });
    } catch (e) {}
  }

  async remove(where: Prisma.TaxWhereUniqueInput) {
    try {
      return await this.prisma.tax.delete({ where });
    } catch (e) {}
  }
}

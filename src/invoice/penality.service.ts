import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class PenalityService {
  async create(inputCreate: Prisma.PenalityCreateInput) {
    try {
      return await axios.post(process.env.CRON_ENV, inputCreate);
    } catch (e) {}
  }
}

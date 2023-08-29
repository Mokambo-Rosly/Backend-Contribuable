import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class PenalityService {
  async create(inputCreate: Prisma.PenalityCreateInput) {
    try {
      return await axios.post('', inputCreate);
    } catch (e) {}
  }
}

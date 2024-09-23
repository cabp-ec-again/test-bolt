import { Prisma, PrismaClient } from '@prisma/client';

const PrismaCli = function (_options?: Prisma.PrismaClientOptions) {
  'use strict';

  let _instance: PrismaCli;

  class PrismaCli extends PrismaClient {
    constructor(options?: Prisma.PrismaClientOptions) {
      super(options);
    }

    static getInstance(): PrismaCli {
      if (!_instance) {
        _instance = new this(_options);
      }

      return _instance;
    }
  }

  return PrismaCli.getInstance();
};

export default PrismaCli;

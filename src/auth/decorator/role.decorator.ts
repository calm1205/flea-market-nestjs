import { SetMetadata } from '@nestjs/common';

/** 認可に必要なroleを受け取りmetaデータにkey,valueで格納 */
export const Role = (...statuses: string[]) =>
  SetMetadata('statuses', statuses);

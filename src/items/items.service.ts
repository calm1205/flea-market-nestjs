import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
  findAll() {
    return 'this is itemsService.';
  }
}

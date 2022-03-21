import { Injectable } from '@nestjs/common';
import { Item } from './item.model';

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  findAll() {
    return this.items;
  }

  create(item: Item): Item {
    this.items.push(item);
    return item;
  }
}

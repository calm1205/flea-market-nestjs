import { Item } from 'src/entities/item.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {}

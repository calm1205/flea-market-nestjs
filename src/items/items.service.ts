import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from '../entities/item.entity';
import { ItemRepository } from './item.repository';
import { ItemStatus } from './item-status.enum';
import { User } from '../entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async findById(id: string): Promise<Item> {
    const found = await this.itemRepository.findOne(id);
    if (!found) throw new NotFoundException();
    return found;
  }

  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    return await this.itemRepository.createItem(createItemDto, user);
  }

  async updateStatus(id: string, user: User): Promise<void> {
    const item = await this.itemRepository.findOne({ id });
    if (item.userId !== user.id)
      throw new BadRequestException('出品者でないと更新できません');

    await this.itemRepository.update(id, {
      status: ItemStatus.SOLD_OUT,
      updatedAt: new Date().toISOString(),
    });
  }

  async delete(id: string, user: User): Promise<void> {
    const item = await this.itemRepository.findOne({ id });

    if (item.userId !== user.id)
      throw new BadRequestException('出品者でないと削除できません');

    await this.itemRepository.delete({ id });
  }
}

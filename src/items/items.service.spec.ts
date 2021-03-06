import { Test } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { UserStatus } from '../auth/user-status.enum';
import { ItemRepository } from './item.repository';
import { ItemsService } from './items.service';
import { Item } from '../entities/item.entity';
import { ItemStatus } from './item-status.enum';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockItemRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  createItem: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

const mockUser1 = {
  id: '1',
  username: 'test1',
  password: '1234',
  status: UserStatus.PREMIUM,
} as User;

const mockUser2 = {
  id: '2',
  username: 'test1',
  password: '1234',
  status: UserStatus.FREE,
} as User;

describe('ItemsServiceTest', () => {
  let itemsService: ItemsService;
  let itemRepository;
  let mockItem: Item;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: ItemRepository,
          useFactory: mockItemRepository,
        },
      ],
    }).compile();

    itemsService = module.get<ItemsService>(ItemsService);
    itemRepository = module.get<ItemRepository>(ItemRepository);
    mockItem = {
      id: 'test-id',
      name: 'macBook',
      price: 3000,
      description: '',
      status: ItemStatus.ON_SALE,
      createdAt: '',
      updatedAt: '',
      userId: mockUser1.id,
      user: mockUser1,
    };
  });

  describe('findAll', () => {
    it('正常系', async () => {
      const expected = [];
      itemRepository.find.mockResolvedValue(expected);
      const result = await itemsService.findAll();

      expect(result).toEqual(expected);
    });
  });

  describe('findById', () => {
    it('正常系', async () => {
      const expected = mockItem;
      itemRepository.findOne.mockResolvedValue(expected);
      const result = await itemsService.findById('test-id');
      expect(result).toEqual(expected);
    });

    it('異常系', async () => {
      itemRepository.findOne.mockResolvedValue(null);
      await expect(itemsService.findById('notExistId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('正常系', async () => {
      const expected = mockItem;
      itemRepository.createItem.mockResolvedValue(expected);
      const result = await itemsService.create(
        { name: 'macBook', price: 3000, description: '' },
        mockUser1,
      );

      expect(result).toEqual(expected);
    });
  });

  describe('updateStatus', () => {
    it('正常系', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem);
      await itemsService.updateStatus('test-id', mockUser2);
      expect(itemRepository.update).toHaveBeenCalled();
    });

    it('異常系: 自身の商品を購入', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem);
      await expect(
        itemsService.updateStatus('test-id', mockUser1),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete', () => {
    it('正常系', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem);
      await itemRepository.delete('test-id', mockUser1);
      expect(itemRepository.delete).toHaveBeenCalled();
    });

    it('異常系: 他人の商品を削除', async () => {
      itemRepository.findOne.mockResolvedValue(mockItem);
      await expect(itemsService.delete('test-id', mockUser2)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});

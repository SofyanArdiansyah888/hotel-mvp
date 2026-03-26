import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, PaginateQuery, type Paginated } from 'nestjs-paginate';
import { RoomType } from './room-type.entity';
import { CreateRoomTypeDto, UpdateRoomTypeDto } from './room-types.dto';

@Injectable()
export class RoomTypesService {
  constructor(
    @InjectRepository(RoomType)
    private repo: Repository<RoomType>,
  ) {}

  async findAll(query: PaginateQuery): Promise<Paginated<RoomType>> {
    return paginate(query, this.repo, {
      sortableColumns: ['id', 'name', 'createdAt'],
      searchableColumns: ['name'],
      filterableColumns: {
        isActive: true,
      },
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: string): Promise<RoomType> {
    return this.repo
      .createQueryBuilder('roomType')
      .where('roomType.id = :id', { id })
      .getOneOrFail();
  }

  async create(dto: CreateRoomTypeDto): Promise<RoomType> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateRoomTypeDto): Promise<RoomType> {
    const entity = await this.repo.preload({ id, ...dto });
    if (!entity) throw new NotFoundException('Room type not found');
    return this.repo.save(entity);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}

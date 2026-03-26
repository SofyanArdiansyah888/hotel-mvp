import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { RoomTypesService } from './room-types.service';
import { CreateRoomTypeDto, UpdateRoomTypeDto } from './room-types.dto';
import { Paginate, type PaginateQuery, type Paginated } from 'nestjs-paginate';
import { RoomType } from './room-type.entity';

@Controller('v1/room-types')
export class RoomTypesController {
  constructor(private readonly service: RoomTypesService) {}

  @Get()
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<RoomType>> {
    return this.service.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RoomType> {
    const roomType = await this.service.findOne(id);
    if (!roomType) throw new NotFoundException('Room type not found');
    return roomType;
  }

  @Post()
  async create(@Body() dto: CreateRoomTypeDto): Promise<RoomType> {
    try {
      return await this.service.create(dto);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Invalid payload';
      throw new BadRequestException(message);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRoomTypeDto,
  ): Promise<RoomType> {
    try {
      return await this.service.update(id, dto);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Invalid payload';
      throw new BadRequestException(message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const deleted = await this.service.remove(id);
    if (!deleted) throw new NotFoundException('Room type not found');
  }
}

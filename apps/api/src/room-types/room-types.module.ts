import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType } from './room-type.entity';
import { RoomTypesService } from './room-types.service';
import { RoomTypesController } from './room-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType])],
  providers: [RoomTypesService],
  controllers: [RoomTypesController],
})
export class RoomTypesModule {}

import {
  IsString,
  IsInt,
  IsOptional,
  IsBoolean,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateRoomTypeDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateRoomTypeDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

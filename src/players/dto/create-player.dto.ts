import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { Group } from '@prisma/client';

export class CreatePlayerDto {
  @IsString()
  uuid: string;

  @IsString()
  @IsEnum(Group)
  @IsOptional()
  group: Group;

  @IsDate()
  @IsOptional()
  groupExpiresAt: Date;

  @IsDate()
  @IsOptional()
  joinedAt: Date;

  @IsDate()
  @IsOptional()
  lastSeenAt: Date;
}

import { Injectable } from '@nestjs/common';
import { Player, Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/db/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    if (this.findOne(createPlayerDto.uuid)) {
      throw new Error('Player already exists');
    }

    return this.prisma.player.create({ data: { ...createPlayerDto } });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PlayerWhereUniqueInput;
    where?: Prisma.PlayerWhereInput;
    orderBy?: Prisma.PlayerOrderByWithRelationInput;
  }): Promise<Player[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.player.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(uuid: string): Promise<Player | null> {
    return this.prisma.player.findUnique({ where: { uuid } });
  }

  update(uuid: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    return this.prisma.player.update({
      where: { uuid },
      data: { ...updatePlayerDto },
    });
  }

  remove(uuid: string): Promise<Player> {
    return this.prisma.player.delete({ where: { uuid } });
  }
}

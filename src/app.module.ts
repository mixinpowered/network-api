import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [CommonModule, PlayersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

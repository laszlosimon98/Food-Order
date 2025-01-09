import { Module } from '@nestjs/common';
import { FavoriteFoodService } from './favorite-food.service';
import { FavoriteFoodController } from './favorite-food.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [FavoriteFoodController],
  providers: [FavoriteFoodService],
  imports: [PrismaModule],
})
export class FavoriteFoodModule {}

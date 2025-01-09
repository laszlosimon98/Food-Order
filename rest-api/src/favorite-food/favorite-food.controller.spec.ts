import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteFoodController } from './favorite-food.controller';
import { FavoriteFoodService } from './favorite-food.service';

describe('FavoriteFoodController', () => {
  let controller: FavoriteFoodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteFoodController],
      providers: [FavoriteFoodService],
    }).compile();

    controller = module.get<FavoriteFoodController>(FavoriteFoodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

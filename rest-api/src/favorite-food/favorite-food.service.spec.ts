import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteFoodService } from './favorite-food.service';

describe('FavoriteFoodService', () => {
  let service: FavoriteFoodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteFoodService],
    }).compile();

    service = module.get<FavoriteFoodService>(FavoriteFoodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

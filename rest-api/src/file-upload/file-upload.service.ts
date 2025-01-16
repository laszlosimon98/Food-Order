import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { FoodService } from 'src/food/food.service';

@Injectable()
export class FileUploadService {
  constructor(private readonly foodService: FoodService) {}

  async uploadImage(foodId: number, filename: string) {
    const food = await this.foodService.findOne(foodId);

    if (!food) {
      throw new NotFoundException('Az étel nem található!');
    }

    await this.deleteImage(food.imageUrl);
    await this.foodService.update(foodId, { imageUrl: filename });

    return {
      isSuccess: true,
    };
  }

  async deleteImage(image: string) {
    const _path = join(__dirname, '..', '..', '..', 'uploads', image);

    if (existsSync(_path)) {
      unlinkSync(_path);
    }
  }
}

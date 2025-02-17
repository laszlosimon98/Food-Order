import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { fileUploadOptions } from './file-upload.options';
import { FoodModule } from 'src/food/food.module';

@Module({
  providers: [FileUploadService],
  controllers: [FileUploadController],
  imports: [MulterModule.register(fileUploadOptions), FoodModule],
  exports: [FileUploadService],
})
export class FileUploadModule {}

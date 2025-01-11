import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/auth/jwt.guard';
import { RolesGuard } from './guards/roles/roles.guard';
import { CategoryModule } from './category/category.module';
import { FoodModule } from './food/food.module';
import { PromotionModule } from './promotion/promotion.module';
import { ReviewModule } from './review/review.module';
import { FavoriteFoodModule } from './favorite-food/favorite-food.module';
import { EventModule } from './event/event.module';
import { ScheduleModule } from '@nestjs/schedule';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    CategoryModule,
    FoodModule,
    PromotionModule,
    ReviewModule,
    FavoriteFoodModule,
    EventModule,
    OrderModule,
    OrderItemModule,
    FileUploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}

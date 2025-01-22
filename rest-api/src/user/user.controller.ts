import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { RoleEnum, UserRolesEnum } from 'src/enums/roles';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Request } from 'express';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';
import { NewPasswordDto } from 'src/auth/dto/newPassword.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @Roles(RoleEnum.Admin)
  @Get()
  async getUsers() {
    return await this.userService.getAllUsers();
  }

  @ApiBearerAuth()
  @Patch('userDetails')
  async updateUserDetails(
    @Body() updateUserDetailsDto: UpdateUserDetailsDto,
    @Req() req: Request,
  ) {
    return await this.userService.updateUserDetails(
      updateUserDetailsDto,
      req.user,
    );
  }

  @ApiBearerAuth()
  @Patch('changePassword')
  async changePassword(
    @Body() newPasswordDto: NewPasswordDto,
    @Req() req: Request,
  ) {
    return await this.userService.changePassword(newPasswordDto, req.user);
  }

  @ApiBearerAuth()
  @ApiQuery({
    name: 'role',
    description: 'User role',
    enum: UserRolesEnum,
    enumName: 'Role',
  })
  @Roles(RoleEnum.Admin)
  @Patch(':id')
  async updateUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Query('role') role: UserRolesEnum,
    @Req() req: Request,
  ) {
    return await this.userService.updateUserRole(id, role, req.user);
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.Admin)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return await this.userService.deleteUser(id, req.user);
  }
}

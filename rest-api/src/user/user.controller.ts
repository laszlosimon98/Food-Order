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
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Role, UserRoles } from 'src/enums/roles';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Request } from 'express';
import { UpdateUserDetailsDto } from './dto/update-user-details.dto';
import { NewPasswordDto } from 'src/auth/dto/newPassword.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get()
  async getUsers() {
    return await this.userService.getAllUsers();
  }

  @ApiBearerAuth()
  @Roles(Role.User)
  @Get('favoriteFood')
  async getFavoriteFoods(@Req() req: Request) {
    return await this.userService.getFavoriteFoods(req.user);
  }

  @ApiBearerAuth()
  @Roles(Role.User)
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
  @Roles(Role.User)
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
    enum: UserRoles,
    enumName: 'Role',
  })
  @Roles(Role.Admin)
  @Patch(':id')
  async updateUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Query('role') role: UserRoles,
    @Req() req: Request,
  ) {
    return await this.userService.updateUserRole(id, role, req.user);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return await this.userService.deleteUser(id, req.user);
  }
}

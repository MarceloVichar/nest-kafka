import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  all() {
    return this.usersService.all();
  }

  @Post()
  create(@Body() data: UserDto) {
    return this.usersService.create(data);
  }

  @MessagePattern('configs')
  complete(@Payload() message) {
    console.log(message);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { UserDto } from './user.dto';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    @Inject('USERS_SERVICE')
    private kafkaClient: ClientKafka,
  ) {}

  all() {
    return this.prismaService.user.findMany();
  }

  async create(data: UserDto) {
    const user = await this.prismaService.user.create({
      data,
    });
    await lastValueFrom(this.kafkaClient.emit('users', user));
    return user;
  }
}

//dto - data transfer object

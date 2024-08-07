import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { ConfigDto } from './config.dto';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ConfigsService {
  constructor(
    private prismaService: PrismaService,
    @Inject('CONFIGS_SERVICE')
    private kafkaClient: ClientKafka,
  ) {}

  all() {
    return this.prismaService.config.findMany();
  }

  async config(data: ConfigDto) {
    const config = await this.prismaService.config.create({
      data,
    });
    await lastValueFrom(this.kafkaClient.emit('configs', config));
    return config;
  }
}

import { Controller, Get } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('configs')
export class ConfigsController {
  constructor(private readonly configsService: ConfigsService) {}

  @Get()
  all() {
    return this.configsService.all();
  }

  @MessagePattern('users')
  async config(@Payload() message) {
    await this.configsService.config({
      user_id: message.id,
      enable_two_factor: false,
      has_pin: false,
    });
  }
}

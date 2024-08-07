import { NestFactory } from '@nestjs/core';
import { ConfigsModule } from './configs.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ConfigsModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:29092'],
      },
      consumer: {
        groupId: 'configs-consumer',
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();

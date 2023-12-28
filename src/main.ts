import { NestFactory } from '@nestjs/core';
import cors from 'cors';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import config from './config';
import { AppModule } from './modules/app.module';

const { settings } = config;

export const createApp = async (): Promise<NestFastifyApplication> => {

  return await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
};

async function bootstrap(): Promise<any> {
  const app = await createApp();

  app.use(cors());

  await app.listen(settings.apiPort, settings.apiHost);
}

bootstrap();
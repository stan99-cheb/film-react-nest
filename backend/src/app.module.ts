import { FilmsModule } from './films/films.module';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as path from 'node:path';

import { AppConfig } from './app.config.provider';
import { ConfigAppModule } from './config-app.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigAppModule],
      inject: ['CONFIG'],
      useFactory: (config: AppConfig) => ({
        uri: config.database.url,
      }),
    }),
    FilmsModule,
    OrderModule,
  ],
})
export class AppModule {}

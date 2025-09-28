import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configProvider } from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { Film, Schedule } from './films/entities';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    FilmsModule,
    OrderModule,
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_DRIVER as 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Film, Schedule],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}

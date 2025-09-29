import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>(
          'DATABASE_DRIVER',
          'postgres',
        ) as 'postgres',
        url: configService.get<string>(
          'DATABASE_URL',
          'postgres://user:password@localhost:5432/practicum',
        ),
        entities: [Film, Schedule],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}

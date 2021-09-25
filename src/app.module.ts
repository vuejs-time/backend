import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { RouterModule, Routes } from '@nestjs/core';
import { AdminModule } from './admin/admin/admin.module';
import { BlogModule } from './admin/blogs/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        autoLoadEntities: true,
        synchronize: true,
        database: configService.get('DB_NAME'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
      })
    }),
    BlogModule,
    AdminModule
  ],
})
export class AppModule { }

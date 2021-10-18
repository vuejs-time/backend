import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { RouterModule, Routes } from '@nestjs/core';
import { AdminModule } from './admin/admin/admin.module';
import { BlogModule } from './admin/blogs/blog.module';
import { CategoryModule } from './admin/categories/category.module';
import { CommentModule } from './admin/comments/comment.module';
import { ChapterModule } from './admin/chapters/chapter.module';
import { EpisodeModule } from './admin/episodes/episode.module';
import { CourseModule } from './admin/courses/course.module';

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
    AdminModule,
    CategoryModule,
    CommentModule,
    ChapterModule,
    EpisodeModule,
    CourseModule
  ],
})
export class AppModule { }

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChapterController } from "./chapter.controller";
import { ChapterRepository } from "./chapter.repository";
import { ChapterService } from "./chapter.service";

@Module({
    imports: [TypeOrmModule.forFeature([ChapterRepository])],
    controllers: [ChapterController],
    providers: [ChapterService],
    exports: []
})
export class ChapterModule {}
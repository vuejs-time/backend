import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChapterRepository } from "../chapters/chapter.repository";
import { EpisodeController } from "./episode.controller";
import { EpisodeRepository } from "./episode.repository";
import { EpisodeService } from "./episode.service";

@Module({
    imports: [TypeOrmModule.forFeature([EpisodeRepository, ChapterRepository])],
    controllers: [EpisodeController],
    providers: [EpisodeService],
    exports: []
})
export class EpisodeModule { }
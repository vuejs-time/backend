import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { EpisodeCreateDTO } from "./dto/episode-create.dto";
import { EpisodeService } from "./episode.service";

@ApiTags("Episode-Of-Chapters")
@Controller("/episodes")
export class EpisodeController {
    constructor(
        private episodeService: EpisodeService
    ) { }
    @ApiOkResponse()
    @Get("/")
    async findAll() {
        const episodes = await this.episodeService.findAll()
        return {
            status: 200,
            success: true,
            episodes
        }
    }
    @ApiOkResponse()
    @Get("/:id")
    async findOne(@Param("id") id: number) {
        const episode = await this.episodeService.findOne(id)
        return {
            status: 200,
            success: true,
            episode
        }
    }
    @ApiCreatedResponse()
    @Post("/")
    async create(@Body() episodeCreateDto: EpisodeCreateDTO) {
        await this.episodeService.create(episodeCreateDto)
        return {
            status: 201,
            success: true,
            message: "ایجاد اپیزود با موفقیت انجام شد"
        }
    }
}
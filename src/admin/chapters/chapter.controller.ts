import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ChapterService } from "./chapter.service";
import { ChapterCreateDTO } from "./dto/chapter-create.dto";
@ApiTags("/chapters-of-Course")
@Controller('/chapter')
export class ChapterController {
    constructor(private chapterService: ChapterService) { }
    @ApiOkResponse()
    @Get("/")
    async getAllChapters() {
        const chapters = await this.chapterService.findAll()
        return {
            status: 200,
            success: true,
            chapters
        }
    }
    @ApiOkResponse()
    @Get("/subsets")
    async GetAllChapters() {
        return await this.chapterService.getAllChapterWithEpisodes()
    }
    @ApiOkResponse()
    @Get("/:id")
    async getByIdChapter(@Param("id") id: number) {
        const chapter = await this.chapterService.findOne(id)
        return {
            status: 200,
            success: true,
            chapter
        }
    }
    @ApiCreatedResponse()
    @Post("/")
    async createChapter(@Body() chapterCreateDto: ChapterCreateDTO) {
        await this.chapterService.create(chapterCreateDto)
        return {
            status: 201,
            success: true,
            message: "سرفصل شما با موفقیت ایجاد شد"
        }
    }

}
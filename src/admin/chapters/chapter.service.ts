import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChapterRepository } from "./chapter.repository";
import { ChapterCreateDTO } from "./dto/chapter-create.dto";
import { Chapter } from "./entity/chapter.entity";

@Injectable()
export class ChapterService {
    constructor(
        @InjectRepository(ChapterRepository) private chapterRepository: ChapterRepository
    ) { }
    async findAll(): Promise<Chapter[]> {
        return await this.chapterRepository.find({})
    }
    async findByID(id): Promise<Chapter> {
        const chapter = await this.chapterRepository.findOne({ id })
        if (!chapter) throw new NotFoundException("فصلی یافت نشد")
        return chapter
    }
    async findOne(id): Promise<Chapter> {
        return await this.findByID(id)
    }
    async create(chapterCreateDto: ChapterCreateDTO) {
        await this.chapterRepository.insert(chapterCreateDto).catch(error => {
            throw new InternalServerErrorException("فصل دوره ایجاد نشد")
        })
        return true
    }
    async getAllChapterWithEpisodes(){
        return await this.chapterRepository.getAllChapterWithEpisodes()
    }
}
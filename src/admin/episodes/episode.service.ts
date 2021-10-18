import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChapterRepository } from "../chapters/chapter.repository";
import { EpisodeCreateDTO } from "./dto/episode-create.dto";
import { Episode } from "./entity/episode.entity";
import { EpisodeRepository } from "./episode.repository";

@Injectable()
export class EpisodeService {
    constructor(
        @InjectRepository(EpisodeRepository) private episodeRepository: EpisodeRepository,
        @InjectRepository(ChapterRepository) private chapterRepository: ChapterRepository
    ) { }
    async findAll(): Promise<Episode[]> {
        return await this.episodeRepository.find();
    }
    async findById(id): Promise<Episode> {
        const episode = await this.episodeRepository.findOne({ id })
        if (!episode) throw new NotFoundException("اپیزودی یافت نشد")
        return episode
    }
    async findOne(id): Promise<Episode> {
        return await this.findById(id);
    }
    async create(episodeCreateDto: EpisodeCreateDTO) {
        const { chapter } = episodeCreateDto;
        if (chapter) {
            const record = this.chapterRepository.findOne({ id: chapter })
            if(!record) throw new NotFoundException("سرفصلی جهت ثبت اپیزود یافت نشدF")
        }
        await this.episodeRepository.insert(episodeCreateDto)
            .catch(err => { throw new InternalServerErrorException("ذخیره ی اپیزود جدید انجام نشد") })
        return true
        }
}
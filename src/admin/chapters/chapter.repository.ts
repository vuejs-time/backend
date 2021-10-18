import { EntityRepository, Repository } from "typeorm";
import { Chapter } from "./entity/chapter.entity";

@EntityRepository(Chapter)
export class ChapterRepository extends Repository<Chapter>{
    async getAllChapterWithEpisodes() {
        const chapters = await this.find({ relations: ["episodes"] })
        return chapters
    }
}
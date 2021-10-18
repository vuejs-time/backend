import { EntityRepository, Repository } from "typeorm";
import { Episode } from "./entity/episode.entity";

@EntityRepository(Episode)
export class EpisodeRepository extends Repository<Episode>{

}
import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Blog } from "./entity/blog.entity";

@EntityRepository(Blog)
export class BlogRepository extends Repository<Blog>{
    async findOneBlog(id): Promise<Blog> {
        const blog: Blog = await this.findOne({ id });
        if (!blog) throw new NotFoundException("مقاله ای یافت نشد")
        return blog
    }
}
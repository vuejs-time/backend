import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { unlink } from "fs";
import { Helpers } from "src/helpers/helper-methods";
import { BlogRepository } from "./blog.repository";
import { CreateBlogDTO } from "./dto/create-blog.dto";
import { UpdateBlogDTO } from "./dto/update-blog.dto";
import { Blog } from "./entity/blog.entity";

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(BlogRepository) private blogRepository: BlogRepository
    ) { }

    async findAll(): Promise<Blog[]> {
        const blogs = await this.blogRepository.find({relations : ["comments"]}).catch(err => {
            throw new InternalServerErrorException("خطای سروری : سرور قادر به گرفتن لیست بلاگ ها نمیباشد")
        })
        return blogs
    }
    async create(blogDto: CreateBlogDTO): Promise<Blog> {
        const result = await this.blogRepository.insert({ ...blogDto }).catch(err => {
            throw new HttpException("افزودن بلاگ انجام نشد مجددا سعی کنید", 400)
        })
        if (!result.raw.insertId) throw new HttpException("افزودن بلاگ انجام نشد مجددا سعی کنید", 400)
        return await this.findById(result.raw.insertId)
    }
    async findById(id: number) {
        const blog = await this.blogRepository.findOne({ id }).catch(err => {
            throw new NotFoundException("مقاله ای یافت نشد")
        })
        if (!blog) throw new NotFoundException("مقاله ای یافت نشد")
        return blog
    }

    async deleteById(id: number) {
        const blog = await this.findById(id);
        const result = await this.blogRepository.remove(blog);
        unlink(process.cwd() + result.image, (err => { }))
        return result
    }

    async update(id: number, blogDto: UpdateBlogDTO) {
        let image = null
        const blog = await this.findById(id)
        if (blogDto.image) {
            image = blog.image
        }
        const result = await this.blogRepository.update({ id }, { ...blogDto })
            .then(doc => {
                if (blogDto.image) {
                    unlink(process.cwd() + image, (err => { }))
                }
                return doc
            })
            .catch(err => {
                throw new HttpException("ویرایش مقاله انجام نشد مجددا تلاش کنید", 500)
            })
        if (!result.affected) throw new HttpException("به روز رسانی مقاله انجام نشد مجددا تلاش کنید", 500)
        return await this.findById(id)
    }
}
import { BadRequestException, HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getManager } from "typeorm";
import { BlogRepository } from "../blogs/blog.repository";
import { Blog } from "../blogs/entity/blog.entity";
import { CommentRepository } from "./comment.repository";
import { CreateCommentDTO } from "./dto/create-comment.dto";
import { Comment } from "./entity/comment.entity";

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentRepository) private commentRepository: CommentRepository,
        @InjectRepository(BlogRepository) private blogRepository: BlogRepository
    ) { }
    async insert(commentDto: CreateCommentDTO) {
        let parent: any;
        let blog: any;
        if (!(commentDto.blog)) {
            throw new BadRequestException("ثبت نظر انجام نشد لطفا نظر را در زیر بلاگ یا دوره مورد نظر ثبت کنید")
        } else {
            blog = await this.blogRepository.findOne(commentDto.blog)
            if (!blog) throw new NotFoundException("مقاله ای جهت ثبت نظر یافت نشد")
        }
        if (commentDto.parent) {
            parent = await this.findOne(commentDto.parent)
        }
        const result = await this.commentRepository.insert({ text: commentDto.text, parent, blog }).catch(error => {
            throw new HttpException("نظر ثبت نشد مجددا تلاش کنید", 400)
        })
        if (!result.raw.insertId) throw new HttpException("نظر ثبت نشد مجددا تلاش کنید", 400)
        return await this.findOne(result.raw.insertId)
    }
    async findOne(id) {
        const comment = await this.commentRepository.findOne({ id });
        if (!comment) throw new NotFoundException("نظری یافت نشد")
        return comment;
    }
    async findAll() {
        const manager = getManager()
        const comments = await manager.getTreeRepository(Comment).findTrees()
        return comments;
    }
    async findBlogComments(blogId) {
        const blog: Blog = await this.blogRepository.findOneBlog(blogId);
        if (!blog) throw new NotFoundException("مقاله ای یافت نشد")
        const manager = getManager()
        const comments = await manager.getTreeRepository(Comment).findTrees({relations : ["blog"]})
        return comments;
    }
}
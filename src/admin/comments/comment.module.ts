import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogRepository } from "../blogs/blog.repository";
import { CommentController } from "./comment.controller";
import { CommentRepository } from "./comment.repository";
import { CommentService } from "./comment.service";

@Module({
    imports : [TypeOrmModule.forFeature([CommentRepository, BlogRepository])],
    controllers : [CommentController],
    providers : [CommentService],
    exports : []
})
export class CommentModule{}
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommentService } from "./comment.service";
import { CreateCommentDTO } from "./dto/create-comment.dto";
import { FindCommentOfBlogDTO } from "./dto/find-comment-blogs.dto.ts";

@ApiTags('Comments')
@Controller("/comments")
export class CommentController {
    constructor(
        private commentService: CommentService
    ) { }
    @ApiCreatedResponse()
    @Post("/")
    async createComment(@Body() commentDto: CreateCommentDTO) {
        const comment = await this.commentService.insert(commentDto)
        return {
            status: 201,
            success: "true",
            message: "ثبت نظر با موفقیت انجام شد",
            comment
        }
    }
    @ApiOkResponse()
    @Get("/")
    async getAllComments() {
        const comments = await this.commentService.findAll()
        return {
            status: 200,
            success: true,
            comments
        }
    }
    @ApiOkResponse()
    @Get("/blog/:blogID")
    async getAllCommentsOfBlog(@Param('blogID') id : number) {
        const comments = await this.commentService.findBlogComments(id)
        return {
            status: 200,
            success: true,
            comments
        }
    }
}
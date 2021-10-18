import { Body, Controller, Delete, Get, HttpException, InternalServerErrorException, NotFoundException, Param, Patch, Post, Res, UploadedFile } from "@nestjs/common";
import { ApiAcceptedResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { existsSync } from "fs";
import { ApiFile } from "src/helpers/api-file.decorator";
import { Helpers } from "src/helpers/helper-methods";
import { BlogService } from "./blog.service";
import { CreateBlogDTO } from "./dto/create-blog.dto";
import { UpdateBlogDTO } from "./dto/update-blog.dto";
import { Blog } from "./entity/blog.entity";

@ApiTags("blogs")
@Controller('blogs')
export class BlogController {
    constructor(private blogService: BlogService) { }
    @ApiOkResponse()
    @Get("/")
    async getAllBlogs() {
        const blogs = await this.blogService.findAll()
        return {
            status: 200,
            success: true,
            blogs
        }
    }
    @ApiCreatedResponse({ type: Blog })
    @ApiBody({ type: CreateBlogDTO })
    @Post("/")
    @ApiFile("image", "images")
    async createBlog(@UploadedFile() file: Express.Multer.File, @Body() blogDto: CreateBlogDTO) {
        const image = `${file.destination}/${file.filename}`.substring(1);
        blogDto.image = image;
        const blog = await this.blogService.create(blogDto).catch(err => {
            throw new InternalServerErrorException("سرور قادر به ایجاد بلاگ جدید نمیباشد لطفا درخواست خود را با دقت بیشتر ارسال کنید")
        })
        return {
            status: 201,
            success: true,
            message: "افزودن مقاله با موفقیت انجام شد",
            blog
        }
    }
    @ApiResponse({})
    @ApiParam({ name: 'blogId' })
    @Get('/:blogId')
    async sendFile(@Res() res: Response, @Param('blogId') blogId: number) {
        const blog = await this.blogService.findById(blogId)
        try {
            if (!existsSync(process.cwd() + blog.image)) throw new NotFoundException("فایلی یافت نشد")
            res.sendFile(process.cwd() + blog.image)
        } catch (error) {
            throw new NotFoundException("فایلی یافت نشد")
        }
    }

    @ApiAcceptedResponse()
    @ApiParam({ name: "blogId" })
    @Delete("/:blogId")
    async deleteBlog(@Param('blogId') blogId) {
        const blog = await this.blogService.deleteById(blogId);
        return {
            status: 202,
            success: true,
            message: "حذف مقاله با موفقیت انجام شد",
            blog
        }
    }
    @ApiOkResponse()
    @ApiParam({ name: "blogId" })
    @ApiFile('image', "images")
    @Patch("/:blogId")
    async updateBlog(@Body() blogDto: UpdateBlogDTO, @Param('blogId') blogId, @UploadedFile() file: Express.Multer.File) {
        if (file?.originalname) {
            const image = `${file.destination}/${file.filename}`.substring(1);
            blogDto.image = image;
        }
        Helpers.removeEmptyFields(blogDto)
        const blog = await this.blogService.update(blogId, blogDto)
        return {
            status: 200,
            success: true,
            message: "به روز رسانی مقاله با موفقیت انجام شد",
            blog
        }
    }
}
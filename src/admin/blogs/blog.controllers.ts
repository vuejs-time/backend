import { Controller, Get } from "@nestjs/common";

@Controller('blogs')
export class BlogController{
    @Get("/")
    getAllBlogs(){
        return "All Blogs"
    }
}
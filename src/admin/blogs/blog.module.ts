import { Module } from "@nestjs/common";
import { BlogController } from "./blog.controllers";
import { BlogService } from "./blog.service";

@Module({
    imports : [],
    providers : [BlogService],
    controllers : [BlogController],
    exports : []
})
export class BlogModule{
    
}
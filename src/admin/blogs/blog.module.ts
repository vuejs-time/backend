import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogController } from "./blog.controllers";
import { BlogRepository } from "./blog.repository";
import { BlogService } from "./blog.service";

@Module({
    imports: [TypeOrmModule.forFeature([BlogRepository])],
    providers: [BlogService],
    controllers: [BlogController],
    exports: []
})
export class BlogModule {

}
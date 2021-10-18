import { Optional } from "@nestjs/common";
import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, Length } from "class-validator";

export class FindCommentOfBlogDTO {
    @IsNotEmpty({message : "شناسه ی مقاله نمیتواند خالی باشد"})
    @ApiProperty()
    blog: number
}
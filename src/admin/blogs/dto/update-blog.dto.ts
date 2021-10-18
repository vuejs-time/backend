import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator"
export class UpdateBlogDTO {
    @ApiProperty({ required: false })
    @Optional()
    @Optional()
    title?: string;
    @ApiProperty({ required: false })
    @Optional()
    metaDescription?: string;
    @ApiProperty({ required: false })
    @Optional()
    shortDescription?: string;
    @ApiProperty({ required: false })
    @Optional()
    description?: string;
    @ApiProperty({ required: false })
    @Optional()

    tags?: string[];
    @ApiProperty({ type: "string", format: "binary", required: false })
    @Optional()
    image?: string;
}
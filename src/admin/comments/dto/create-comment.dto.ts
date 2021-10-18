import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, Length } from "class-validator";

export class CreateCommentDTO {
    @ApiProperty()
    @IsNotEmpty()
    @Length(10, 255, { message: "متن کامنت باید بین 10 الی 255 نویسه باشد" })
    text: string;
    @ApiProperty()
    @Optional()
    @IsOptional()
    parent: number
    @ApiProperty()
    @Optional()
    @IsOptional()
    blog: number
}
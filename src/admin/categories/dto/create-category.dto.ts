import { Optional } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator"
import { Category } from "../entity/category.entity";
export class CreateCategoryDTO {
    @ApiProperty()
    @IsNotEmpty()
    title: string;
}
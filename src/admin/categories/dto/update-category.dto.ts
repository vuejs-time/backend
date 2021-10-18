import { Optional } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator"
export class UpdateCategoryDTO {
    @ApiProperty()
    @IsNotEmpty()
    @Optional()
    title: string;
}
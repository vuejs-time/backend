import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCourseDTO{
    @ApiProperty()
    @IsNotEmpty({message : "عنوان نمیتواند خالی باشد"})
    title : string;
    @ApiProperty()
    @IsNotEmpty({message : "توضیحات مختصر نمیتواند خالی باشد"})
    shortDescription : string;
    @ApiProperty()
    @IsNotEmpty({message : "توضیحات نمیتواند خالی باشد"})
    description : string;
    @ApiProperty({ type: "string", format: "binary" })
    @IsNotEmpty()
    image : string;
    @ApiProperty()
    @IsNotEmpty({message : "حداقل یک برچسب را وارد کنید"})
    tags : string[];
    
}
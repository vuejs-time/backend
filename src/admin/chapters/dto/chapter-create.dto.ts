import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ChapterCreateDTO{
    @ApiProperty()
    @IsNotEmpty({message : "عنوان فصل نمیتواند خالی باشد"})
    title : string
    @ApiProperty()
    @IsNotEmpty({message : "لطفا یک دوره را انتخاب کنید"})
    course : any
}
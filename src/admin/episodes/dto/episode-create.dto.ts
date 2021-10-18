import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class EpisodeCreateDTO {
    @ApiProperty()
    @IsNotEmpty({ message: "شماره ی اپیزود نمیتواند خالی باشد" })
    @IsNumber({ allowNaN: false }, { message: "شماره ی اپیزود را از نوع عددی ارسال کنید" })
    number: number;
    @ApiProperty()
    @IsNotEmpty({ message: "عنوان اپیزود نمیتواند خالی ارسال شود" })
    title: string;
    @ApiProperty()
    @IsNotEmpty({ message: "توضیحات اپیزود نمیتواند خالی ارسال شود" })
    description: string;
    @ApiProperty()
    @IsNotEmpty({ message: "زمان اپیزود نمیتواند خالی ارسال شود" })
    time: string;
    @ApiProperty()
    @IsNotEmpty({ message: "شناسه ی سرفصل نمیتواند خالی ارسال شود" })
    chapter: any;
}
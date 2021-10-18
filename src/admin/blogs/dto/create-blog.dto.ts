import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsNotEmpty } from "class-validator";

export class CreateBlogDTO {
    @ApiProperty()
    @IsNotEmpty({ message: "عنوان نمیتواند خالی باشد" })
    @Length(4, 50, { message: "عنوان باید بین 4 الی 50 نویسه باشد" })
    title: string;
    @IsNotEmpty({ message: "توضیحات متا تگ نمیتواند خالی باشد" })
    @Length(20, 255, { message: "توضیحات متا تگ باید بین 20 الی 255 نویسه باشد" })
    @ApiProperty()
    metaDescription: string;
    @IsNotEmpty({ message: "توضیحات کوتاه نمیتواند خالی باشد" })
    @Length(20, 255, { message: "توضیحات کوتاه باید بین 20 الی 255 نویسه باشد" })
    @ApiProperty()
    shortDescription: string;
    @IsNotEmpty({ message: "توضیحات نمیتواند خالی باشد" })
    @ApiProperty()
    description: string;
    @IsNotEmpty({ message: "حداقل یک هشتگ را وارد کنید" })
    @ApiProperty()
    tags: string[];
    // @IsNotEmpty({ message: "لطفا یک تصویر را انتخاب کنید" })

    @ApiProperty({ type: "string", format: "binary" })
    image: string;
}
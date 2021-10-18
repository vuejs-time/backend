import { BadRequestException } from "@nestjs/common"

export function fileMieTypeFilter(...mimetypes: string[]) {
    return function (req,
        file: Express.Multer.File,
        done: (error: Error | null, acceptFile: boolean) => void) {
        if (mimetypes.some((ext) => file.mimetype.includes(ext))) {
            done(null, true)
        } else {
            done(new BadRequestException("فرمت ارسال شده ی تصویر صحیح نمیباشد"), false)
        }
    }
}
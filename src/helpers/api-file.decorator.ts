import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { Request } from "express";
import {parse} from "path";
import { diskStorage } from "multer"
import { fileMieTypeFilter } from "./file-mimeType-filter";
function getPath(folder = "images") {
    const date = new Date()
    const Year = date.getFullYear()
    const Month = date.getMonth()
    const Day = date.getDate()
    return `./uploads/${folder}/${Year}/${Month}/${Day}`
}
export function ApiFile(fieldName = "image", folder) {
    const directory = getPath(folder);
    return applyDecorators(
        UseInterceptors(FileInterceptor(fieldName,
            {
                dest : directory,
                storage: diskStorage({
                    destination: directory,
                    filename: (req, file, cb) => {
                        const filename: string = parse(file.originalname).name.replace(/[\s\[\]\*\+\$\#\@\!\^\&-_=\'\"\s]/g, '') + Date.now()
                        const ext: string = parse(file.originalname).ext;
                        const name = `${filename}${ext}`
                        cb(null, name);
                    }
                }),
                fileFilter : fileMieTypeFilter(fieldName)
            })),
        ApiConsumes('multipart/form-data')
    )
}
import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CourseService } from "./course.service";

@ApiTags("Courses")
@Controller("/courses")
export class CourseController {
    constructor(
        private courseService: CourseService
    ) { }
    @ApiOkResponse()
    @Get("/")
    async findAllCourses() {
        const courses = await this.courseService.findAll()
        return {
            status: 200,
            success: true,
            courses
        }
    }
    @ApiOkResponse()
    @Get("/:id")
    async findOneCourse(@Param("id") id: number) {
        const course = await this.courseService.findOne(id)
        return {
            status: 200,
            success: true,
            course
        }
    }
}
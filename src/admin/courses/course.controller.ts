import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CourseService } from "./course.service";
import { CreateCourseDTO } from "./dto/create-course.dto";

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
    @ApiCreatedResponse()
    @Post("/")
    async createCourse(@Body() createCourseDto : CreateCourseDTO) {
        await this.courseService.create(createCourseDto)
        return {
            status: 201,
            success: true,
            message : "ایجاد دوره با موفقیت انجام شد"
        }
    }
}
import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseRepository } from "./course.repository";
import { CreateCourseDTO } from "./dto/create-course.dto";

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(CourseRepository) private courseRepository: CourseRepository
    ) { }
    async findAll() {
        const courses = await this.courseRepository.find({relations : ['chapters', "chapters.episodes"]});
        return courses
    }
    async findById(id: number) {
        const course = await this.courseRepository.findOne({ id })
        if (!course) throw new NotFoundException("دوره ای یافت نشد")
        return course
    }
    async findOne(id: number) {
        const course = await this.findById(id)
        return course
    }
    async create(createCourseDto: CreateCourseDTO) {
        const course = await this.courseRepository.insert(createCourseDto)
        .catch(err => {
            throw new InternalServerErrorException("ایجاد دوره انجام نشد لطفا دوباره سعی کنید")
        })
        return true
    }
}
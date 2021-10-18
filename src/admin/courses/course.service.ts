import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseRepository } from "./course.repository";

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(CourseRepository) private courseRepository: CourseRepository
    ) { }
    async findAll() {
        const courses = await this.courseRepository.find({});
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
}
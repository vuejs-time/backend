import { EntityRepository, Repository } from "typeorm";
import { Course } from "./entity/course.entity";

@EntityRepository(Course)
export class CourseRepository extends Repository<Course>{}
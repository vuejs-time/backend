import { Course } from "src/admin/courses/entity/course.entity";
import { Episode } from "src/admin/episodes/entity/episode.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('chapters')
export class Chapter {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @OneToMany(() => Episode, episode => episode.chapter)
    episodes: Episode[]
    @ManyToOne(() => Course, course => course.chapters)
    @JoinColumn()
    course: Course
}
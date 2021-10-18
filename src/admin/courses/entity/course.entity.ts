import { Chapter } from "src/admin/chapters/entity/chapter.entity";
import { Comment } from "src/admin/comments/entity/comment.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
@Entity("courses")
export class Course {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: "tinytext", nullable: false })
    title: string;
    @Column({ type: "tinytext", nullable: false })
    shortDescription: string;
    @Column({ type: "longtext", nullable: false })
    description: string;
    @Column({ nullable: false })
    image: string;
    @Column({ nullable: false, type: "simple-array" })
    tags: string[];
    @OneToMany(() => Comment, comment => comment.course)
    comments: Comment[]
    @OneToMany(() => Chapter, chapter => chapter.course)
    chapters: Chapter[]
    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;
    @UpdateDateColumn({ type: "timestamp", name: 'updated_at' })
    updatedAt: Date

}
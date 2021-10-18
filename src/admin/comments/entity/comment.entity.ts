import { Blog } from "src/admin/blogs/entity/blog.entity";
import { Course } from "src/admin/courses/entity/course.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, UpdateDateColumn } from "typeorm";

@Entity('comments')
@Tree("nested-set")
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'tinytext' })
    text: string
    @ManyToOne(() => Blog, blog => blog.id, { nullable: true })
    @JoinColumn()
    blog: Blog
    @ManyToOne(() => Course, course => course.id, { nullable: true })
    @JoinColumn()
    course: Course
    @TreeChildren()
    children: Comment[];
    @TreeParent()
    parent: Comment;
    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;
    @UpdateDateColumn({ type: "timestamp", name: 'updated_at' })
    updatedAt: Date
}
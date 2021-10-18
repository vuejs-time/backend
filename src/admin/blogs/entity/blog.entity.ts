import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('blogs')
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    title: string;
    @Column({ type: "tinytext", nullable: false })
    metaDescription: string;
    @Column({ type: "tinytext", nullable: false })
    shortDescription: string;
    @Column({ type: "longtext", nullable: false })
    description: string;
    @Column({ type: "simple-array", nullable: false })
    tags: string[];
    @Column({ nullable: false })
    image: string;
    @Column({ default: false, nullable: false })
    status: boolean;
    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;
    @UpdateDateColumn({ type: "timestamp", name: 'updated_at' })
    updatedAt: Date

}
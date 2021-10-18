import { Chapter } from "src/admin/chapters/entity/chapter.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("episodes")
export class Episode {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    time: string;
    @Column({ type: "text" })
    description: string;
    @Column({ type: "int" })
    number: number;
    @ManyToOne(() => Chapter, chapter => chapter.episodes )
    @JoinColumn()
    chapter : Chapter;

}
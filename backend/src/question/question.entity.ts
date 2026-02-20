import { Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Answer } from '../question-component/answer.component';
import { Option } from '../question-component/option.component';
import { Section } from '../section/section.entity';
import { v7 as UUIDv7 } from 'uuid';

@Entity()
export class Question {
    @PrimaryColumn("uuid")
    id: string = UUIDv7();

    @Column({nullable: true})
    description: string;

    @Column({type: "varchar", default: "multiple-choice"})
    questionType: string;

    @Column({type: "boolean", default: false})
    required: boolean;

    @Column({name : "section_id"})
    sectionId: string;

    @Column({type: "json", nullable: true})
    options: Option[];

    @Column({type: "json", nullable: true})
    answers: Answer[];

    @ManyToOne(() => Section, section => section.questions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "section_id" })
    section: Section;
}
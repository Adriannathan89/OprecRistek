import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Question } from '../question/question.entity';
import { Form } from 'src/form/form.entity';

@Entity()
export class Section {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column({nullable: true})
    description: string;

    @Column({name : "form_id"})
    formId: string;

    @ManyToOne(() => Form, form => form.sections, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "form_id" })
    form: Form;

    @OneToMany(() => Question, question => question.section, { cascade: true })
    questions: Question[];
}
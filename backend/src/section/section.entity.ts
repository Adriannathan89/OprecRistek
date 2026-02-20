import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Question } from '../question/question.entity';
import { Form } from 'src/form/form.entity';
import { User } from 'src/user/user.entity';
import { UserAnswer } from 'src/user-answer/user-answer.entity';

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

    @Column({name: "user_id"})
    userId: string;

    @ManyToOne(() => Form, form => form.sections, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "form_id" })
    form: Form;

    @ManyToOne(() => User, user => user.sections, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "user_id" })
    user: User;

    @OneToMany(() => Question, question => question.section, { cascade: true })
    questions: Question[];

    @OneToMany(() => UserAnswer, userAnswer => userAnswer.section, { cascade: true })
    userAnswers: UserAnswer[];
}
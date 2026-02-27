import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { UserTakingForm } from 'src/user-taking-form/user-taking-form.entity';
import { Section } from 'src/section/section.entity';
import { Question } from 'src/question/question.entity';

@Entity()
export class UserAnswer {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    sectionId: string;

    @Column()
    questionId: string;

    @Column({type: "json", nullable: true})
    userAnswer: string | string[] | number | boolean;

    @Column({name : "user_taking_form_id"})
    userTakingFormId: string;

    @ManyToOne(() => Section, section => section.userAnswers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "section_id" })
    section: Section;

    @ManyToOne(() => UserTakingForm, userTakingForm => userTakingForm.userAnswers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "user_taking_form_id" })
    userTakingForm: UserTakingForm;

    @OneToOne(() => Question, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "question_id" })
    question: Question;
}
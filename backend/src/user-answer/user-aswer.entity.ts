import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserTakingForm } from 'src/user-taking-form/user-taking-form.entity';

@Entity()
export class UserAnswer {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    sectionId: string;

    @Column()
    questionId: string;

    @Column({type: "json", nullable: true})
    userAnswer: string;

    @Column({name : "user_taking_form_id"})
    userTakingFormId: string;

    @ManyToOne(() => UserTakingForm, userTakingForm => userTakingForm.userAnswers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "user_taking_form_id" })
    userTakingForm: UserTakingForm;
}
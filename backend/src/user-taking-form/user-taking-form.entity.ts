import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, Unique } from 'typeorm';
import { User } from '../user/user.entity';
import { Form } from '../form/form.entity';
import { UserAnswer } from 'src/user-answer/user-answer.entity';
import { FormResponse } from 'src/form-response/form-response.entity';

@Unique(["userId", "formId"])
@Entity()
export class UserTakingForm {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name : "user_id"})
    userId: string;

    @Column({name : "form_id"})
    formId: string;

    @OneToMany(() => UserAnswer, userAnswer => userAnswer.userTakingForm, { cascade: true })
    userAnswers: UserAnswer[];

    @ManyToOne(() => User, user => user.userTakingForms, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Form, form => form.userTakingForms, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "form_id" })
    form: Form;

    @OneToMany(() => FormResponse, formResponse => formResponse.userTakingForm)
    formResponses: FormResponse[];
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Form } from '../form/form.entity';
import { UserAnswer } from 'src/user-answer/user-aswer.entity';

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
}
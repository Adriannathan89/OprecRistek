import { Form } from "src/form/form.entity";
import { UserTakingForm } from "src/user-taking-form/user-taking-form.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FormResponse {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name: "form_id"})
    formId: string;
    
    @Column({name: "user_id"})
    userId: string;

    @Column({name: "user_taking_form_id"})
    userTakingFormId: string;

    @Column()
    score: number;

    @Column()
    fullScore: number;

    @ManyToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn({name: "user_id"})
    user: User;

    @ManyToOne(() => Form, {onDelete: 'CASCADE'})
    @JoinColumn({name: "form_id"})
    form: Form;

    @ManyToOne(() => UserTakingForm, {onDelete: 'CASCADE'})
    @JoinColumn({name: "user_taking_form_id"})
    userTakingForm: UserTakingForm;
}
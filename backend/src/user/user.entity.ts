import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Form } from "../form/form.entity";
import { UserTakingForm } from "src/user-taking-form/user-taking-form.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Form, form => form.createdBy, { cascade: true })
    forms: Form[];

    @OneToMany(() => UserTakingForm, userTakingForm => userTakingForm.user, { cascade: true })
    userTakingForms: UserTakingForm[];
}
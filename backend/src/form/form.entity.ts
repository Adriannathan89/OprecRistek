import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Section } from '../section/section.entity';
import { User } from 'src/user/user.entity';
import { UserTakingForm } from 'src/user-taking-form/user-taking-form.entity';

@Entity()
export class Form {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "text", nullable: true})
    title: string;

    @Column({type: "text", nullable: true})
    description: string;

    @Column({type: "boolean", default: false})
    isQuiz: boolean;

    @Column({type: "boolean", default: false})
    isPublished: boolean;

    @Column({type: "boolean", default: false})
    isAnswered: boolean;

    @Column({name : "created_by_id"})
    createdById: string;

    @ManyToOne(() => User, user => user.forms, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "created_by_id" })
    createdBy: User;

    @OneToMany(() => UserTakingForm, userTakingForm => userTakingForm.form, { cascade: true })
    userTakingForms: UserTakingForm[];  

    @OneToMany(() => Section, section => section.form, { cascade: true })
    sections: Section[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
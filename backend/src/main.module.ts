import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { FormModule } from './form/form.module';
import { AuthModule } from './auth-guard/auth.module';
import { UserModule } from './user/user.module';
import { SectionModule } from './section/section.module';
import { UserTakingFormModule } from './user-taking-form/user-taking-form.module';
import { UserAnswerModule } from './user-answer/user-answer.module';
import { QuestionModule } from './question/question.module';
import { ConfigModule } from '@nestjs/config';
import { FormResponseModule } from './form-response/form-response.module';

dotenv.config();

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            synchronize: true,
        }),
        FormModule,
        AuthModule,
        UserModule,
        UserTakingFormModule,
        SectionModule,
        UserAnswerModule,
        QuestionModule,
        FormResponseModule,
    ],
})
export class MainModule {}
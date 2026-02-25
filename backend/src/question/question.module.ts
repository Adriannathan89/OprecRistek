import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "./question.entity";
import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";
import { QuestionManagerService } from "./question-manager.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Question])
    ],
    controllers: [QuestionController],
    providers: [QuestionService, QuestionManagerService],
    exports: [QuestionService, QuestionManagerService]
})
export class QuestionModule {}
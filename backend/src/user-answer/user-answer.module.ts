import { Module } from "@nestjs/common";
import { UserAnswerController } from "./user-answer.controller";
import { UserAnswerService } from "./user-answer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserAnswer } from "./user-answer.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserAnswer])
    ],
    controllers: [UserAnswerController],
    providers: [UserAnswerService],
    exports: [UserAnswerService]
})
export class UserAnswerModule {}
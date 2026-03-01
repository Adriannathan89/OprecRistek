import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserAnswer } from "./user-answer.entity";
import { UserAnswerDto } from "./user-answer.dto";
import { ApiResponse } from "src/apiResponse/api.response";


@Injectable()
export class UserAnswerService {
    constructor(
        @InjectRepository(UserAnswer) private readonly userAnswerRepository: Repository<UserAnswer>,
    ) { }

    async updateUserAnswer(id: string, userAnswerDto: UserAnswerDto) {
        try {
            const userAnswer = await this.userAnswerRepository.findOne({ where: { id } });
            if (!userAnswer) {
                const apiResponse = new ApiResponse<UserAnswer>(false, 404, "User answer not found");
                return apiResponse;
            }
            if (userAnswerDto.userAnswer === undefined) {
                const apiResponse = new ApiResponse<UserAnswer>(false, 400, "User answer is required");
                return apiResponse;
            }

            userAnswer.userAnswer = userAnswerDto.userAnswer;
            userAnswer.answerId = userAnswerDto.answerId;

            const updatedUserAnswer = await this.userAnswerRepository.save(userAnswer);

            const apiResponse = new ApiResponse<UserAnswer>(true, 200, "User answer updated successfully", updatedUserAnswer);
            return apiResponse;
        } catch (error) {
            const apiResponse = new ApiResponse<UserAnswer>(false, 500, "Failed to update user answer");
            return apiResponse;
        }
    }
}
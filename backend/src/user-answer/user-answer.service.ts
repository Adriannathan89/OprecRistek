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
                const apiRespose = new ApiResponse<UserAnswer>(false, 404, "User answer not found");
                return apiRespose;
            }
            if (userAnswerDto.userAnswer === undefined) {
                const apiRespose = new ApiResponse<UserAnswer>(false, 400, "User answer is required");
                return apiRespose;
            }

            userAnswer.userAnswer = userAnswerDto.userAnswer;
            const updatedUserAnswer = await this.userAnswerRepository.save(userAnswer);

            const apiRespose = new ApiResponse<UserAnswer>(true, 200, "User answer updated successfully", updatedUserAnswer);
            return apiRespose;
        } catch (error) {
            const apiRespose = new ApiResponse<UserAnswer>(false, 500, "Failed to update user answer");
            return apiRespose;
        }
    }
}
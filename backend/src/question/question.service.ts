import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { QuestionDto } from './question.dto';
import { Section } from 'src/section/section.entity';
import { ApiResponse } from 'src/apiResponse/api.response';


@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question) private readonly questionRepository: Repository<Question>,
    ) { }

    async createQuestion(questionDto: QuestionDto) {
        try {
            const questionData = new Question();
            Object.assign(questionData, questionDto);
            const question = await this.questionRepository.save(questionData);

            return new ApiResponse<Question>(true, 201, "Question created successfully");

        } catch (error) {
            const apiResponse = new ApiResponse<Question>(false, 500, "Failed to create question");
            return apiResponse;
        }
    }

    async updateQuestion(id: string, questionDto: QuestionDto) {
        try {
            const question = await this.questionRepository.findOne({ where: { id } });
            if (!question) {
                const apiResponse = new ApiResponse<Question>(false, 404, "Question not found");
                return apiResponse;
            }
            Object.assign(question, questionDto);
            const updatedQuestion = await this.questionRepository.save(question);
            return new ApiResponse<Question>(true, 200, "Question updated successfully", updatedQuestion);
        } catch (error) {
            const apiResponse = new ApiResponse<Question>(false, 500, "Failed to update question");
            return apiResponse;
        }
    }

    async deleteQuestion(id: string) {
        const deleteResult = await this.questionRepository.delete(id);
        if (deleteResult.affected === 0) {
            const apiResponse = new ApiResponse<Question>(false, 404, "Question not found");
            return apiResponse;
        }
        const apiResponse = new ApiResponse<Question>(true, 200, "Question deleted successfully");
        return apiResponse;
    }

    async getQuestionBySectionId(sectionId: string) {
        const questions = await this.questionRepository.find({ where: { sectionId } }); 
        if (!questions || questions.length === 0) {
            const apiResponse = new ApiResponse<Question[]>(false, 404, "No questions found for this section");
            return apiResponse;
        }
        const apiResponse = new ApiResponse<Question[]>(true, 200, "Questions retrieved successfully", questions);
        return apiResponse;
    }
}

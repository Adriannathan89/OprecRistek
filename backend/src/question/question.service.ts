import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { QuestionDto } from './question.dto';
import { Section } from 'src/section/section.entity';
import { ApiResponse } from 'src/apiResponse/api.response';
import { Form } from 'src/form/form.entity';


@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question) private readonly questionRepository: Repository<Question>,
    ) {}

    validateSectionOwnership(sectionId: string, userId: string): Promise<boolean> {
        return this.questionRepository.manager
            .createQueryBuilder(Section, "section")
            .andWhere("section.id = :sectionId", { sectionId })
            .andWhere("section.userId = :userId", { userId })
            .getCount()
            .then(count => count > 0);
    }

    async createQuestion(questionDto: QuestionDto, user: any) {
        try {
            if(!await this.validateSectionOwnership(questionDto.sectionId, user.sub)) {
                const apiResponse = new ApiResponse<Question>(false, 403, "You do not have permission to create a question in this section");
                return apiResponse;
            }

            const questionData = new Question();
            Object.assign(questionData, questionDto);
            const question = await this.questionRepository.save(questionData);

            return new ApiResponse<Question>(true, 201, "Question created successfully", question);

        } catch (error) {
            console.log(error);
            const apiResponse = new ApiResponse<Question>(false, 500, "Failed to create question");
            return apiResponse;
        }
    }

    async updateQuestion(id: string, questionDto: QuestionDto, user: any) {
        try {
            const question = await this.questionRepository.findOne({ where: { id } });
            if (!question) {
                const apiResponse = new ApiResponse<Question>(false, 404, "Question not found");
                return apiResponse;
            }

            if(!await this.validateSectionOwnership(question.sectionId, user.sub)) {
                const apiResponse = new ApiResponse<Question>(false, 403, "You do not have permission to update this question");
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

    async deleteQuestion(id: string, user: any) {
        const question = await this.questionRepository.findOne({ where: { id } });
        if (!question) {
            const apiResponse = new ApiResponse<Question>(false, 404, "Question not found");
            return apiResponse;
        }     
        if(!await this.validateSectionOwnership(question.sectionId, user.sub)) {
            const apiResponse = new ApiResponse<Question>(false, 403, "You do not have permission to delete this question");
            return apiResponse;
        }

        const deleteResult = await this.questionRepository.delete(id);
        const apiResponse = new ApiResponse<Question>(true, 200, "Question deleted successfully");
        return apiResponse;
    }
}

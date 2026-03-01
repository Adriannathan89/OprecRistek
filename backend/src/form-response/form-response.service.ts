import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Form } from "src/form/form.entity";
import { FormResponse } from "./form-response.entity";
import { QueryBuilder, Repository } from "typeorm";
import { FormResponseDto } from "./form-response.dto";
import { ApiResponse } from "src/apiResponse/api.response";
import { ServerErrorResponse } from "src/apiResponse/errorResponse/serverError.response";
import { NotFoundResponse } from "src/apiResponse/errorResponse/notFound.response";
import { Section } from "src/section/section.entity";
import { UserAnswer } from "src/user-answer/user-answer.entity";

@Injectable()
export class FormResponseService {
    constructor(
        @InjectRepository(FormResponse) private readonly formResponseRepository: Repository<FormResponse>,
    ) { }
    private async getAllQuestionByFormId(formId: string) {
        const sections = await this.formResponseRepository.manager
            .createQueryBuilder(Section, "section")
            .innerJoinAndSelect("section.questions", "questions")
            .where("section.formId = :formId", { formId })
            .getMany();

        const allQuestions = sections.flatMap(section => section.questions.flatMap(question => question));

        return allQuestions;
    }

    private async getAllUserAnswersByUserTakingFormId(userTakingFormId: string) {
        const userAnswers = await this.formResponseRepository.manager
            .createQueryBuilder(UserAnswer, "userAnswer")
            .innerJoinAndSelect("userAnswer.userTakingForm", "userTakingForm")
            .where("userTakingForm.id = :userTakingFormId", { userTakingFormId })
            .getMany();

        return userAnswers;
    }

    private async gradeFormResponse(userTakingFormId: string, formId: string) {
        const allQuestions = await this.getAllQuestionByFormId(formId);
        const allUserAnswers = await this.getAllUserAnswersByUserTakingFormId(userTakingFormId);

        let totalScore = 0;

        for (const userAnswer of allUserAnswers) {
            const question = allQuestions.find(q => q.id === userAnswer.questionId);
            if (question?.answers) {
                const correctAnswer = [...question.answers.filter(a => a.isActive)].map(a => a.id);
                if (Array.isArray(userAnswer.answerId)) {
                    if (userAnswer.answerId.every(a => correctAnswer.includes(a))) {
                        totalScore += 1;
                    }
                } else {
                    if (correctAnswer.includes(userAnswer.answerId)) {
                        totalScore += 1;
                    }
                }
            }
        }
        return { totalScore, fullScore: allQuestions.length };
    }

    async submitForm(dto: FormResponseDto, user: any) {
        try {
            const formResponse = new FormResponse();
            const { totalScore, fullScore } = await this.gradeFormResponse(dto.userTakingFormId, dto.formId);
            const form = await this.formResponseRepository.manager.findOne(Form, { where: { id: dto.formId } });

            if (!form) {
                throw new NotFoundResponse("Form not found");
            }

            form.isAnswered = true;
            formResponse.formId = dto.formId;
            formResponse.userTakingFormId = dto.userTakingFormId;
            formResponse.userId = user.sub;
            formResponse.score = totalScore;
            formResponse.fullScore = fullScore;

            await this.formResponseRepository.manager.save(form);
            await this.formResponseRepository.save(formResponse);

            const formResponseWithScore = await this.formResponseRepository
                .createQueryBuilder("formResponse")
                .leftJoinAndSelect("formResponse.form", "form")
                .leftJoinAndSelect("formResponse.userTakingForm", "userTakingForm")
                .leftJoinAndSelect("userTakingForm.userAnswers", "userAnswers")
                .leftJoinAndSelect("userAnswers.question", "question")
                .where("formResponse.id = :id", { id: formResponse.id })
                .orderBy("question.position", "ASC")
                .getOne();

            if (!formResponseWithScore) {
                throw new NotFoundResponse("Form response not found after submission");
            }

            const apiResponse = new ApiResponse<FormResponse>(true, 200, "Form submitted successfully", formResponseWithScore);
            return apiResponse;
        } catch (error) {
            console.log(error);
            throw new ServerErrorResponse("Failed to submit form response");
        }
    }


    async getFormResponseByUser(user: any) {
         const formResponse = await this.formResponseRepository
                .createQueryBuilder("formResponse")
                .leftJoinAndSelect("formResponse.form", "form")
                .leftJoinAndSelect("formResponse.userTakingForm", "userTakingForm")
                .leftJoinAndSelect("userTakingForm.userAnswers", "userAnswers")
                .leftJoinAndSelect("userAnswers.question", "question")
                .where("formResponse.userId = :id", { id: user.sub })
                .orderBy("question.position", "ASC")
                .getMany();


        if (!formResponse || formResponse.length === 0) {
            throw new NotFoundResponse("No response found for this user")
        }

        const apiResponse = new ApiResponse<FormResponse[]>(true, 200, "Form responses retrieved successfully", formResponse);
        return apiResponse;
    }
}  
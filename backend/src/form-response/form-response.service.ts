import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Form } from "src/form/form.entity";
import { FormResponse } from "./form-response.entity";
import { QueryBuilder, Repository } from "typeorm";

@Injectable()
export class FormResponseService {
    constructor(
        @InjectRepository(FormResponse) private readonly formResponseRepository: Repository<FormResponse>,
    ) {}
    private async getAllQuestionByFormId(formId: string) {
        const sections = await this.formResponseRepository.manager
            .createQueryBuilder(FormResponse, "formResponse")
            .innerJoinAndSelect("formResponse.userTakingForm", "userTakingForm")
            .innerJoinAndSelect("userTakingForm.form", "form")
            .innerJoinAndSelect("form.sections", "sections")
            .innerJoinAndSelect("sections.questions", "questions")
            .where("form.id = :formId", { formId })
            .getMany();

        const allQuestions = sections.flatMap(section => section.userTakingForm.form.sections.flatMap(s => s.questions));

        return allQuestions;
    }

    private async getAllUserAnswersByUserTakingFormId(userTakingFormId: string) {
        const userAnswers = await this.formResponseRepository.manager
            .createQueryBuilder(FormResponse, "formResponse")
            .innerJoinAndSelect("formResponse.userTakingForm", "userTakingForm")
            .innerJoinAndSelect("userTakingForm.userAnswers", "userAnswers")
            .where("userTakingForm.id = :userTakingFormId", { userTakingFormId })
            .getMany();
            
        const allUserAnswers = userAnswers.flatMap(fr => fr.userTakingForm.userAnswers);
        return allUserAnswers;
    }

    private async gradeFormResponse(userTakingFormId: string, formId: string) {
        const allQuestions = await this.getAllQuestionByFormId(formId);
        const allUserAnswers = await this.getAllUserAnswersByUserTakingFormId(userTakingFormId);
        let totalScore = 0;
    }
}
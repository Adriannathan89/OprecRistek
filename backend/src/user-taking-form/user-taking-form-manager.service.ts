import { Injectable } from "@nestjs/common";
import { UnAuthResponse } from "src/apiResponse/errorResponse/unAuth.response";
import { Question } from "src/question/question.entity";
import { UserAnswer } from "src/user-answer/user-answer.entity";
import { DataSource } from "typeorm";

@Injectable()
export class UserTakingFormManagerService {
    constructor(
        private readonly dataSource: DataSource
    ) { }


    validateAllId(id: string) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(id);
    }

    async createAllBlankUserAnswers(formId: string, userId: string, usertakingFormId: string) {
        try {
            await this.dataSource.transaction(async (manager) => {

                const questions = await manager.find(Question, {
                    where: {
                        section: {
                            form: { id: formId }
                        }
                    }
                });

                const userAnswers = questions.map(q =>
                    manager.create(UserAnswer, {
                        questionId: q.id,
                        sectionId: q.sectionId,
                        userTakingFormId: usertakingFormId,
                        userAnswer: null
                    })
                );

                await manager.insert(UserAnswer, userAnswers);

            });
        } catch (error) {
            throw error;
        }
    }
}
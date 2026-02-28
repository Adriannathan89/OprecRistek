import { Injectable } from "@nestjs/common";
import { UnAuthResponse } from "src/apiResponse/errorResponse/unAuth.response";
import { DataSource } from "typeorm";

@Injectable()
export class UserTakingFormManagerService {
    constructor(
        private readonly dataSource: DataSource
    ) {}


    validateAllId(id: string) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(id);
    }

    async createAllBlankUserAnswers(formId: string, userId: string, usertakingFormId: string) {
        if(!this.validateAllId(formId) || !this.validateAllId(userId) || !this.validateAllId(usertakingFormId)) {
            throw new UnAuthResponse(400, "Invalid ID format");
        }
        
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();


        try {
            const res = await queryRunner.query(`
                INSERT INTO user_answer (id, question_id, userAnswer, user_taking_form_id, section_id)
                SELECT UUID(), q.id, NULL, '${usertakingFormId}', q.section_id
                FROM question q
                WHERE q.section_id IN (
                    SELECT id FROM section WHERE form_id = '${formId}'
                )
            `);

            await queryRunner.commitTransaction();
        } catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
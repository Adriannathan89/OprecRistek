import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Question } from "./question.entity";

@Injectable()
export class QuestionManagerService {
    constructor(
        private readonly dataSource: DataSource
    ) { }
    
    async rebalancePosition(sectionId: string) {
        await this.dataSource.transaction(async (manager) => {
            const questions = await manager.find(Question, {
                where: { sectionId },
                order: { position: 'ASC' },
            });
            const gap = 1000;
            for (let i = 0; i < questions.length; i++) {
                questions[i].position = (i + 1) * gap;
            }
            await manager.save(questions);
        });
    }
}
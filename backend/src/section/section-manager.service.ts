import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Section } from "./section.entity";

@Injectable()
export class SectionManagerService {
    constructor(
        private readonly dataSource: DataSource
    ) { }

    async rebalancePosition(formId: string) {
        await this.dataSource.transaction(async (manager) => {
            const sections = await manager.find(Section, {
                where: { formId },
                order: { position: 'ASC' },
            });

            const gap = 1000;

            for (let i = 0; i < sections.length; i++) {
                sections[i].position = (i + 1) * gap;
            }

            await manager.save(sections);
        });
    }
}
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Section } from "./section.entity";
import { SectionController } from "./section.controller";
import { SectionService } from "./section.service";
import { SectionManagerService } from "./section-manager.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Section])
    ],
    controllers: [SectionController],
    providers: [SectionService, SectionManagerService],
    exports: [SectionService, SectionManagerService]
})
export class SectionModule {}
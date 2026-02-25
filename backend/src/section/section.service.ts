import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Section } from "./section.entity";
import { SectionDto } from "./section.dto";
import { ApiResponse } from "src/apiResponse/api.response";
import { Repository } from "typeorm";
import { Form } from "src/form/form.entity";
import { SectionResponderResponse } from "./section-responder.response";
import { QuestionRespondenResponse } from "src/question/response/question-responden.response";

@Injectable()
export class SectionService {
    constructor(
        @InjectRepository(Section) private sectionRepository: Repository<Section>,
    ) { }

    validateSectionOwnership(sectionId: string, userId: string): Promise<boolean> {
        return this.sectionRepository.manager
            .createQueryBuilder(Section, "section")
            .andWhere("section.id = :sectionId", { sectionId })
            .andWhere("section.userId = :userId", { userId })
            .getCount()
            .then(count => count > 0);
    }

    validateFormPublicationStatus(formId: string): Promise<boolean> {
        return this.sectionRepository.manager
            .createQueryBuilder(Form, "form")
            .andWhere("form.id = :formId", { formId })
            .andWhere("form.isPublished = true")
            .getCount()
            .then(count => count > 0);
    }

    async createSection(sectionDto: SectionDto, user: any) {
        try {
            const sectionData = new Section();
            Object.assign(sectionData, sectionDto);
            sectionData.userId = user.sub;
            const section = await this.sectionRepository.save(sectionData);
            return new ApiResponse<Section>(true, 201, "Section created successfully", section);
        } catch (error) {
            const apiResponse = new ApiResponse<Section>(false, 500, "Failed to create section");
            return apiResponse;
        }
    }

    async updateSection(id: string, sectionDto: SectionDto, user: any
    ) {
        try {
            const section = await this.sectionRepository.findOne({ where: { id } });
            if(!section) {
                const apiResponse = new ApiResponse<Section>(false, 404, "Section not found");
                return apiResponse;
            }

            if(!await this.validateSectionOwnership(id, user.sub)) {
                const apiResponse = new ApiResponse<Section>(false, 403, "You do not have permission to update this section");
                return apiResponse;
            }
            
            Object.assign(section, sectionDto);
            const updatedSection = await this.sectionRepository.save(section);
            return new ApiResponse<Section>(true, 200, "Section updated successfully", updatedSection);
        } catch (error) {
            const apiResponse = new ApiResponse<Section>(false, 500, "Failed to update section");
            return apiResponse;
        }
    }

    async deleteSection(id: string, user: any) {
        if(!await this.validateSectionOwnership(id, user.sub)) {
            const apiResponse = new ApiResponse<Section>(false, 403, "You do not have permission to delete this section");
            return apiResponse;
        }

        const deleteResult = await this.sectionRepository.delete(id);
        const apiResponse = new ApiResponse<Section>(true, 200, "Section deleted successfully");
        return apiResponse;
    }
}
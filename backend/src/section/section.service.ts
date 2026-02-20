import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Section } from "./section.entity";
import { SectionDto } from "./section.dto";
import { ApiResponse } from "src/apiResponse/api.response";
import { Repository } from "typeorm";

@Injectable()
export class SectionService {
    constructor(
        @InjectRepository(Section) private sectionRepository: Repository<Section>,
    ) { }

    async createSection(sectionDto: SectionDto) {
        try {
            const sectionData = new Section();
            Object.assign(sectionData, sectionDto);
            const section = await this.sectionRepository.save(sectionData);
            return new ApiResponse<Section>(true, 201, "Section created successfully");
        } catch (error) {
            const apiResponse = new ApiResponse<Section>(false, 500, "Failed to create section");
            return apiResponse;
        }
    }

    async updateSection(id: string, sectionDto: SectionDto) {
        try {
            const section = await this.sectionRepository.findOne({ where: { id } });
            if (!section) {
                const apiResponse = new ApiResponse<Section>(false, 404, "Section not found");
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

    async deleteSection(id: string) {
        const deleteResult = await this.sectionRepository.delete(id);
        if (deleteResult.affected === 0) {
            const apiResponse = new ApiResponse<Section>(false, 404, "Section not found");
            return apiResponse;
        }
        const apiResponse = new ApiResponse<Section>(true, 200, "Section deleted successfully");
        return apiResponse;
    }

    async getSectionByFormId(formId: string) {
        const sections = await this.sectionRepository.find({ where: { formId } });
        if (!sections || sections.length === 0) {
            const apiResponse = new ApiResponse<Section[]>(false, 404, "No sections found for this form");
            return apiResponse;
        }
        const apiResponse = new ApiResponse<Section[]>(true, 200, "Sections retrieved successfully", sections);
        return apiResponse;
    }
}
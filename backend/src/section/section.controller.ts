import { Controller, Get, Param, Post, Put, Body, Delete } from "@nestjs/common";
import { SectionService } from "./section.service";

@Controller("/api/section")
export class SectionController {
    constructor(
        private readonly sectionService: SectionService
    ) {}

    @Post("/")
    async createSection(@Body() sectionDto) {
        return await this.sectionService.createSection(sectionDto);
    }

    @Get("/:formId")
    async getSectionByFormId(@Param("formId") formId: string) {
        return await this.sectionService.getSectionByFormId(formId);
    }

    @Put("/:id")
    async updateSection(@Param("id") id: string, @Body() sectionDto) {
        return await this.sectionService.updateSection(id, sectionDto);
    }

    @Delete("/:id")
    async deleteSection(@Param("id") id: string) {
        return await this.sectionService.deleteSection(id);
    }
}
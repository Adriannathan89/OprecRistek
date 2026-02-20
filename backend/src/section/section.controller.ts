import { Controller, Get, Param, Post, Put, Body, Delete, UseGuards } from "@nestjs/common";
import { SectionService } from "./section.service";
import { JwtAuthGuard } from "src/auth-guard/jwt-auth.guard";
import { Request } from "@nestjs/common";

@Controller("/api/section")
export class SectionController {
    constructor(
        private readonly sectionService: SectionService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post("/")
    async createSection(@Body() sectionDto, @Request() req) {
        return await this.sectionService.createSection(sectionDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:formId")
    async getSectionByFormId(@Param("formId") formId: string, @Request() req) {
        return await this.sectionService.getSectionByFormId(formId, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Put("/:id")
    async updateSection(@Param("id") id: string, @Body() sectionDto, @Request() req) {
        return await this.sectionService.updateSection(id, sectionDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/:id")
    async deleteSection(@Param("id") id: string, @Request() req) {
        return await this.sectionService.deleteSection(id, req.user);
    }
}
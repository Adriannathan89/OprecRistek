import { Controller, Get, Param, Post, Put, Body, Delete, UseGuards } from "@nestjs/common";
import { SectionService } from "./section.service";
import { JwtAuthGuard } from "src/auth-guard/jwt-auth.guard";
import { Request } from "@nestjs/common";
import { SectionManagerService } from "./section-manager.service";

@Controller("/api/section")
export class SectionController {
    constructor(
        private readonly sectionService: SectionService,
        private readonly sectionManagerService: SectionManagerService
    ) {}


    @UseGuards(JwtAuthGuard)
    @Post("/")
    async createSection(@Body() sectionDto, @Request() req) {
        return await this.sectionService.createSection(sectionDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/responder/:id")
    async getSectionForResponder(@Param("id") id: string) {
        return await this.sectionService.getSectionForResponder(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/balancing/:formId")
    async balancingPosition(@Param("formId") formId: string) {
        return await this.sectionManagerService.rebalancePosition(formId);
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
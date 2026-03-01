import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { FormResponseService } from "./form-response.service";
import { JwtAuthGuard } from "src/auth-guard/jwt-auth.guard";
import { FormResponseDto } from "./form-response.dto";

@Controller("/api/form-response")
export class FormResponseController {
    constructor(
        private readonly FormResponseService: FormResponseService
    ) {}

    @Post("/")
    @UseGuards(JwtAuthGuard)
    async submitFormResponse(@Body() dto: FormResponseDto, @Req() req: any) {
        return await this.FormResponseService.submitForm(dto, req.user);
    }

    @Get("/")
    @UseGuards(JwtAuthGuard)
    async getFormResponsesByUser(@Req() user: any) {
        return await this.FormResponseService.getFormResponseByUser(user);
    }
}
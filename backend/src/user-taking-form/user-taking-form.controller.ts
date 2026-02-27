import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { UserTakingFormService } from "./user-taking-form.service";
import { UserTakingFormDto } from "./user-taking-form.dto";
import { JwtAuthGuard } from "src/auth-guard/jwt-auth.guard";

@Controller("/api/user-taking-form")
export class UserTakingFormController {
    constructor(
        private readonly userTakingFormService: UserTakingFormService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post("/")
    async createUserTakingForm(@Req() request, @Body() userTakingFormDto: UserTakingFormDto) {
        return await this.userTakingFormService.createUserTakingForm(userTakingFormDto, request.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    async getUserTakingFormById(@Param("id") id: string) {
        return await this.userTakingFormService.getUserTakingFormById(id);
    }
}
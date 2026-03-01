import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { UserTakingFormService } from "./user-taking-form.service";
import { UserTakingFormDto } from "./dto/user-taking-form.dto";
import { JwtAuthGuard } from "src/auth-guard/jwt-auth.guard";

@Controller("/api/user-taking-form")
export class UserTakingFormController {
    constructor(
        private readonly userTakingFormService: UserTakingFormService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post("/")
    async getUserTakingFormById(@Body() userTakingFormDto: UserTakingFormDto, @Req() request) {
        return await this.userTakingFormService.getUserTakingFormById(userTakingFormDto, request.user);
    }
}
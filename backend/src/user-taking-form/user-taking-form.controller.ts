import { Controller, Get, Param, Post } from "@nestjs/common";
import { UserTakingFormService } from "./user-taking-form.service";

@Controller("/api/user-taking-form")
export class UserTakingFormController {
    constructor(
        private readonly userTakingFormService: UserTakingFormService
    ) {}

    @Post("/")
    async createUserTakingForm(userTakingFormDto) {
        return await this.userTakingFormService.createUserTakingForm(userTakingFormDto);
    }

    @Get("/:id")
    async getUserTakingFormById(@Param("id") id: string) {
        return await this.userTakingFormService.getUserTakingFormById(id);
    }
}
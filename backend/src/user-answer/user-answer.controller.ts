import { Body, Controller, Post, Put } from "@nestjs/common";
import { UserAnswerService } from "./user-answer.service";
import { UserAnswerDto } from "./user-answer.dto";
import { Param } from "@nestjs/common";

@Controller("/api/user-answer")
export class UserAnswerController {
    constructor(
        private readonly userAnswerService: UserAnswerService
    ) {}

    @Put("/:id")
    async updateUserAnswer(@Body() userAnswerDto: UserAnswerDto, @Param("id") id: string) {
        return await this.userAnswerService.updateUserAnswer(id, userAnswerDto);
    }
}
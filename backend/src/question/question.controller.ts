import { Body, Controller, Delete,  Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { JwtAuthGuard } from "src/auth-guard/jwt-auth.guard";
import { QuestionDto } from "./question.dto";
import { Request } from "@nestjs/common";
import { QuestionManagerService } from "./question-manager.service";

@Controller("/api/question")
export class QuestionController {
    constructor(
        private readonly questionService: QuestionService,
        private readonly questionManagerService: QuestionManagerService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post("/")
    async createQuestion(@Body() questionDto: QuestionDto, @Request() req) {
        return await this.questionService.createQuestion(questionDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/balancing/:sectionId")
    async balancingPosition(@Param("sectionId") sectionId: string) {
        return await this.questionManagerService.rebalancePosition(sectionId);
     }  

    @UseGuards(JwtAuthGuard)
    @Put("/:id")
    async updateQuestion(@Param("id") id: string, @Body() questionDto: QuestionDto, @Request() req) {
        return await this.questionService.updateQuestion(id, questionDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/:id")
    async deleteQuestion(@Param("id") id: string, @Request() req) {
        return await this.questionService.deleteQuestion(id, req.user);
    }
}
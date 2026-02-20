import { Body, Controller, Delete,  Get, Param, Post, Put } from "@nestjs/common";
import { QuestionService } from "./question.service";

@Controller("/api/question")
export class QuestionController {
    constructor(
        private readonly questionService: QuestionService
    ) {}


    @Post("/")
    async createQuestion(@Body() questionDto) {
        return await this.questionService.createQuestion(questionDto);
    }

    @Get("/:sectionId")
    async getQuestionsBySectionId(@Param("sectionId") sectionId: string) {
        return await this.questionService.getQuestionBySectionId(sectionId);
    }

    @Put("/:id")
    async updateQuestion(@Param("id") id: string, @Body() questionDto) {
        return await this.questionService.updateQuestion(id, questionDto);
    }

    @Delete("/:id")
    async deleteQuestion(@Param("id") id: string) {
        return await this.questionService.deleteQuestion(id);
    }
}
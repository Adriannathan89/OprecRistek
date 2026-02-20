import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { FormService } from "./form.service";

@Controller("/api/form")
export class FormController {
    constructor(private formService: FormService) {}

    @Post("/")
    async createForm(@Body() formDto) {
        return await this.formService.createForm(formDto);
    }

    @Get("/:id")
    async getFormById(@Param("id") id: string) {
        return await this.formService.getFormById(id);
    }

    @Get("/user/:userId")
    async getAllForms(@Param("userId") userId: string) {
        return await this.formService.getAllForms(userId);
    }

    @Put("/:id")
    async updateForm(@Param("id") id: string, @Body() formDto) {
        return await this.formService.updateForm(id, formDto);
    }

    @Delete("/:id")
    async deleteForm(@Param("id") id: string) {
        return await this.formService.deleteForm(id);
    }

}
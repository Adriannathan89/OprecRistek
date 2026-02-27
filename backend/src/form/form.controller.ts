import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { FormService } from "./form.service";
import { JwtAuthGuard } from "src/auth-guard/jwt-auth.guard";

@Controller("/api/form")
export class FormController {
    constructor(private formService: FormService) {}

    @UseGuards(JwtAuthGuard)
    @Post("/")
    async createForm(@Body() formDto, @Request() req) {
        return await this.formService.createForm(formDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/user")
    async getAllForms(@Request() req) {
        return await this.formService.getAllForms(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/responder/:id")
    async getFormForResponder(@Param("id") id: string) {
        return await this.formService.ReponderGetFormById(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    async getFormById(@Param("id") id: string, @Request() req) {
        return await this.formService.getFormById(id, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Put("/:id")
    async updateForm(@Param("id") id: string, @Body() formDto, @Request() req) {
        return await this.formService.updateForm(id, formDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/:id")
    async deleteForm(@Param("id") id: string, @Request() req) {
        return await this.formService.deleteForm(id, req.user);
    }

}
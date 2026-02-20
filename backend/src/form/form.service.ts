import { Injectable } from "@nestjs/common";
import { Form } from "./form.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { FormDto } from "./form.dto";
import { ApiResponse } from "src/apiResponse/api.response";

@Injectable()
export class FormService {
    constructor(
        @InjectRepository(Form) private formRepository: Repository<Form>,
    ) { }

    async createForm(formDto: FormDto) {
        const formData = new Form();
        Object.assign(formData, formDto);

        const form: Form = await this.formRepository.save(formData);
        if (!form) {
            const apiReponse = new ApiResponse<Form>(false, 500, "Failed to create form");
            return apiReponse;
        }
        const apiReponse = new ApiResponse<Form>(true, 201, "Form created successfully");
        return apiReponse;
    }

    async getFormById(id: string) {
        const form = await this.formRepository.findOne({
            where: { id },
            relations: ["sections", "sections.questions", "sections.questions.Answers"]
        });
        if (!form) {
            const apiReponse = new ApiResponse<Form>(false, 404, "Form not found");
            return apiReponse;
        }
        const apiReponse = new ApiResponse<Form>(true, 200, "Form found", form);
        return apiReponse;
    }

    async getAllForms(userId: string) {
        const forms = await this.formRepository.find(
            {where: { createdById: userId }, relations: ["sections", "sections.questions", "sections.questions.Answers"]}
        );

        if(!forms || forms.length === 0) {
            const apiReponse = new ApiResponse<Form[]>(false, 404, "No forms found for this user");
            return apiReponse;
        }

        const apiReponse = new ApiResponse<Form[]>(true, 200, "Forms retrieved successfully", forms);
        return apiReponse;
    }

    async deleteForm(id: string) {
        const deleteResult = await this.formRepository.delete(id);
        if (deleteResult.affected === 0) {
            const apiReponse = new ApiResponse<Form>(false, 404, "Form not found");
            return apiReponse;
        }
        const apiReponse = new ApiResponse<Form>(true, 200, "Form deleted successfully");
        return apiReponse;
    }

    async updateForm(id: string, formDto: FormDto) {
        const form = await this.formRepository.findOneBy({ id });
        if (!form) {
            const apiReponse = new ApiResponse<Form>(false, 404, "Form not found");
            return apiReponse;
        }
        Object.assign(form, formDto);
        const updatedForm = await this.formRepository.save(form);
        const apiReponse = new ApiResponse<Form>(true, 200, "Form updated successfully", updatedForm);
        return apiReponse;
    }
}
import { Injectable } from "@nestjs/common";
import { Form } from "./form.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { FormDto } from "./form.dto";
import { ApiResponse } from "src/apiResponse/api.response";
import { User } from "src/user/user.entity";

@Injectable()
export class FormService {
    constructor(
        @InjectRepository(Form) private formRepository: Repository<Form>,
    ) { }

    async createForm(formDto: FormDto, user: any) {
        const formData = new Form();
        Object.assign(formData, formDto);
        formData.createdById = user.sub;

        const form: Form = await this.formRepository.save(formData);
        if (!form) {
            const apiReponse = new ApiResponse<Form>(false, 500, "Failed to create form");
            return apiReponse;
        }
        const apiReponse = new ApiResponse<Form>(true, 201, "Form created successfully", form);
        return apiReponse;
    }

    async getFormById(id: string, user: any) {
        const form = await this.formRepository.findOne({
            where: { id },
            relations: ["sections", "sections.questions"]
        });
        if (!form) {
            const apiReponse = new ApiResponse<Form>(false, 404, "Form not found");
            return apiReponse;
        }

        if (form.createdById !== user.sub) {
            const apiReponse = new ApiResponse<Form>(false, 403, "You do not have permission to access this form");
            return apiReponse;
        }

        const apiReponse = new ApiResponse<Form>(true, 200, "Form found", form);
        return apiReponse;
    }

    async getAllForms(user: any) {
        try {
            const forms = await this.formRepository.find(
                {where: { createdById: user.sub }}
            );
            if (!forms || forms.length === 0) {
                const apiReponse = new ApiResponse<Form[]>(false, 404, "No forms found for this user");
                return apiReponse;
            }

            const apiReponse = new ApiResponse<Form[]>(true, 200, "Forms retrieved successfully", forms);
            return apiReponse;
        } catch (error) {
            const apiReponse = new ApiResponse<Form[]>(false, 500, "Failed to retrieve forms");
            return apiReponse;
        }
    }

    async deleteForm(id: string, user: any) {
        const form = await this.formRepository.findOneBy({ id });
        if (!form) {
            const apiReponse = new ApiResponse<Form>(false, 404, "Form not found");
            return apiReponse;
        }

        if (form.createdById !== user.sub) {
            const apiReponse = new ApiResponse<Form>(false, 403, "You do not have permission to delete this form");
            return apiReponse;
        }

        const result = await this.formRepository.delete(id);
        if (result.affected === 0) {
            const apiReponse = new ApiResponse<Form>(false, 500, "Failed to delete form");
            return apiReponse;
        }
        const apiReponse = new ApiResponse<Form>(true, 200, "Form deleted successfully");
        return apiReponse;
    }

    async updateForm(id: string, formDto: FormDto, user: any) {
        const form = await this.formRepository.findOneBy({ id });

        if (!form) {
            const apiReponse = new ApiResponse<Form>(false, 404, "Form not found");
            return apiReponse;
        }

        if (form.createdById !== user.sub) {
            const apiReponse = new ApiResponse<Form>(false, 403, "You do not have permission to update this form");
            return apiReponse;
        }

        if (form.isAnswered) {
            const apiReponse = new ApiResponse<Form>(false, 400, "Cannot update form that has been answered");
            return apiReponse;
        }
        Object.assign(form, formDto);

        const updatedForm = await this.formRepository.save(form);
        const apiReponse = new ApiResponse<Form>(true, 200, "Form updated successfully", updatedForm);
        return apiReponse;
    }
}
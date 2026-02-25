import { Injectable } from "@nestjs/common";
import { Form } from "./form.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { FormDto } from "./form.dto";
import { ApiResponse } from "src/apiResponse/api.response";
import { User } from "src/user/user.entity";
import { ServerErrorResponse } from "src/apiResponse/errorResponse/serverError.response";
import { UnAuthResponse } from "src/apiResponse/errorResponse/unAuth.response";
import { NotFoundResponse } from "src/apiResponse/errorResponse/notFound.response";

@Injectable()
export class FormService {
    constructor(
        @InjectRepository(Form) private formRepository: Repository<Form>,
    ) { }

    async createForm(formDto: FormDto, user: any) {
        try {
            const formData = new Form();
            Object.assign(formData, formDto);
            formData.createdById = user.sub;

            const form: Form = await this.formRepository.save(formData);
            const apiReponse = new ApiResponse<Form>(true, 201, "Form created successfully", form);
            return apiReponse;
        } catch (error) {
            throw new ServerErrorResponse("Failed to create form");
        }
    }

    async getFormById(id: string, user: any) {
        const form = await this.formRepository.findOne({
            where: { id },
            relations: ["sections", "sections.questions"],
            order: {
                sections: {
                    position: "ASC",
                    questions: {
                        position: "ASC"
                    }
                }
            }
        });
        if (!form) {
            throw new NotFoundResponse("Form not found");
        }

        if (form.createdById !== user.sub) {
            throw new UnAuthResponse(403, "You do not have permission to access this form");
        }

        const apiReponse = new ApiResponse<Form>(true, 200, "Form found", form);
        return apiReponse;
    }

    async getAllForms(user: any) {
        const forms = await this.formRepository.find({
            where: { createdById: user.sub },
            order: { updatedAt: "DESC" },
        }
        );
        if (!forms || forms.length === 0) {
            throw new NotFoundResponse("No forms found for this user");
        }

        const apiReponse = new ApiResponse<Form[]>(true, 200, "Forms retrieved successfully", forms);
        return apiReponse;
    }

    async deleteForm(id: string, user: any) {
        const form = await this.formRepository.findOneBy({ id });
        if (!form) {
            throw new NotFoundResponse("Form not found");
        }

        if (form.createdById !== user.sub) {
            throw new UnAuthResponse(403, "You do not have permission to delete this form");
        }

        const result = await this.formRepository.delete(id);
        if (result.affected === 0) {
            throw new ServerErrorResponse("Failed to delete form");
        }
        const apiReponse = new ApiResponse<Form>(true, 200, "Form deleted successfully");
        return apiReponse;
    }

    async updateForm(id: string, formDto: FormDto, user: any) {
        const form = await this.formRepository.findOneBy({ id });

        if (!form) {
            throw new NotFoundResponse("Form not found");
        }

        if (form.createdById !== user.sub) {
            throw new UnAuthResponse(403, "You do not have permission to update this form");
        }

        if (form.isAnswered) {
            throw new UnAuthResponse(400, "You cannot update a form that has been answered");
        }

        Object.assign(form, formDto);

        const updatedForm = await this.formRepository.save(form);
        const apiReponse = new ApiResponse<Form>(true, 200, "Form updated successfully", updatedForm);
        return apiReponse;
    }
}
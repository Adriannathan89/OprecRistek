import { Injectable } from "@nestjs/common";
import { UserTakingForm } from "./user-taking-form.entity";
import { InjectRepository } from "@nestjs/typeorm/dist/common/typeorm.decorators";
import { UserTakingFormDto } from "./dto/user-taking-form.dto";
import { ApiResponse } from "src/apiResponse/api.response";
import { Repository } from "typeorm";
import { UserTakingFormManagerService } from "./user-taking-form-manager.service";

@Injectable()
export class UserTakingFormService {
    constructor(
        @InjectRepository(UserTakingForm) private userTakingFormRepository: Repository<UserTakingForm>,
        private readonly userTakingFormManager: UserTakingFormManagerService
    ) {}

    validateFormPublicationStatus(formId: string): Promise<boolean> {
        return this.userTakingFormRepository.manager
            .createQueryBuilder("form", "f")
            .andWhere("f.id = :formId", { formId })
            .andWhere("f.isPublished = true")
            .getCount()
            .then(count => count > 0);
    }

    validateUUID(id: string): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(id);
    }

    async createUserTakingForm(userTakingFormDto: UserTakingFormDto, user: any) {
        try {
            if(!this.validateUUID(userTakingFormDto.formId)) {
                const apiResponse = new ApiResponse<UserTakingForm>(false, 400, "Invalid form ID format");
                return apiResponse;
            }
            const userTakingFormData = new UserTakingForm();
            Object.assign(userTakingFormData, userTakingFormDto);
   
            userTakingFormData.userId = user.sub;

            const userTakingForm = await this.userTakingFormRepository.save(userTakingFormData);

            await this.userTakingFormManager.createAllBlankUserAnswers(userTakingFormDto.formId, user.sub, userTakingForm.id);
        
            const apiResponse = new ApiResponse<UserTakingForm>(true, 201, "UserTakingForm created successfully", userTakingForm);
            return apiResponse;
        } catch (error) {
            const apiResponse = new ApiResponse<UserTakingForm>(false, 500, "Failed to create UserTakingForm");
            return apiResponse;
        }
    }

    async getUserTakingFormById(dto: UserTakingFormDto, user: any) {
        if(!this.validateUUID(dto.formId)) {
            const apiResponse = new ApiResponse<UserTakingForm>(false, 400, "Invalid form ID format");
            return apiResponse;
        }

        if(!await this.validateFormPublicationStatus(dto.formId)) {
            const apiResponse = new ApiResponse<UserTakingForm>(false, 403, "Form is not published yet");
            return apiResponse;
        }

        const userTakingForm = await this.userTakingFormRepository.findOne({ 
            where: { formId: dto.formId, userId: user.sub }, 
            relations: ["userAnswers"]}
        );

        if (!userTakingForm) {
            await this.createUserTakingForm(dto, user);
            const newUserTakingForm = await this.userTakingFormRepository.findOne({ 
                where: { formId: dto.formId, userId: user.sub }, 
                relations: ["userAnswers"]
            });

            if(!newUserTakingForm) {
                const apiResponse = new ApiResponse<UserTakingForm>(false, 500, "Failed to create UserTakingForm");
                return apiResponse;
            }

            const apiResponse = new ApiResponse<UserTakingForm>(true, 200, "UserTakingForm found after creating", newUserTakingForm);
            return apiResponse;
        }

        const apiResponse = new ApiResponse<UserTakingForm>(true, 200, "UserTakingForm found", userTakingForm);
        return apiResponse;
    }
}
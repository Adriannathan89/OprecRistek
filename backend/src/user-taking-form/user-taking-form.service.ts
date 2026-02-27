import { Injectable } from "@nestjs/common";
import { UserTakingForm } from "./user-taking-form.entity";
import { InjectRepository } from "@nestjs/typeorm/dist/common/typeorm.decorators";
import { UserTakingFormDto } from "./user-taking-form.dto";
import { ApiResponse } from "src/apiResponse/api.response";
import { Repository } from "typeorm";
import { UserTakingFormManagerService } from "./user-taking-form-manager.service";

@Injectable()
export class UserTakingFormService {
    constructor(
        @InjectRepository(UserTakingForm) private userTakingFormRepository: Repository<UserTakingForm>,
        private readonly userTakingFormManager: UserTakingFormManagerService
    ) {}

    async createUserTakingForm(userTakingFormDto: UserTakingFormDto, user: any) {
        try {
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

    async getUserTakingFormById(id: string) {
        const userTakingForm = await this.userTakingFormRepository.findOne({ 
            where: { id }, 
            relations: ["userAnswers"]}
        );
        if (!userTakingForm) {
            const apiResponse = new ApiResponse<UserTakingForm>(false, 404, "UserTakingForm not found");
            return apiResponse;
        }
        const apiResponse = new ApiResponse<UserTakingForm>(true, 200, "UserTakingForm found", userTakingForm);
        return apiResponse;
    }
}
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserTakingFormService } from "./user-taking-form.service";
import { UserTakingForm } from "./user-taking-form.entity";
import { UserTakingFormController } from "./user-taking-form.controller";
import { UserTakingFormManagerService } from "./user-taking-form-manager.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserTakingForm])
    ],
    controllers: [UserTakingFormController],
    providers: [UserTakingFormService, UserTakingFormManagerService],
    exports: [UserTakingFormService, UserTakingFormManagerService]
})
export class UserTakingFormModule {}
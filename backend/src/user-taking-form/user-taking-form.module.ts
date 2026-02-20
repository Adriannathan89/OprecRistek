import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserTakingFormService } from "./user-taking-form.service";
import { UserTakingForm } from "./user-taking-form.entity";
import { UserTakingFormController } from "./user-taking-form.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserTakingForm])
    ],
    controllers: [UserTakingFormController],
    providers: [UserTakingFormService],
    exports: [UserTakingFormService]
})
export class UserTakingFormModule {}
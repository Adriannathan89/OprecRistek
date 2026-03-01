import { IsString } from "class-validator";

export class UserTakingFormDto {
    @IsString()
    formId: string;
}
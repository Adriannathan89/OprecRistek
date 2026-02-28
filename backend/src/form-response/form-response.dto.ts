import { IsString } from "class-validator";

export class FormResponseDto {
    @IsString()
    userTakingFormId: string;

    @IsString()
    formId: string;
}
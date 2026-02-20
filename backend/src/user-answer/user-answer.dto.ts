import { IsString } from "class-validator";

export class UserAnswerDto {
    @IsString()
    questionId: string;

    @IsString()
    answerId: string;

    userAnswer?: string | string[] | number | boolean;

    @IsString()
    userTakingFormId: string; 
}
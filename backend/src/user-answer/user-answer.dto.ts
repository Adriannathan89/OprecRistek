import { IsString } from "class-validator";

export class UserAnswerDto {
    @IsString()
    questionId: string;

    answerId: string | string[];

    userAnswer?: string | string[] | number | boolean;

    @IsString()
    userTakingFormId: string; 

    @IsString()
    sectionId: string;
}
import { IsBoolean, IsString } from 'class-validator';

export class FormDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsBoolean()
    isQuiz: boolean;

    @IsBoolean()
    isPublished: boolean;
}
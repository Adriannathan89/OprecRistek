import { IsString } from "class-validator";

export class SectionDto {
    @IsString()
    formId: string;

    description?: string;

    title?: string;
}
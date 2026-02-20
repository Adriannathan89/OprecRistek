import { Option } from "../question-component/option.component";
import { Answer } from "../question-component/answer.component";
import { IsString } from "class-validator";


export class QuestionDto {
    @IsString()
    sectionId: string;

    description?: string;

    required?: boolean;

    questionType?: string;

    options?: Option[];

    answers?: Answer[];
}
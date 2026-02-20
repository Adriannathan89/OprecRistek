import { Option } from "src/question-component/option.component";

export class QuestionRespondenResponse {
    id: string;

    description: string;

    required: boolean;

    questionType: string;

    options: Option[];
}
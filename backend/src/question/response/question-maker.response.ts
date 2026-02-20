import { Answer } from 'src/question-component/answer.component';
import { Option } from 'src/question-component/option.component';

export class QuestionMakerResponse {
    id: string;

    description: string;

    required: boolean;

    questionType: string;
    
    options: Option[];

    answers: Answer[];
}
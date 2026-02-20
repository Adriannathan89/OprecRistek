import { QuestionRespondenResponse } from "src/question/response/question-responden.response";

export class SectionResponderResponse {
  id: string;
  title: string;
  description: string;
  formId: string;
  questions: QuestionRespondenResponse[];
}
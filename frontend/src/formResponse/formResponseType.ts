import type { UserTakingForm } from "../formAnswer/formAnswerTypes"

export type FormResponse = {
    id: string,
    formId: string,
    score: number,
    fullScore: number,
    userTakingFormId: string,
    userTakingForm: UserTakingForm
}

export type UserAnswerResponse = {
    id: string,
    userAnswer: string | string[] | number | boolean,
    answerId: string  | string[],
    questionId: string,
}
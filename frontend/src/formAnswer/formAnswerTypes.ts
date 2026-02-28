import type { Option } from "../forms/service/form-component.type"

export type UserAnswer = {
    id: string
    userAnswer: string | string[] | number | boolean,
    answerId: string,
    userTakingFormId: string,
    questionId: string,
    sectionId: string,
}

export type QuestionResponder = {
    id: string,
    description: string,
    required: boolean,
    questionType: string,
    options: Option[],
}

export type SectionResponder = {
    id: string,
    title: string,
    description: string,
    formId: string,
    questions: QuestionResponder[],
}

export type FormResponder = {
    id: string,
    title: string,
    description: string,
    isQuiz: boolean,
    sectionsId: string[],
}

export type UserTakingForm = {
    id: string,
    userId: string,
    formId: string,
    userAnswers: UserAnswer[],
}
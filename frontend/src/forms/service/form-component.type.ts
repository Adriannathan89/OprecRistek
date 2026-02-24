export type Option = {
    id: string,
    description: string,
}

export type Answer = {
    id: string,
    description: string,
    answerCount: number,
    isActive: boolean,
}

export type Question = {
    id: string,
    description: string,
    questionType: string,
    options?: Option[]
    answer?: Answer[]
}

export type Section = {
    id: string,
    title: string,
    description: string,
    Questions?: Question[]
}

export type Form = {
    id: string,
    title: string,
    description: string,
    isQuiz: boolean,
    isPublished: boolean,
    isAnswered: boolean,
    createdById: string,
    Sections?: Section[]
}
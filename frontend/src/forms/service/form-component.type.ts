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
    sectionId: string,
    required: boolean,
    description: string,
    questionType: string,
    position: number,
    options?: Option[]
    answers?: Answer[]
}

export type Section = {
    id: string,
    title: string,
    description: string,
    position: number,
    questions?: Question[]
}

export type Form = {
    id: string,
    title: string,
    description: string,
    isQuiz: boolean,
    isPublished: boolean,
    isAnswered: boolean,
    createdById: string,
    sections: Section[]
}

export type SectionActiveComponent = {
    sectionIndex: number,
}

export type QuestionActiveComponent = {
    questionIndex: number,
    sectionId: string,
}
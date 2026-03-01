import type { Answer, Option, Question } from "../forms/service/form-component.type";

export default function UseEditQuestionProps(question: Question, onChange: (question: Question) => void) {
    const updateOptionAndAnswer = (options: Option[], answers: Answer[], id: string, value: string) => {
        const newOptions = options.map(option => {
            if (option.id === id) {
                return { ...option, description: value };
            }
            return option;
        });
        const newAnswers = answers.map(answer => {
            if (answer.id === id) {
                return { ...answer, description: value };
            }
            return answer;
        });

        onChange({ ...question, answers: newAnswers, options: newOptions });
    }

    const addNew = (options: Option[],answers: Answer[]) => {
        const sharedId = crypto.randomUUID();
        const newOption: Option = {
            id: sharedId,
            description: `Option ${options.length + 1}`,
        }
        const newAnswer: Answer = {
            id: sharedId,
            description: `Option ${options.length + 1}`,
            answerCount: 0,
            isActive: false,
        }
        const newOptions = [...options, newOption];
        const newAnswers = [...answers, newAnswer];
        onChange({ ...question, options: newOptions, answers: newAnswers });
    }

    const deleteOptions = (id: string) => {
        const newOptions = question.options?.filter(option => option.id !== id) || [];
        const newAnswers = question.answers?.filter(answer => answer.id !== id) || [];
        onChange({ ...question, options: newOptions, answers: newAnswers });
    }

    return { updateOptionAndAnswer, addNew, deleteOptions }
}
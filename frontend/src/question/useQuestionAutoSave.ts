import type { Question } from "../forms/service/form-component.type";
import { updateQuestion } from "./question.service";
import { useEffect, useRef } from "react";
    
export function useQuestionAutoSave(question: Question, setSync: React.Dispatch<React.SetStateAction<boolean>>) {
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const timeOut = setTimeout(() => {
            setSync(true);
            updateQuestion(question)
            .finally(() => setSync(false))
        }, 500)

        return () => clearTimeout(timeOut);
    }, [question.description, question.options, question.position, question.answers, question.required])
}
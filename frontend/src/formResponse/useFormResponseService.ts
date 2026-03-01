import { useEffect, useState } from "react";
import { submitFormAnswer } from "./formResponse.service";
import type { FormResponse, UserAnswerResponse } from "./formResponseType";
import { type Question } from "../forms/service/form-component.type";

export function useFormResponseService(formId: string, userTakingFormId: string) {
    const [formResponse, setFormResponse] = useState<FormResponse | null>(null);
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [userAnswersResponse, setUserAnswersResponse] = useState<UserAnswerResponse[] | null>(null);
    const [title, setTitle] = useState<string>("");
    
    useEffect(() => {
        if(!formId || !userTakingFormId) return;
        submitFormAnswer(formId, userTakingFormId)
        .then((data) => {
            setFormResponse(data);
            const allQuestions = data.userTakingForm.userAnswers.map((ans: any) => {
                const question: Question = ans && ans.question;
                return question;
            })
            setQuestions(allQuestions);
            setUserAnswersResponse(data.userTakingForm.userAnswers);
            setTitle(data.form.title);
        })
        .catch((err) => {
            console.error("Error fetching form response:", err);
        })

    }, [formId, userTakingFormId])

    return { formResponse, questions, userAnswersResponse, title }
}
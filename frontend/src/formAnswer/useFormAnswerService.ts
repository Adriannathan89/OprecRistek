import { useEffect, useState } from "react"
import type { FormResponder, SectionResponder, UserAnswer, UserTakingForm } from "./formAnswerTypes"
import type { AppError } from "../errorHandling/errorType"
import { getFormAnswer, getFormResponder, getSectionResponder, updateUserAnswerDetail } from "./formAnswer.service"

export function useFormAnswerService(formId: string) {
    const [formResponder, setFormResponder] = useState<FormResponder | null>(null)
    const [userTakingForm, setUserTakingForm] = useState<UserTakingForm | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<AppError | null>(null)


    useEffect(() => {
        const fetchFormData = async () => {
            setIsLoading(true);
            getFormResponder(formId)
            .then((data) => {
                setFormResponder(data);
            })
            .catch((err: AppError) => {
                setError(err);
            }).finally(() => {
                setIsLoading(false);
            })
        }

        const fetchUserTakingForm = async () => {
            setIsLoading(true);
            getFormAnswer(formId).then((data) => {
                setUserTakingForm(data);
            }).catch((err: AppError) => {
                setError(err);
            }).finally(() => {
                setIsLoading(false);
            })
        }

        fetchFormData();
        fetchUserTakingForm();


    }, [formId])

    const onUpdateUserAnswer = (userAnswerId: string, questionId: string, sectionId: string, answer: string | string[] | number | boolean, answerId: string | string[]) => {
        setUserTakingForm((prev) => {
            if (!prev) return prev;
            const updatedAnswers = prev.userAnswers.map((ans) => {
                if (ans.id === userAnswerId) {
                    return { ...ans, userAnswer: answer, questionId, sectionId, answerId };
                }
                return ans;
            })
            return { ...prev, userAnswers: updatedAnswers };
        })
    }


    return { formResponder, userTakingForm, isLoading, error, onUpdateUserAnswer, setIsLoading, setError }
}

export function useFetchSectionResponder(sectionId: string | undefined, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, setError: React.Dispatch<React.SetStateAction<AppError | null>>) {
    const [sectionResponder, setSectionResponder] = useState<SectionResponder>({} as SectionResponder)

    useEffect(() => {
        if(!sectionId) return;
        
        const fetchSectionResponder = async () => {
            setIsLoading(true);
            getSectionResponder(sectionId).then((data) => {
                setSectionResponder(data);
            }).catch((err: AppError) => {
                setError(err);
            }).finally(() => {
                setIsLoading(false);
            })
        }   
        fetchSectionResponder();
    }, [sectionId])

    return { sectionResponder }
}

interface UpdateUserAnswerParams {
    answerDetail: UserAnswer,
    setSyncing: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<AppError | null>>,
}

export async function useUpdateUserAnswer({answerDetail, setSyncing, setError}: UpdateUserAnswerParams) {
    if(!answerDetail || !answerDetail.id) return;
    
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setSyncing(true);
            updateUserAnswerDetail(answerDetail.id, answerDetail.answerId, answerDetail.userAnswer)
            .catch((err: AppError) => {
                setError(err);
            }).finally(() => {
                setSyncing(false);
            })
        }, 500)

        return () => {
            clearTimeout(timeOut);
        }
    }, [answerDetail.answerId, answerDetail.userAnswer, answerDetail.id])
}
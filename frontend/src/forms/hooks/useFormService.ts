import { createForm, getFormByUser } from "../service/form.service"
import { useEffect, useState } from "react"
import { type Form } from "../service/form-component.type"
import type { AppError } from "../../errorHandling/errorType";

export function useFormService() {
    const [forms, setForms] = useState<Form[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AppError | null>(null);

    useEffect(() => {
    const useGetUserForms = async () => {
        setIsLoading(true);
        getFormByUser()
            .then(setForms)
            .catch(setError)
            .finally(() => setIsLoading(false))
    }

    useGetUserForms();
    }, [])


    const useCreateForm = async () => {
        setIsLoading(true);
        const id = createForm()
            .then((newForm) => {
                setForms((prevForms) => [...prevForms, newForm]);
                return newForm.id;
            })
            .catch(setError)
            .finally(() => setIsLoading(false)) 
        return id; 
    }

    return { forms, isLoading, error, useCreateForm };
}
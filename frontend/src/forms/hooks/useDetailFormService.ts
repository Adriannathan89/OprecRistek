import { use, useEffect, useState } from "react";
import { type Form } from "../service/form-component.type";
import type { AppError } from "../../errorHandling/errorType";
import { deleteForm, getFormById } from "../service/form.service";
import { useNavigate } from "react-router-dom";

export function useDetailFormService(formId: string) {
    const navigate = useNavigate();
    const [form, setForm] = useState<Form | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AppError | null>(null);

    const onChange = (form: Form) => {
        setForm(form);
    }

    useEffect(() => {
        setIsLoading(true);
        getFormById(formId)
            .then(setForm)
            .catch(setError)
            .finally(() => setIsLoading(false))
        
    }, [formId])

    const useDeleteForm = async (formId: string) => {
        deleteForm(formId)
            .then(() => navigate("/dashboard"))
            .catch(setError)
        }
    
    
    return { form, onChange, useDeleteForm, isLoading, error };
}
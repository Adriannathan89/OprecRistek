import { AppError } from "../errorHandling/errorType";

export async function submitFormAnswer(formId: string, userTakingFormId: string) {
    const res = await fetch(`${import.meta.env.VITE_SUBMIT_FORM_ENDPOINT}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            formId: formId,
            userTakingFormId: userTakingFormId,
        })
    })

    const json = await res.json();

    if (!json.success) {
        throw new AppError(json.message, json.statusCode);
    }

    return json.data;
}

export async function getFormResponse() {
    const res = await fetch(`${import.meta.env.VITE_SUBMIT_FORM_ENDPOINT}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })

    const json = await res.json();

    if (!json.success) {
        throw new AppError(json.message, json.statusCode);
    }

    return json.data;
}
import { AppError } from "../errorHandling/errorType";

export async function getFormAnswer(formId: string) {
    const res = await fetch(`${import.meta.env.VITE_GET_USER_TAKING_FORM}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            formId: formId,
        }),
    })

    const json = await res.json();

    if (!json.success) {
        throw new AppError(json.message, json.statusCode);
    }

    return json.data;
}

export async function getFormResponder(formId: string) {
    const res = await fetch(`${import.meta.env.VITE_FORM_DETAIL_RESPONDER_ENDPOINT}/${formId}`, {
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

export async function getSectionResponder(sectionId: string) {
    const res = await fetch(`${import.meta.env.VITE_SECTION_RESPONDER_ENDPOINT}/${sectionId}`, {
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


export async function updateUserAnswerDetail(userAnswerId: string, answerId: string | string[], answer: any) {
    const res = await fetch(`${import.meta.env.VITE_SAVE_ANSWER_ENDPOINT}/${userAnswerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            userAnswer: answer,
            answerId: answerId,
        }),
    })

    const json = await res.json();

    if (!json.success) {
        throw new AppError(json.message, json.statusCode);
    }
}
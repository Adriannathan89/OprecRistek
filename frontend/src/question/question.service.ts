import { AppError } from "../errorHandling/errorType";
import type { Question } from "../forms/service/form-component.type";

export async function createQuestion(position: number, sectionId: string) {
    const data = {
        description: "untitled question",
        questionType: "multiple-choice",
        options: [],
        answers: [],
        required: false,
        position: position,
        sectionId: sectionId,
    }

    const res = await fetch(`${import.meta.env.VITE_QUESTION_ENDPOINT}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
    });

    const json = await res.json()

    if(!json.success) {
        throw new AppError(json.message, json.statusCode);
    }

    return json.data
}

export async function updateQuestion(questionInfo: Question) {
    const updatedData = {
        description: questionInfo.description,
        answers: questionInfo.answers,
        options: questionInfo.options,
        required: questionInfo.required,
        questionType: questionInfo.questionType,
        sectionId: questionInfo.sectionId,
        position: questionInfo.position,
    }

    const res = await fetch(`${import.meta.env.VITE_QUESTION_ENDPOINT}/${questionInfo.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData)
    });

    const json = await res.json();

    if(!json.success) {
        throw new AppError(json.message, json.statusCode);
    }

    return json.data;
}

export async function deleteQuestion(questionId: string) {
    const res = await fetch(`${import.meta.env.VITE_QUESTION_ENDPOINT}/${questionId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    const json = await res.json();

    if(!json.success) {
        throw new AppError(json.message, json.statusCode);
    }
}

export async function rebalanceQuestion(sectionId: string) {
    await fetch(`${import.meta.env.VITE_QUESTION_REBALANCE_ENDPOINT}/${sectionId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
}
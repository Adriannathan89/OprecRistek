import { AppError } from "../../errorHandling/errorType";
import type { Form } from "./form-component.type";

export async function getFormByUser() {
    const res = await fetch(`${import.meta.env.VITE_FORM_USER_GET}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    const json = await res.json();

    if(!json.success) {
        throw new AppError(json.message, json.statusCode);
    }

    return json.data;
}

export async function getFormById(formId: string) {
    const res = await fetch(`${import.meta.env.VITE_FORM_ENDPOINT}/${formId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    
    const json = await res.json();

    if(!json.success) {
        throw new AppError(json.message, json.statusCode);
    }

    return json.data;
}

export async function deleteForm(formId: string) {
    const res = await fetch(`${import.meta.env.VITE_FORM_ENDPOINT}/${formId}`, {
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

    return json.data;
}

export async function updateForm(form: Form) {
    const updateData = {
        title: form.title,
        description: form.description,
        isQuiz: form.isQuiz,
        isPublished: form.isPublished,
    }


    const res = await fetch(`${import.meta.env.VITE_FORM_ENDPOINT}/${form.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updateData)
    });

    const json = await res.json();

    if(!json.success) {
        throw new AppError(json.message, json.statusCode);
    }

    return json.data;
}

async function createSection(formId: string) {
    const sectionData = {
        formId: formId,
        title: "untitled section",
        description: "untitled description",
    }
    const res = await fetch(`${import.meta.env.VITE_SECTION_ENDPOINT}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(sectionData)
    });

    const json = await res.json();

    if(!json.success) {
        throw new AppError(json.message, json.statusCode);
    }
}

export async function createForm() {
    const newData = {
        title: "untitled form",
        description: "untitled description",
        isQuiz: false,
        isPublished: false,
    }

    const res = await fetch(`${import.meta.env.VITE_FORM_ENDPOINT}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newData)
    });

    const json = await res.json();

    if(!json.success) {
        throw new AppError(json.message, json.statusCode);
    }

    createSection(json.data.id);

    return json.data;
}
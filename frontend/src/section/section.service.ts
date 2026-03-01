import { AppError } from  "../errorHandling/errorType";
import type { Section } from "../forms/service/form-component.type";


export async function updateSection(section: Section) {
    const updateData = {
        id: section.id,
        title: section.title,
        description: section.description,
    }
    
    const res = await fetch(`${import.meta.env.VITE_SECTION_ENDPOINT}/${section.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updateData),
    });

    const json = await res.json();

    if(!json.success) {
        throw new AppError(json.message, json.statusCode);
    }
    return json.data;
}

export async function deleteSection(sectionId: string) {
    const res = await fetch(`${import.meta.env.VITE_SECTION_ENDPOINT}/${sectionId}`, {
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

export async function createSection(formId: string, position: number) {
    const sectionData = {
        formId: formId,
        title: "untitled section",
        description: "untitled description",
        position: position,
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

    return json.data.id;
}

export async function rebalanceSection(formId: string) {
    const res = await fetch(`${import.meta.env.VITE_SECTION_REBALANCE_ENDPOINT}/${formId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
}
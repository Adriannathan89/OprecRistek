import { createSection, updateSection, deleteSection } from "./section.service";
import type { Section } from "../forms/service/form-component.type";
import { useEffect } from "react";

export function useSectionService() {
    const createNewSection = async (formId: string, position: number) => {
        return createSection(formId, position);
    }

    const deleteCurrentSection = async (sectionId: string) => {
        deleteSection(sectionId);
    }
    return { createNewSection, deleteCurrentSection };
}

export function updateCurrentSection(section: Section) {
    useEffect(() => {
        const timeOut = setTimeout(() => {
            updateSection(section);
        }, 500)

        return () => clearTimeout(timeOut);
    }, [section.title, section.description])
}
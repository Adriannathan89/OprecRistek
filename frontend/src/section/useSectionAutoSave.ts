import { updateSection } from "./section.service";
import type { Section } from "../forms/service/form-component.type";
import { useEffect, useRef } from "react";

export function useSectionAutoSave(section: Section, setSync: React.Dispatch<React.SetStateAction<boolean>>) {
    const isFirstRender = useRef(true);
    
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const timeOut = setTimeout(() => {
            setSync(true);
            updateSection(section)
                .finally(() => setSync(false));
        }, 500)

        return () => clearTimeout(timeOut);

    }, [section.title, section.description, section.position])
}
import { useEffect, useState } from "react";
import { type Form, type Question } from "../service/form-component.type";
import type { AppError } from "../../errorHandling/errorType";
import { deleteForm, getFormById, updateForm } from "../service/form.service";
import { useNavigate } from "react-router-dom";
import { type Section } from "../service/form-component.type";
import { rebalanceSection } from "../../section/section.service";

export function useDetailFormService(formId: string) {
    const navigate = useNavigate();
    const [form, setForm] = useState<Form>({} as Form);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AppError | null>(null);

    const onChange = (form: Form) => {
        setForm(form);
    }

    const onSectionChange = (section: Section) => {
        setForm((prevForm) => {
            const updatedSections = prevForm.sections?.map((s) => s.id === section.id ? section : s);
            return { ...prevForm, sections: updatedSections };
        });
    }

    const onAddSection = (sectionId: string) => {
        setForm((prevForm) => {
            const newSection: Section = {
                id: sectionId,
                title: "untitled section",
                description: "untitled description",
                position: prevForm.sections ? prevForm.sections.length * 1000 : 1000,
                questions: [],
            }
            return { ...prevForm, sections: [...(prevForm.sections || []), newSection] };
        })
    }

    const onAddAfterSection = (sectionId: string, index: number) => {
        setForm((prevForm) => {
            const currPosition = (prevForm.sections[index - 1].position + prevForm.sections[index + 1].position) / 2;
            if (currPosition <= 1) {
                rebalanceSection(form.id)
            }
            const newSection: Section = {
                id: sectionId,
                title: "untitled section",
                description: "untitled description",
                position: currPosition,
                questions: [],
            }
            const updatedSections = (prevForm.sections).slice(0, index + 1).concat(newSection).concat((prevForm.sections).slice(index + 1));
            return { ...prevForm, sections: updatedSections };
        })
    }

    const onAddAfterQuestion = (questionId: string, sectionId: string, index: number) => {
        setForm((prevForm) => {
            const updatedSections = prevForm.sections?.map((section) => {
                const currPosition = (prevForm.sections[index - 1].position + prevForm.sections[index + 1].position) / 2;
                if (section.id === sectionId) {
                    const newQuestion = {
                        id: questionId,
                        sectionId: sectionId,
                        required: false,
                        questionType: "multiple-choice",
                        description: "untitled description",
                        position: currPosition,
                    }
                    return { ...section, questions: [...(section.questions || []), newQuestion] };
                }
                return section;
            });
            return { ...prevForm, sections: updatedSections };
        });
    }

    const onAddQuestion = (questionId: string, sectionId: string) => {
        setForm((prevForm) => {
            const updatedSections = prevForm.sections?.map((section) => {
                if (section.id === sectionId) {
                    const newQuestion = {
                        id: questionId,
                        sectionId: sectionId,
                        required: false,
                        questionType: "multiple-choice",
                        description: "untitled description",
                        position: section.questions ? section.questions.length * 1000 : 1000,
                    }
                    return { ...section, questions: [...(section.questions || []), newQuestion] };
                }
                return section;
            });
            return { ...prevForm, sections: updatedSections };
        });
    }

    const onQuestionChange = (question: Question) => {
        setForm((prevForm) => {
            const updatedQuestions = prevForm.sections?.flatMap((section) => {
                if (section.id === question.sectionId) {
                    return section.questions?.map((q) => q.id === question.id ? question : q) || [];
                }
                return section.questions || [];
            });
            return { ...prevForm, questions: updatedQuestions };
        });
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


    return {
        form, onChange, 
        onAddSection, onAddQuestion,
        onQuestionChange, onSectionChange, 
        onAddAfterQuestion, onAddAfterSection,
        useDeleteForm, 
        isLoading, error
    };
}

export function useFormAutoSave(form: Form) {
    const [sync, setSync] = useState(false);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setSync(true);
            updateForm(form)
                .finally(() => setSync(false))
        }, 500)

        return () => clearTimeout(timeOut);
    }, [form.title, form.description, form.isQuiz, form.isPublished, form.id, form.sections])

    return { sync };
}
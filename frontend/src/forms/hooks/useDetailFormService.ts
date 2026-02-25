import React, { useEffect, useState } from "react";
import { type Form, type Question } from "../service/form-component.type";
import type { AppError } from "../../errorHandling/errorType";
import { deleteForm, getFormById, updateForm } from "../service/form.service";
import { useNavigate } from "react-router-dom";
import { type Section } from "../service/form-component.type";
import { createSection, rebalanceSection } from "../../section/section.service";
import { createQuestion, rebalanceQuestion } from "../../question/question.service";
import { type QuestionActiveComponent, type SectionActiveComponent } from "../service/form-component.type";

export function useDetailFormService(formId: string, setQuestionActive: React.Dispatch<React.SetStateAction<QuestionActiveComponent>>, 
    setSectionActive: React.Dispatch<React.SetStateAction<SectionActiveComponent>>) {
    const navigate = useNavigate();
    const [form, setForm] = useState<Form>({} as Form);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AppError | null>(null);
    console.log(form);

    const onChange = (form: Form) => {
        setForm(form);
    }

    const onSectionChange = (section: Section) => {
        setForm((prevForm) => {
            const updatedSections = prevForm.sections?.map((s) => s.id === section.id ? section : s);
            return { ...prevForm, sections: updatedSections };
        });
    }

    const onAddAfterSection = async (index: number) => {
        const currPosition = index === form.sections.length || form.sections.length < 2 ?   
                index * 1000 + 1000 :
                (form.sections[index].position + form.sections[index + 1].position) / 2;

        const newSectionId = await createSection(form.id, currPosition);
        setSectionActive({ sectionIndex: index + 1 });

        if (form.sections.length >= 2 && form.sections[index + 1].position - form.sections[index].position <= 4 && index != form.sections.length - 1) {
            rebalanceSection(form.id)
        }

        setForm((prevForm) => {
            const newSection: Section = {
                id: newSectionId,
                title: "untitled section",
                description: "untitled description",
                position: currPosition,
                questions: [],
            }
            const updatedSections = (prevForm.sections).slice(0, index + 1).concat(newSection).concat((prevForm.sections).slice(index + 1));
            return { ...prevForm, sections: updatedSections };
        })
    }

    const onAddAfterQuestion = async (sectionId: string, index: number) => {
        const section = form.sections.find((s) => s.id === sectionId);
        if(!section) return;
        const currPosition = !section.questions || section.questions.length === index || section.questions?.length < 2?
            index * 1000 + 1000 :
            (section.questions[index].position + section.questions[index + 1].position) / 2;

        const question = await createQuestion(currPosition, sectionId);
        const id = question.id;
        setQuestionActive({ questionIndex: index + 1, sectionId: sectionId });

        if(section.questions && section.questions.length >= 2 && section.questions[index + 1].position - section.questions[index].position <= 4) {
            rebalanceQuestion(sectionId);
        }


        setForm((prevForm) => {
            const updatedSections = prevForm.sections?.map((section) => {
                if (section.id === sectionId) {
                    const newQuestion = {
                        id: id,
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
        onQuestionChange, onSectionChange,
        onAddAfterQuestion, onAddAfterSection,
        useDeleteForm,
        isLoading, error
    };
}

export function useFormAutoSave(form: Form, setSync: React.Dispatch<React.SetStateAction<boolean>>) {

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setSync(true);
            updateForm(form)
                .finally(() => setSync(false))
        }, 500)

        return () => clearTimeout(timeOut);
    }, [form.title, form.description, form.isQuiz, form.isPublished, form.id, form.sections])
}
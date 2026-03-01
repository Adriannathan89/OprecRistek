import { use, useEffect, useRef, useState } from "react";
import FormHeader from "../components/common/formHeader";
import { Textarea } from "../components/ui/textarea";
import { useDetailFormService, useFormAutoSave } from "./hooks/useDetailFormService";
import FormNavbar from "../components/common/formNavbar";
import type { QuestionActiveComponent, SectionActiveComponent } from "./service/form-component.type";

export default function FormDetailPage() {
    const formId = window.location.pathname.split("/form/")[1];
    const [sync, setSync] = useState(false);

    const [questionActive, setQuestionActive] = useState<QuestionActiveComponent>({} as QuestionActiveComponent);
    const [sectionActive, setSectionActive] = useState<SectionActiveComponent>({} as SectionActiveComponent);
        const { form, onChange, onSectionChange, onQuestionChange, onAddAfterQuestion, onAddAfterSection, isLoading, error } = 
        useDetailFormService(formId, setQuestionActive, setSectionActive);

    const formTitleref = useRef<HTMLTextAreaElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if(form.sections && form.sections.length > 0) {
        setQuestionActive({ questionIndex: 0, sectionId: form.sections[0].id });
        setSectionActive({ sectionIndex: 0 });
        }
    }, [form])

    useFormAutoSave(form, setSync);

    const resize = (ref: HTMLTextAreaElement | null) => {
        const el = ref;
        if(!el) return;

        if(!el.value) {
            el.style.height = "auto";
            el.style.height = ref === formTitleref.current ? "52px" : "30px";
            return
        } 

        el.style.height = "auto";
        el.style.height =  el.scrollHeight + "px";
    }
    useEffect(() => {
        resize(formTitleref.current);
    }, [form.title])
    useEffect(() => {
        resize(descriptionRef.current);
    }, [form.description])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error && error.statusCode != 404) {
        return <p>error bang</p>
    }

    return (
        <>
            <FormHeader isLogin={true} sync={sync} />
            <div className="flex w-full h-screen bg-gray-200 justify-center gap-[40px]">
                <div className="w-[700px] mt-[40px]">
                    <div className="w-full min-h-[200px] h-auto border-1 border-gray-200 shadow-md bg-white rounded-lg p-4 m-4 
                        border-t-[7px] border-blue-500">
                        <div className="relative w-full">
                        <Textarea
                            ref={formTitleref}
                            className="resize-none text-xl overflow-hidden break-words whitespace-pre-wrap focus:outline-none peer border-b-2 border-gray-200"
                            placeholder="untitled"
                            value={form.title}
                            onChange={(e) => onChange({ ...form, title: e.target.value })}
                        />
                        <span
                            className="pointer-events-none absolute bottom-[5px] left-0 h-0.5 w-full bg-[#6775f0] scale-x-0 origin-center
                                    transition-all duration-300 ease-out peer-focus:scale-x-100" />
                        </div>

                        <div className="relative w-full mt-[20px]">
                        <Textarea
                            ref={descriptionRef}
                            className="min-h-[30px] resize-none text-sm overflow-hidden break-words whitespace-pre-wrap focus:outline-none peer border-b-2 border-gray-200"
                            placeholder="Form Description"
                            value={form.description}
                            onChange={(e) => onChange({ ...form, description: e.target.value })}
                        />
                        <span
                            className="pointer-events-none absolute bottom-[5px] left-0 h-0.5 w-full bg-[#6775f0] scale-x-0 origin-center
                                    transition-all duration-300 ease-out peer-focus:scale-x-100" />
                        </div>
                    </div>
                </div>

                <FormNavbar onAddQuestion={() => onAddAfterQuestion(questionActive.sectionId, questionActive.questionIndex)} 
                onAddSection={() => onAddAfterSection(sectionActive.sectionIndex)} />
            </div>
        </>
    )
}
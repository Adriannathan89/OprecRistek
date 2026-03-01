import { useEffect, useRef, useState } from "react";
import FormHeader from "../components/common/formHeader";
import { Textarea } from "../components/ui/textarea";
import { useDetailFormService, useFormAutoSave } from "./hooks/useDetailFormService";
import FormNavbar from "../components/common/formNavbar";
import type { QuestionActiveComponent, SectionActiveComponent } from "./service/form-component.type";
import SectionArea from "../section/sectionArea";
import { Toaster } from "../components/ui/toaster";

export default function FormDetailPage() {
    const formId = window.location.pathname.split("/form/")[1];
    const [sync, setSync] = useState(false);

    const [questionActive, setQuestionActive] = useState<QuestionActiveComponent>({} as QuestionActiveComponent);
    const [sectionActive, setSectionActive] = useState<SectionActiveComponent>({} as SectionActiveComponent);
    const { form, onChange, onSectionChange, onQuestionChange, onAddAfterQuestion, onAddAfterSection, onDeleteCurrentQuestion, onDeleteCurrentSection, isLoading, error } =
        useDetailFormService(formId, setQuestionActive, setSectionActive);


    const formTitleref = useRef<HTMLTextAreaElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (form.sections && form.sections.length > 0) {
            setQuestionActive({ questionIndex: -1, sectionId: form.sections[0].id });
            setSectionActive({ sectionIndex: 0 });
        }
        if(form.sections && form.sections.length === 0) {
            setSectionActive({ sectionIndex: -1 });
        }
    }, [form.id])

    useFormAutoSave(form, setSync);

    const resize = (ref: HTMLTextAreaElement | null) => {
        const el = ref;
        if (!el) return;

        if (!el.value) {
            el.style.height = "auto";
            el.style.height = ref === formTitleref.current ? "52px" : "30px";
            return
        }

        el.style.height = "auto";
        el.style.height = (el.scrollHeight - 10) + "px";
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
            <Toaster />
            <FormHeader form={form} isLogin={true} sync={sync} onChange={onChange}/>
            <div className="flex w-full min-h-screen h-auto bg-gray-200 justify-center gap-[40px]">
                <div className="w-[700px] mt-[40px]">
                    <div className="w-full min-h-[200px] h-auto border-1 border-gray-200 shadow-md bg-white rounded-lg p-4 m-4 
                        border-t-[7px] border-blue-500">
                        <div className="relative w-full">
                            <Textarea
                                ref={formTitleref}
                                className="resize-none text-xl overflow-hidden break-words whitespace-pre-wrap focus:outline-none peer border-b-2 border-gray-200"
                                placeholder="untitled Form"
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
                    {form.sections && form.sections.map((section, index) => (
                        <div key={index} className="flex flex-col relative">
                            <div className="absolute top-0 left-4">
                                <div className="w-[92px] h-[32px] bg-blue-500 text-white rounded-t-md">
                                    <p className="py-1 px-3">Section {index + 1}</p>
                                </div>
                            </div>
                            <SectionArea
                                section={section}
                                sectionActiveComponent={sectionActive}
                                questionActive={questionActive}
                                indexSection={index}
                                totalSection={form.sections ? form.sections.length : 0}
                                onQuestionDelete={onDeleteCurrentQuestion}
                                onSectionDelete={onDeleteCurrentSection}
                                onQuestionChange={onQuestionChange}
                                setQuestionActive={setQuestionActive}
                                onClick={() => {
                                    setQuestionActive({sectionId: section.id, questionIndex: section.questions && section.questions.length > 0 ? 0 : -1})
                                    setSectionActive({ sectionIndex: index })}}
                                onChange={(section) => onSectionChange(section)}
                                setSync={setSync}
                                setSectionActive={setSectionActive}
                            />
                        </div>
                    ))}
                </div>
                <FormNavbar onAddQuestion={() => {
                    onAddAfterQuestion(form.sections[sectionActive.sectionIndex].id, questionActive.questionIndex)
                    setQuestionActive({sectionId: questionActive.sectionId, questionIndex: questionActive.questionIndex + 1})
                }}
                    onAddSection={() => {
                        onAddAfterSection( sectionActive.sectionIndex )
                        setSectionActive({ sectionIndex: sectionActive.sectionIndex + 1})
                        setQuestionActive({...questionActive, questionIndex: -1})
                    }} />
            </div>
        </>
    )
}
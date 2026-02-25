import { type Question, type QuestionActiveComponent, type Section, type SectionActiveComponent } from "../forms/service/form-component.type";
import { Textarea } from "../components/ui/textarea";
import { useEffect, useRef } from "react";
import { useSectionAutoSave } from "./useSectionAutoSave";
import QuestionArea from "../question/questionArea";


interface SetionAreaProps {
    section: Section;
    sectionActiveComponent: SectionActiveComponent;
    questionActive: QuestionActiveComponent;
    indexSection: number;
    setQuestionActive: React.Dispatch<React.SetStateAction<QuestionActiveComponent>>;
    onChange: (section: Section) => void;
    onQuestionChange: (question: Question) => void;
    onClick: () => void;
    setSync: React.Dispatch<React.SetStateAction<boolean>>;
    onSectionDelete: (sectionId: string) => void;
    onQuestionDelete: (sectionId: string, questionId: string, questionLength: number, index: number) => void;
    setSectionActive: React.Dispatch<React.SetStateAction<SectionActiveComponent>>;
}

export default function SectionArea({ section, sectionActiveComponent, questionActive, indexSection, setQuestionActive, onChange, onQuestionChange, 
    onClick, setSync, onSectionDelete, onQuestionDelete, setSectionActive }: SetionAreaProps) {

    const sectionTitleref = useRef<HTMLTextAreaElement>(null);
    const sectionDescriptionRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        resize(sectionTitleref.current);
    }, [section.title])
    useEffect(() => {
        resize(sectionDescriptionRef.current);
    }, [section.description])

    const resize = (ref: HTMLTextAreaElement | null) => {
        const el = ref;
        if(!el) return;

        if(!el.value) {
            el.style.height = "auto";
            el.style.height = ref === sectionTitleref.current ? "52px" : "30px";
            return
        } 

        el.style.height = "auto";
        el.style.height =  (el.scrollHeight-10) + "px";
    }
    useSectionAutoSave(section, setSync);

    return (
        <>
            <div 
            onClick={onClick}
            className="w-full min-h-[200px] h-auto mt-[10px]">
                <div className="w-full min-h-[200px] h-auto border-1 border-gray-200 shadow-md bg-white rounded-b-md p-4 m-4 
                        border-t-[7px] border-blue-500">
                    <div className="relative w-full">
                        <Textarea
                            ref={sectionTitleref}
                            className="resize-none text-xl overflow-hidden break-words whitespace-pre-wrap focus:outline-none peer border-b-2 border-gray-200"
                            placeholder="untitled Section"
                            value={section.title}
                            onChange={(e: any) => onChange({ ...section, title: e.target.value })}
                        />
                        <span
                            className="pointer-events-none absolute bottom-[5px] left-0 h-0.5 w-full bg-[#6775f0] scale-x-0 origin-center
                                    transition-all duration-300 ease-out peer-focus:scale-x-100" />
                    </div>

                    <div className="relative w-full mt-[20px]">
                        <Textarea
                            ref={sectionDescriptionRef}
                            className="min-h-[30px] resize-none text-sm overflow-hidden break-words whitespace-pre-wrap focus:outline-none peer border-b-2 border-gray-200"
                            placeholder="description (Optional)"
                            value={section.description}
                            onChange={(e: any) => onChange({ ...section, description: e.target.value })}
                        />
                        <span
                            className="pointer-events-none absolute bottom-[5px] left-0 h-0.5 w-full bg-[#6775f0] scale-x-0 origin-center
                                    transition-all duration-300 ease-out peer-focus:scale-x-100" />
                    </div>
                </div>
            </div>
            
            {
                section.questions && section.questions.map((question, index) => (
                    <QuestionArea 
                    onQuestionDelete={() => onQuestionDelete(section.id, question.id, section.questions ? section.questions.length : 0, index)}
                    key={index} 
                    question={question} 
                    isActive={questionActive.questionIndex === index && questionActive.sectionId === section.id}
                    onClick={() => {
                        setQuestionActive({sectionId: section.id, questionIndex: index})
                        setSectionActive({sectionIndex: indexSection})
                    }} 
                        
                    setSync={setSync} 
                    onQuestionChange={onQuestionChange}
                    />
                ))

            }
        </>
    );
}
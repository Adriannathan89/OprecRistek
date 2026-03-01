import type React from "react";
import type { Question } from "../forms/service/form-component.type";
import { useQuestionAutoSave } from "./useQuestionAutoSave";
import { Textarea } from "../components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import FooterQuestionCard from "../components/card/footerQuestionCard";
import QuestionEditor from "./questionEditor";
import QuestionAnswerEditor from "./questionAnswerEditor";

interface QuestionAreaProps {
    question: Question;
    isActive: boolean;
    disabled: boolean;
    onQuestionChange: (question: Question) => void;
    onClick: () => void;
    setSync: React.Dispatch<React.SetStateAction<boolean>>;
    onQuestionDelete: () => void;
}


export default function QuestionArea({ question, isActive, disabled, onQuestionChange, onClick, setSync, onQuestionDelete }: QuestionAreaProps) {
    useQuestionAutoSave(question, setSync);

    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [editAnswerMode, setEditAnswerMode] = useState(false);

    const resize = (ref: HTMLTextAreaElement | null) => {
        const el = ref;
        if (!el) return;

        if (!el.value) {
            el.style.height = "auto";
            el.style.height = "40px";
            return
        }

        el.style.height = "auto";
        el.style.height = (el.scrollHeight - 10) + "px";
    }
    useEffect(() => {
        resize(descriptionRef.current);
    }, [question.description])

    return (
        <>
            <div onClick={onClick} className="w-full min-h-[100px] h-auto">
                <div className={"w-full min-h-[100px] h-auto border-1 border-gray-200 shadow-md bg-white rounded-lg p-4 m-4 border-l-[10px]"
                        + (isActive ? " border-blue-800" : " border-transparent")}>

                    
                    <div className="flex gap-[40px]">
                    <div className="relative w-[500px] mt-[20px]">
                        <Textarea
                            ref={descriptionRef}
                            className="h-[30px] resize-none overflow-hidden break-words whitespace-pre-wrap focus:outline-none peer border-b-2 border-gray-200"
                            placeholder="Form Description"
                            disabled={disabled}
                            value={question.description}
                            onChange={(e) => onQuestionChange({ ...question, description: e.target.value })}
                        />
                        <span
                            className="pointer-events-none absolute bottom-[5px] left-0 h-0.5 w-full bg-[#6775f0] scale-x-0 origin-center
                                    transition-all duration-300 ease-out peer-focus:scale-x-100" />
                    </div>
                    {isActive && !disabled &&
                    <select
                        className="outline-none focus:outline-none"
                        value={question.questionType}
                        onChange={(e) => onQuestionChange({ ...question, questionType: e.target.value, options: [], answers: [] })}
                    >
                        <option disabled={question.questionType === "multiple-choice"} value="multiple-choice">Multiple Choice</option>
                        <option disabled={question.questionType === "short-answer"} value="short-answer">Short Answer</option>
                        <option disabled={question.questionType === "check-box"} value="check-box">Checkbox</option>
                        <option disabled={question.questionType === "dropdown"} value="dropdown">Dropdown</option>
                    </select>
                    }
                    </div>
                    {!editAnswerMode ?
                        <QuestionEditor disabled={disabled} question={question} isActive={isActive} onChange={onQuestionChange} /> :
                        <QuestionAnswerEditor disabled={disabled} question={question} isActive={isActive} onChange={onQuestionChange} />
                    }
                    {isActive && !disabled && <FooterQuestionCard 
                    question={question} 
                    onQuestionDelete={onQuestionDelete} 
                    onQuestionChange={onQuestionChange}
                    setEditAnswerMode={setEditAnswerMode} />}
                </div>
            </div>
        </>
    )
}
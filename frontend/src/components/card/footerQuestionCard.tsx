import { Trash } from "lucide-react";
import type { Question } from "../../forms/service/form-component.type";

interface FooterQuestionCardProps {
    question: Question;
    onQuestionDelete: () => void;
    onQuestionChange: (question: Question) => void;
}

export default function FooterQuestionCard({question, onQuestionDelete, onQuestionChange }: FooterQuestionCardProps) {
    const on = question.required;

    return (
        <div className="flex justify-between w-full">
            <div>
                
            </div>
            <div className="flex gap-[24px]">
                <button onClick={e => {
                    e.stopPropagation()
                    onQuestionDelete();
                }}
                    className="cursor-pointer border-r-2 pr-[16px]">
                    <Trash size={20} />
                </button>
                <div className="flex text-gray-500">
                <p>{on ? "required" : "optional"}</p>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onQuestionChange({...question, required: !question.required});
                    }}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ml-[8px]
                ${on ? "bg-indigo-600" : "bg-gray-300"}`}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${on ? "translate-x-6" : "translate-x-1"}`}
                    />
                </button>
                </div>
            </div>
        </div>
    )
}
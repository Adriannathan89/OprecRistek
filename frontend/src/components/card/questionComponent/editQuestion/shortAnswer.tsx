import type { Question } from "../../../../forms/service/form-component.type";

export interface QuestionMakerProp {
    question: Question
    isActive: boolean;
    disabled: boolean;
    onChange: (question: Question) => void;
}


export default function ShortAnswer() {
    return(
        <div className="px-5 py-2">
            <p className="text-sm text-gray-600">Short answer text</p>
            <p className="text-sm text-gray-400">...............................................................................................................................</p>
        </div>
    )
}
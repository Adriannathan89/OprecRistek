import { useEffect, useState } from "react";
import type { Answer, Question } from "../../../../forms/service/form-component.type";

export default function EditAnswerMultipleChoice({ question, isActive, disabled, onChange }: { question: Question, isActive: boolean, disabled: boolean, onChange: (question: Question) => void }) {
    const answers: Answer[] = question.answers || [];
    const [oldId, setOldId] = useState<string>("")
    
    useEffect(() => {
        setOldId(answers.find((ans) => ans.isActive)?.id || "")
    }, [isActive])

    return (
        <div className="py-1 w-full mt-[12px]">
            {answers.map((answer, index) => (
                <div
                    key={index}
                    className={"flex gap-3 mb-[20px]" + (answer.isActive ? " bg-green-100 p-2 rounded" : "")}
                    onClick={() => {
                        if (!isActive || disabled) return
                        onChange({
                            ...question, answers: answers.map((ans) => {
                                if (ans.id === answer.id) {
                                    setOldId(ans.id)
                                    return { ...ans, isActive: true }
                                } else if (ans.id === oldId) {
                                    return { ...ans, isActive: false }
                                }
                                return ans;
                            })
                        })
                    }}
                >
                    <input className={"w-[24px] h-[24px]" + (answer.isActive ? "mt-[8px]" : "mt-[12px]")} type="radio" checked={answer.isActive} disabled={disabled} />
                    <p className={"flex text-gray-600" + (answer.isActive ? "mt-[8px]" : "mt-[12px]")} >{answer.description}</p>
                </div>
            ))}
        </div>
    )
}
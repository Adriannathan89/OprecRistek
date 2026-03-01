import type { Answer, Question } from "../../../../forms/service/form-component.type";

export default function EditAnswerCheckbox({question, isActive, onChange} : {question: Question, isActive: boolean, onChange: (question: Question) => void}) {
    const answers: Answer[] = question.answers || [];

    return(
        <div className="py-1 w-full mt-[12px]">
            {answers.map((answer, index) => (
                <div 
                key={index} 
                className={"flex gap-3 mb-[20px]" + (answer.isActive ? " bg-green-100 p-2 rounded" : "")}
                onClick={() => {
                    if(!isActive) return
                    onChange({...question, answers: answers.map((ans) => ans.id === answer.id ? {...ans, isActive: !ans.isActive} : ans)})}
                }
                >
                    <input className={"w-[24px] h-[24px]" + (answer.isActive ? "mt-[8px]" : "mt-[12px]")} type="checkbox" checked={answer.isActive}/>
                    <p className={"flex text-gray-600" + (answer.isActive ? "mt-[8px]" : "mt-[12px]")} >{answer.description}</p>
                </div>
            ))}
        </div>
    )
}
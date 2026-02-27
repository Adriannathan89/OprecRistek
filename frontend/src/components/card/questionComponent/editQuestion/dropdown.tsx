import type { QuestionMakerProp } from "./shortAnswer";
import UseEditQuestionProps from "../../../../question/useEditQuestionProps";
import type { Answer } from "../../../../forms/service/form-component.type";
import type { Option } from "../../../../forms/service/form-component.type";

export default function DropdownAnswer({question, isActive, onChange}: QuestionMakerProp) {
    const options: Option[] = question.options || [];
        const answers: Answer[] = question.answers || [];
        const { updateOptionAndAnswer, addNew, deleteOptions } = UseEditQuestionProps(question, onChange);
    
        return (
            <div className="flex flex-col gap-2 mt-[16px] mb-[20px] ">
                {options.map((option, index) => (
                    <div key={option.id} className="flex gap-2">
                        <div className="relative w-full flex gap-[12px]">
                        <p className="flex items-center text-gray-600 text-sm">{index + 1}.</p>
                        <input 
                            type="text"
                            value={option.description}
                            onChange={(e) => {
                                updateOptionAndAnswer(options, answers, option.id, e.target.value)
                            }}
                            className="p-2 border-b-2 border-gray-200 w-[600px] focus:outline-none outline-none peer
                            text-gray-600 "
                        />
                        <span
                        className="w-[599px] pointer-events-none absolute bottom-[0px] left-6 h-0.5 w-full bg-[#6775f0] scale-x-0 origin-center
                            transition-all duration-300 ease-out peer-focus:scale-x-100" />
                        {isActive &&
                        <button className="absolute bottom-2 right-5 text-xl text-gray-400" 
                        onClick={() => deleteOptions(option.id)}>x</button>}
                        </div>
                    </div>
                ))}
                <div className="flex gap-2 mt-[8px]">
                    <p className="flex items-center text-gray-600 text-sm">{options.length + 1}.</p>
                    <button className="cursor-pointer w-[72px] border-b-2 border-gray-200 text-xs px-[4px] text-gray-400" 
                    onClick={() => addNew(options, answers)}>Add Option</button>
                </div>
            </div>
        )
}
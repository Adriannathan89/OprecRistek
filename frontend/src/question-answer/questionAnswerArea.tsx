import type { QuestionResponder, UserAnswer, UserTakingForm } from "../formAnswer/formAnswerTypes"
import { useUpdateUserAnswer } from "../formAnswer/useFormAnswerService";

interface QuestionAnswerAreaProps {
    question: QuestionResponder;
    userTakingForm: UserTakingForm;
    onChange: (answer: string | string[] | number | boolean, answerId: string) => void;
    setSyncing: React.Dispatch<React.SetStateAction<boolean>>;
    setError: React.Dispatch<React.SetStateAction<any>>;
}

export default function QuestionAnswerArea({ question, userTakingForm, onChange, setSyncing, setError }: QuestionAnswerAreaProps) {
    const options = question.options || [];
    const answerDetail: UserAnswer = userTakingForm.userAnswers?.find(ans => ans.questionId === question.id) as UserAnswer;
    const userAnswer = answerDetail?.userAnswer

    useUpdateUserAnswer({answerDetail, setSyncing, setError});

    const multipleChoiceComponent = (
        <div className="px-2 py-8">
            {options.map((option) => (
                <div className="flex items-center mb-2 gap-[12px]" key={option.id}>
                    <input type="radio" name={question.id}
                        className="w-[20px] h-[20px]"
                        checked={userAnswer === option.description}
                        onChange={() => onChange(option.description, option.id)} />
                    <p>{option.description}</p>
                </div>
            ))}
        </div>
    )

    const checkboxComponent = (
        <div className="px-2 py-8">
            {options.map((option) => (
                <div className="flex items-center mb-2 gap-[12px]" key={option.id}>
                    <input type="checkbox"
                        className="w-[16px] h-[16px]"
                        name={question.id}
                        value={option.description}
                        checked={Array.isArray(userAnswer) && userAnswer.includes(option.description)} onChange={(e) => {
                            const checked = e.target.checked;
                            onChange(checked ? [...(Array.isArray(userAnswer) ? userAnswer : []), option.description] : (Array.isArray(userAnswer) ? userAnswer.filter((opt) => opt !== option.description) : []), option.id);
                        }} />
                    <p className="ml-2">{option.description}</p>
                </div>
            ))}
        </div>
    )

    const dropdownComponent = (
        <div className="px-2 py-8">
        <select 
        className="w-[400px] p-2 border border-gray-300 rounded-md"
        value={userAnswer as string || "select an option"} 
        onChange={(e) => onChange(e.target.value, e.target.options[e.target.selectedIndex].dataset.id || "")}>
            <option value="select an option">Select an option</option>
            {options.map((option) => (
                <option key={option.id} value={option.description} data-id={option.id}>{option.description}</option>
            ))}
        </select>
        </div>
    )

    const shortAnswerComponent = (
        <div className="px-2 py-8">
            <input
                className="w-full p-2 border border-gray-400 focus:outline-none rounded-md" type="text"
                value={userAnswer as string || ''}
                onChange={(e) => onChange(e.target.value, "")} />
        </div>
    )

    return (
        <div className="w-[600px] h-[300px] bg-white border border-gray-300 rounded-lg p-6 mb-[24px]">
            <p>{question.description} {question.required && <span style={{ color: 'red' }}>*</span>}</p>
            {question.questionType === "multiple-choice" && multipleChoiceComponent}
            {question.questionType === "check-box" && checkboxComponent}
            {question.questionType === "dropdown" && dropdownComponent}
            {question.questionType === "short-answer" && shortAnswerComponent}
        </div>
    )
}

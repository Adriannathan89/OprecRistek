import { useParams } from "react-router-dom";
import { useFormResponseService } from "./useFormResponseService";
import { Card } from "../components/ui/card";
import Header from "../components/common/header";

export default function FormResponsePage() {
    const { formId, userTakingFormId } = useParams<{ formId: string, userTakingFormId: string }>();
    const { formResponse, questions, userAnswersResponse, title } = useFormResponseService(String(formId), String(userTakingFormId));

    return (
        <>
        <Header isLogin={true} />
        <div className="flex flex-col items-center py-10">
            <Card className="w-[600px] h-[200px] flex flex-col mt-[20px] border border-gray-300 rounded-lg p-6 shadow-md">
                <h3 className="flex justify-center text-2xl font-bold">{title}</h3>
                <h2 className="flex justify-start text-lg mt-2">Form Response</h2>
                <div className="flex justify-end mt-2 border-t border-gray-300 pt-2">
                    <div className="w-[100px] h-[28px] px-2 py-1 bg-blue-500 text-white mr-4 rounded-lg flex items-center justify-center mt-[20px]">
                        score: {formResponse?.score} / {formResponse?.fullScore}
                    </div>
                </div>
            </Card>
            {questions?.map((question, index) => (
                <Card key={index} className="w-[600px] h-auto flex flex-col mt-[20px] border border-gray-300 rounded-lg p-6 shadow-md">
                    <p className="flex justify-start text-gray-600 mt-2">{question.description}</p>
                    <div className="flex flex-col justify-end mt-2 border-t border-gray-300 pt-2">
                        {question.options?.map((option) => {
                            const allAnswers = question.answers?.filter((correctAnswer) => {
                                if (Array.isArray(correctAnswer)) {
                                    return correctAnswer.id.includes(option.id) && correctAnswer.isActive;
                                }
                                return correctAnswer.id === option.id && correctAnswer.isActive;
                            });
                            const isChecked = userAnswersResponse?.some((answer) =>
                                answer.questionId === question.id &&
                                (Array.isArray(answer.answerId) ? answer.answerId.includes(option.id) : answer.answerId === option.id)
                            );
                            return (
                                <div className="flex p-2" key={option.id}>
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        readOnly
                                        className="w-[16px] h-[16px] mr-2 mt-1"
                                    />
                                    <p className="text-gray-700">{option.description}</p>
                                    <div>
                                        {allAnswers?.map((answer) => {
                                            if (Array.isArray(answer.id) && answer.id.includes(option.id)) {
                                                return <span className="ml-2 text-green-500">✓</span>;
                                            } else if (answer.id === option.id) {
                                                return <span className="ml-2 text-green-500">✓</span>;
                                            }
                                            return null;
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            ))}
        </div>
        </>
    )
}
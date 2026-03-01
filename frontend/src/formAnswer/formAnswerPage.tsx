import { useParams } from "react-router-dom"
import { useFetchSectionResponder, useFormAnswerService } from "./useFormAnswerService"
import QuestionAnswerArea from "../question-answer/questionAnswerArea";
import NavigationAnswer from "../question-answer/navigationAnswer";
import { useState } from "react";
import FormAnswerHeader from "../components/common/formAnswerHeader";

export default function FormAnswerPage() {
    const { formId, sectionPosition } = useParams<{
        formId: string;
        sectionPosition: string;
    }>();
    const [syncing, setSyncing] = useState(false);
    const sectionIndex = Number(sectionPosition) - 1;

    const { formResponder, userTakingForm, isLoading, error, onUpdateUserAnswer, setIsLoading, setError } = useFormAnswerService(String(formId))

    const sectionId = formResponder?.sectionsId?.[sectionIndex];


    const { sectionResponder } = useFetchSectionResponder(
        sectionId,
        setIsLoading,
        setError
    )

     if (error && error.statusCode !== 404) {
        return <div>Error: {error.message}</div>
    }
    
    if(!userTakingForm || !formResponder) {
        return <div>Loading...</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <FormAnswerHeader sync={syncing} isLogin={true} />
            <div className="flex flex-col items-center w-full min-h-screen h-auto bg-gray-300">
                <div className="w-[600px] h-[240px] bg-white mt-[20px] border border-gray-300 rounded-lg p-6">
                    <h2 className="flex flex-wrap break-all whitespace-normal text-2xl font-bold mb-4">{formResponder.title}</h2>
                    <p className="text-xl text-gray-600 mb-4">{formResponder.description}</p>
                </div>

                <div className="relative mt-[20px]">
                <div className="absolute top-0 border bg-blue-500 text-white p-2 rounded-tl-lg rounded-tr-lg">
                    <p className="font-semibold">Section {sectionIndex + 1} of {formResponder.sectionsId?.length}</p>
                </div>
                <div className="w-[600px] h-[200px] bg-white mt-[41px] border border-gray-300 rounded-tr-lg rounded-b-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">{sectionResponder?.title}</h3>
                    <p className="text-gray-600">{sectionResponder?.description}</p>
                </div>
                </div>

                <div className="flex flex-col mt-[24px]">
                    {sectionResponder?.questions?.map((question) => (
                        <QuestionAnswerArea 
                        setSyncing={setSyncing}
                        setError={setError}
                        key={question.id}
                        question={question}
                        userTakingForm={userTakingForm}
                        onChange={(answerValue, answerId) => {
                            const userAnswer = userTakingForm.userAnswers?.find(ans => ans.questionId === question.id);
                            if (userAnswer) {
                                onUpdateUserAnswer(userAnswer.id, question.id, sectionId as string, answerValue, answerId);
                            } 
                        }}
                        />
                    ))}
                </div>
                <div className="mb-[20px]">
                <NavigationAnswer 
                formId={String(formId)} 
                currIndex={sectionIndex + 1} 
                userTakingFormId={userTakingForm.id}
                isFinished={sectionIndex === (formResponder.sectionsId?.length || 0) - 1}  />
                </div>
            </div>
        </>
    )
}
export default function EditAnswerShortAnswer({ question, isActive, onChange }: { question: any, isActive: boolean, onChange: (question: any) => void }) {
    const answers = question.answers || [];

    return(
        <div>
            {
                answers.map((answer: any, index: number) => (
                    <div key={index} className={"flex gap-3 mb-[20px]"}>
                        <input className="w-[400px] text-gray-500 h-[40px] focus:outline-none outline-none border-b-2 border-gray-200 rounded px-2 py-1" 
                        type="text" 
                        value={answer.description} 
                        onChange={(e) => {
                            onChange({
                                ...question,
                                answers: answers.map((ans: any, i: number) => {
                                    if (i === index) {
                                        return { ...ans, description: e.target.value }
                                    }
                                    return ans;
                                })
                            })
                        }} />
                    </div>
                ))
            }
            <div
            className="px-2 flex gap-2 mt-[8px] text-sm text-gray-400 cursor-pointer border-b-2 border-gray-200 w-[150px]"
            onClick={() => {
                if(!isActive) return
                onChange({...question, answers: [...answers, {id: crypto.randomUUID(), description: "Correct Answer", isActive: true}]})
            }}
            >
                Add a correct answer
            </div>
        </div>
    )
}
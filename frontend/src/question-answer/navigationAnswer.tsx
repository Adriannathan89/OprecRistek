import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

interface NavigationAnswerProps {
    isFinished: boolean;
    currIndex: number;
    formId: string;
    userTakingFormId: string;
}

export default function NavigationAnswer({ isFinished, currIndex, formId, userTakingFormId } : NavigationAnswerProps) {
    const navigate = useNavigate();

    return (
        <div className="mt-4">
            <div className="flex gap-[20px]">
            <Button
            disabled={currIndex <= 1}
            onClick={() => navigate(`/form/${formId}/answer/${currIndex - 1}`)}
            >Prev
            </Button>

            {
            isFinished ? <Button onClick={() => navigate(`/form/${formId}/finish/${userTakingFormId}`)}>Finish</Button> :
            <Button onClick={() => navigate(`/form/${formId}/answer/${currIndex + 1}`)}>Next</Button>
            }
            </div>
        </div>
    )
}
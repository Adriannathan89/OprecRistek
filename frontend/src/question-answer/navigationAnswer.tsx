import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NavigationAnswer({ isFinished, currIndex, formId } : { isFinished: boolean, currIndex: number, formId: string }) {
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
            isFinished ? <Button onClick={() => navigate(`/form/${formId}/finish`)}>Finish</Button> :
            <Button onClick={() => navigate(`/form/${formId}/answer/${currIndex + 1}`)}>Next</Button>
            }
            </div>
        </div>
    )
}
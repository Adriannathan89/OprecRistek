import { type QuestionMakerProp } from "../components/card/questionComponent/editQuestion/shortAnswer";
import EditAnswerMultipleChoice from "../components/card/questionComponent/editAnswer/editAnswerMultileChoice";
import EditAnswerCheckbox from "../components/card/questionComponent/editAnswer/editAnswerCheckbox";
import EditAnswerDropdown from "../components/card/questionComponent/editAnswer/editAnswerDropdown";
import EditAnswerShortAnswer from "../components/card/questionComponent/editAnswer/editAnswerShortAnswer";

export default function QuestionAnswerEditor({ question, isActive, onChange } : QuestionMakerProp) {
    const renderQuestionType = (type: string) => {
        switch(type) {
            case "multiple-choice":
                return <EditAnswerMultipleChoice question={question} isActive={isActive} onChange={onChange}/>
            case "short-answer":
                return <EditAnswerShortAnswer question={question} isActive={isActive} onChange={onChange}/>
            case "check-box":
                return <EditAnswerCheckbox question={question} isActive={isActive} onChange={onChange} />
            case "dropdown":
                return <EditAnswerDropdown question={question} isActive={isActive} onChange={onChange} />
             default:
                return null;
        }
    }

    return renderQuestionType(question.questionType);
}
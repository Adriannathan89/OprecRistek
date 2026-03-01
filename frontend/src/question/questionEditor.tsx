import MultipleChoiceAnswer from "../components/card/questionComponent/editQuestion/multipleChoice"
import ShortAnswer, { type QuestionMakerProp } from "../components/card/questionComponent/editQuestion/shortAnswer";
import CheckBoxAnswer from "../components/card/questionComponent/editQuestion/checkboxAnswer";
import DropdownAnswer from "../components/card/questionComponent/editQuestion/dropdown";

export default function questionEditor({ question, isActive, disabled, onChange } : QuestionMakerProp) {
    const renderQuestionType = (type: string) => {
        switch(type) {
            case "multiple-choice":
                return <MultipleChoiceAnswer question={question} isActive={isActive} disabled={disabled} onChange={onChange} />
            case "short-answer":
                return <ShortAnswer />
            case "check-box":
                return <CheckBoxAnswer question={question} isActive={isActive} onChange={onChange} disabled={disabled} />
            case "dropdown":
                return <DropdownAnswer question={question} isActive={isActive} onChange={onChange} disabled={disabled} />
             default:
                return null;
        }
    }

    return renderQuestionType(question.questionType);
}
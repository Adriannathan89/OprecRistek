import { useNavigate } from "react-router-dom";
import type { Form } from "../../forms/service/form-component.type";

export default function FormCard({ form }: { form: Form }) {
    const navigate = useNavigate();

    return(
        <>
        <div className=
        "w-[200px] h-[150px] border-[1px] border-black rounded-sm cursor-pointer hover:border-blue-600 hover:border-[2px] relative"
        onClick={() => {
            navigate(`/form/${form.id}`);
        }}
        >
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-80">
                <p className="font-semibold">{form.title}</p>
                <p className="text-sm mt-2">{form.description}</p>
            </div>
        </div>
        </>
    )
}
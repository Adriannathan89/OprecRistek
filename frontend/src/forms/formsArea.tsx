import AddFormCard from "../components/card/addFormCard";
import FormCard from "../components/card/formCard";
import { useFormService } from "./hooks/useFormService";

export default function FormsArea() {
    const { forms, isLoading, error, useCreateForm } = useFormService();

    if (error && error.statusCode != 404) {
        console.log(error);
        return <p>error bang</p>
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div className="flex justify-between w-full h-[60px] border-b-2 border-gray-200 bg-gray-100 mb-[20px] text-gray-800">
                <div>
                    <p className="ml-[40px] p-4 text-xl">My Forms</p>
                </div>
            </div>
            <div className="flex flex-wrap gap-10 p-4 ml-[40px]">
                <AddFormCard createForm={useCreateForm} />
                {forms.map((form) => (
                    <FormCard key={form.id} form={form} />
                ))}
            </div>
        </>
    )
}
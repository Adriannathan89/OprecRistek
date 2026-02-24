import { useDetailFormService } from "./hooks/useDetailFormService";

export default function FormDetailPage() {
    const formId = window.location.pathname.split("/form/")[1];
    const { form, onChange, useDeleteForm, isLoading, error } = useDetailFormService(formId);
    console.log(form);


    if(error && error.statusCode != 404) {
        return <p>error bang</p>
    }

    return(
        <div>

        </div>
    )
}
import { Navigate, useParams } from "react-router-dom"

export default function WindowHandleLocation() {
    const { formId } = useParams<{ formId: string }>()

    return <Navigate to={`/form/${formId}/answer/1`} replace />
}
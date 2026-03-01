import { useNavigate } from "react-router-dom";
import UserProfieElement from "../elements/userProfileElement";
import { Button } from "../ui/button";
<<<<<<< HEAD

export default function Header({isLogin, sync}: {isLogin: boolean, sync: boolean}) {
    const navigate = useNavigate()
=======
import type { Form } from "../../forms/service/form-component.type";
import { toast } from "../../hooks/use-toast";

export default function Header({form, isLogin, sync, onChange}: {form: Form, isLogin: boolean, sync: boolean, onChange: (form: Form) => void}) {
    const navigate = useNavigate()
    const handlePublish = () => {
        onChange({...form, isPublished: !form.isPublished})
        if(!form.isPublished)
        toast({
            title: "Form Published",
            description: `Your form has been published successfully.\n
            link: localhost:5173/form/${form.id}/answer`,
            duration: 3000,
        })
        else {
            toast({
                title: "Form Unpublished",
                description: `Your form has been unpublished successfully.`,
                duration: 3000,
            })
        }
    }
>>>>>>> c81863ef655d3af2834cf92c07738a97425bacdd

    return(
        <div className="flex justify-between border-b-2 border-gray-300 py-4 shadow-md]">
            <div className="flex items-center text-2xl font-semibold ml-6">
                Ristek Form
                {sync ? <p className="text-sm text-gray-500 ml-6 mt-[1px]">Saving...</p> : 
                <p className="text-sm text-gray-500 ml-6 mt-[1px]">All changes saved</p>}
            </div>
            
<<<<<<< HEAD
            <div className="mr-6">
=======
            <div className="flex gap-[20px] mr-6">
                <Button 
                className="bg-blue-500 hover:bg-blue-600" 
                onClick={() => handlePublish()}>{form.isPublished ? "Unpublish" : "Publish"}</Button>
>>>>>>> c81863ef655d3af2834cf92c07738a97425bacdd
                {isLogin ? (
                    <UserProfieElement userId={String(localStorage.getItem("userId"))} />
                ) : (
                    <Button 
                    onClick={() => navigate("/auth")}
                    className="w-[80px] bg-blue-500 text-white hover:bg-blue-600 rounded-xl">Login</Button>
                )}
            </div>
        </div>
    )
}
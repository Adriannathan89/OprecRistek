import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddFormCard({ createForm }: { createForm: () => Promise<String> }) {
    const navigate = useNavigate();
    
    return(
        <>
            <div className="flex flex-col">
            <div className="flex justify-center items-center w-[200px] h-[150px] border-[1px] border-black 
            rounded-sm cursor-pointer hover:border-blue-600 hover:border-[2px]" 
            onClick={async () => {
                const id = await createForm();
                navigate(`/form/${id}`);
            }}>
                <div className="rounded-full">
                    <Plus className="w-12 h-12 text-gray-500" />
                </div>
            </div>
            <p className="px-2 mt-2 text-light">Blank Form</p>
            </div>
        </>
    )
}
import { Plus } from "lucide-react";

export default function AddFormCard({ createForm }: { createForm: () => Promise<void> }) {
    return(
        <>
            <div className="flex flex-col">
            <div className="flex justify-center items-center w-[200px] h-[150px] border-[1px] border-black 
            rounded-sm cursor-pointer hover:border-blue-600 hover:border-[2px]" 
            onClick={() => createForm()}>
                <div className="rounded-full">
                    <Plus className="w-12 h-12 text-gray-500" />
                </div>
            </div>
            <p className="px-2 mt-2 text-light">Blank Form</p>
            </div>
        </>
    )
}
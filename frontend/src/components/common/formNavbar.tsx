import { BetweenHorizonalStartIcon, Plus } from "lucide-react";

export default function FormNavbar({onAddQuestion, onAddSection}: 
    {onAddQuestion?: () => void, onAddSection?: () => void}) {
    return (
        <div className="sticky top-0 z-50 bg-white shadow-md h-[120px] w-[52px] rounded-xl">
            <div className="flex flex-col items-center h-full gap-[24px]">
                <div className="mt-[24px]">
                    <button className="flex justify-center items-center w-[24px] h-[24px] rounded-full border-2 border-gray-300 hover:bg-gray-100" onClick={onAddQuestion}><Plus size={24} /></button>
                </div>
                <div>
                    <button className="flex justify-center items-center w-[24px] h-[24px] rounded-full border-2 border-gray-300 hover:bg-gray-100" onClick={onAddSection}>
                        <BetweenHorizonalStartIcon size={24} /></button>
                </div>
            </div>
        </div>
    )
}   
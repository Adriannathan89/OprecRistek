import { useNavigate } from "react-router-dom";
import UserProfieElement from "../elements/userProfileElement";
import { Button } from "../ui/button";

export default function FormAnswerHeader({isLogin, sync}: {isLogin: boolean, sync: boolean}) {
    const navigate = useNavigate()

    return(
        <div className="flex justify-between border-b-2 border-gray-300 py-4 shadow-md]">
            <div className="flex items-center text-2xl font-semibold ml-6">
                Ristek Form
                {sync ? <p className="text-sm text-gray-500 ml-6 mt-[1px]">Saving...</p> : 
                <p className="text-sm text-gray-500 ml-6 mt-[1px]">All changes saved</p>}
            </div>
            
            <div className="flex gap-[20px] mr-6">
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
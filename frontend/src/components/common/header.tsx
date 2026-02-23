import { useNavigate } from "react-router-dom";
import UserProfieElement from "../elements/userProfileElement";
import { Button } from "../ui/button";

export default function Header({isLogin}: {isLogin: boolean}) {
    const navigate = useNavigate()

    return(
        <div className="flex justify-between mb-[20px] border-b-2 border-gray-300 py-4">
            <div className="flex items-center text-2xl font-semibold ml-6">Ristek Form</div>
            <div className="mr-6">
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
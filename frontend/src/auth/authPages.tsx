import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useState } from "react";
import LoginElement from "../components/elements/loginElement";
import RegisterElement from "../components/elements/registerElement";
import { useAuthService } from "./useAuthService";

export default function AuthPages() {
    const [isLogin, setIsLogin] = useState(true);
    const { signIn, signUp, onChange, user } = useAuthService();
    
    return(
        <>
            <div className="w-full h-screen flex items-center justify-center">
                {isLogin ? <LoginElement onChange={onChange} signIn={signIn} user={user} /> : 
                <RegisterElement onChange={onChange} signUp={signUp} user={user} setIsLogin={setIsLogin} />}
                <Card className="rounded-r-3xl bg-blue-500 w-[400px] h-[500px] flex flex-col items-center justify-center text-white border-r-2 border-gray-300">
                    <h1 className="text-3xl font-bold mb-4">Welcome {isLogin ? "back!" : ""}</h1>
                    <p className="text-lg">{!isLogin ? "Already have an account?" : "Don't have an account?"}</p>
                    <Button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="mt-4 border-[2px] border-white rounded-2xl 
                    bg-transparent text-white hover:bg-transparent w-[150px]">{isLogin ? "Sign Up" : "Sign In"}</Button>

                </Card>
            </div>
        </>
    )
}
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import type { LoginInfo } from "../../auth/auth.Service"; 
import { Button } from "../ui/button";
import { useRef } from "react";

export default function LoginElement({onChange, signIn, user}: 
    {onChange: (loginInfo: LoginInfo) => void, signIn: (loginInfo: LoginInfo) => void, user: LoginInfo | null}) {
    const nextRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    
    return (
        <Card className="rounded-l-3xl w-[400px] h-[500px] flex flex-col items-center justify-center border-l-2 border-gray-300">
            <p className="text-2xl mb-[20px]">Login</p>
            <div className="flex flex-col gap-[20px] w-full justify-center items-center">
                <Input 
                onChange={(e) => onChange({...user, username: e.target.value} as LoginInfo)}
                value={user?.username}
                onKeyDown={(e) => {
                    if(e.key == "Enter") {
                        nextRef.current?.focus();
                    }
                }}
                className="mt-4 w-80" 
                placeholder="Email / Username" required />

                <Input 
                ref={nextRef}
                onKeyDown={(e) => {
                    if(e.key == "Enter") {
                        buttonRef.current?.click();
                    }
                }}
                onChange={(e) => onChange({...user, password: e.target.value} as LoginInfo)}
                value={user?.password}
                className="mt-4 w-80" 
                placeholder="Password" type="password" required />
            </div>

            <Button ref={buttonRef} className="rounded-3xl px-[4px] py-[4px] w-[120px] bg-blue-500 hover:bg-blue-600 mt-[20px]"
            onClick={() => {
                signIn(user as LoginInfo);
            }}
            >
            Sign In
            </Button>
        </Card>
    )
}
import type { LoginInfo } from "../../auth/auth.Service";
import { Button } from "../ui/button";
import { Card } from "../ui/card"
import { Input } from "../ui/input"
import { useRef, useState } from "react";

export default function RegisterElement({onChange, signUp, user, setIsLogin}: 
    {onChange: (loginInfo: LoginInfo) => void, signUp: (loginInfo: LoginInfo) => void, user: any, setIsLogin: (isLogin: boolean) => void}) {

    const [confirmPassword, setConfirmPassword] = useState("");
    const refInput2 = useRef<HTMLInputElement>(null);
    const refInput3 = useRef<HTMLInputElement>(null);
    const refInput4 = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    return(
        <Card className="rounded-l-3xl w-[400px] h-[500px] flex flex-col items-center justify-center border-l-2 border-gray-300">
            <p className="text-2xl mb-[20px]">SignUp</p>
            <div className="flex flex-col gap-[20px] mb-[20px]">
                <Input 
                onKeyDown={(e) => {
                    if(e.key == "Enter") {
                        refInput2.current?.focus();
                    }
                }}
                onChange={(e) => onChange({...user, username: e.target.value})}
                value={user?.username}
                className="mt-4 w-80" 
                placeholder="Username" required />

                <Input 
                ref={refInput2}
                onKeyDown={(e) => {
                    if(e.key == "Enter") {
                        refInput3.current?.focus();
                    }
                }}
                onChange={(e) => onChange({...user, email: e.target.value})}
                value={user?.email}
                className="mt-4 w-80" 
                placeholder="Email" required />

                <div>
                <Input 
                ref={refInput3}
                onKeyDown={(e) => {
                    if(e.key == "Enter") {
                        refInput4.current?.focus();
                    }
                }}
                onChange={(e) => onChange({...user, password: e.target.value})}
                value={user?.password}
                className="mt-4 w-80" 
                placeholder="Password" type="password" required />
                <p className="ml-2 text-sm text-gray-500">password must have at least 8 characters</p>
                </div>

                <div>
                <Input 
                ref={refInput4}
                onKeyDown={(e) => {
                    if(e.key == "Enter") {
                        buttonRef.current?.click();
                    }
                }}
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
                className="mt-4 w-80" 
                placeholder="Confirm Password" type="password" required />
                <p className="ml-2 text-sm text-gray-500">password must have at least 8 characters</p>
                </div>

            </div>

            <Button ref={buttonRef} className="rounded-3xl px-[4px] py-[4px] w-[120px] bg-blue-500 hover:bg-blue-600" 
            onClick={() => {
                signUp(user);
                setIsLogin(true);
            }}
            disabled={user?.password !== confirmPassword || !user?.username || !user?.email || user?.password.length < 8}
            >
            Sign Up
            </Button>
        </Card>
    )
}
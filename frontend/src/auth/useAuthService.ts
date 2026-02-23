import { useState } from "react";
import { login, register, type LoginInfo } from "./auth.Service";
import { useNavigate } from "react-router-dom";

export function useAuthService() {
    const [user, setUser] = useState<LoginInfo | null>(null);

    const onChange = (loginInfo: LoginInfo) => {
        setUser(loginInfo);
    }


    const navigate = useNavigate();
    const signIn = async (loginInfo: LoginInfo) => {
        try {
            await login(loginInfo);
            navigate("/dashboard");
        } catch (error) {
            alert((error as Error).message);
        }
    }

    const signUp = async (registerInfo: LoginInfo) => {
        console.log(import.meta.env.VITE_USER_REGISTER);
        try {
            await register(registerInfo);
            navigate("/auth");
        } catch (error) {
            alert((error as Error).message);
        }
    }

    return { signIn, signUp, onChange, user };
}

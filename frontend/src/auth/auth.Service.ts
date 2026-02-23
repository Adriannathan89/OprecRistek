export type LoginInfo = {
    email?: string,
    username?: string,
    password: string
}

export async function login(loginInfo: LoginInfo) {
    const res = await fetch(import.meta.env.VITE_USER_LOGIN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginInfo)
    })

    if(!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login failed");
    }
    const json = await res.json();

    localStorage.setItem("token", json.access_token);
    localStorage.setItem("userId", json.userId);
}

export async function register(registerInfo: LoginInfo) {
    console.log(import.meta.env.VITE_USER_REGISTER);
    const res = await fetch(import.meta.env.VITE_USER_REGISTER, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registerInfo)
    })
    const json = await res.json();

    if (!json.success) {
        throw new Error("Register failed");
    }
}
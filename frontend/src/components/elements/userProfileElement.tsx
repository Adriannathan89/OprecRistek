import { useState, useRef, useCallback } from "react";
import { ChevronDown, ChevronUp, User, LogOut, Settings } from "lucide-react"
import { useUserProfile, useClickOutside, useEscapeKey,  } from "../../dashboard/useUserProfile";

export default function UserProfieElement({ userId }: { userId: string }) {
    const {user, error} = useUserProfile(userId)
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const close = useCallback(() => {
        setOpen(false)
    }, [])

    const Logout = () => {
        localStorage.clear()
        window.location.href = `/`
    }

    useEscapeKey(open, close)
    useClickOutside(ref, () => setOpen(false))

    if(error) return (<div className="flex gap-[8px] text-md">
         <User size={24} className="mt-[4px]" />
        <span className="mt-[4px]">Guest</span>  
    </div>)

    return (
        <div ref={ref} className="relative inline-block">
            <div onClick={() => setOpen(!open)} className="group flex gap-[8px] text-lg text-foreground mt-[2px] cursor-pointer">
                <User size={24} className="text-foreground rounded-full mt-[4px]" />
                <span className="mt-[1px]">{user}</span>
                {open ? <ChevronUp size={20} className="mt-[6px]" /> : <ChevronDown size={20} className="mt-[6px] group-hover:rotate-180 transition-all duration-300" />}
            </div>

            {open && (
                <div className="absolute right-0 mt-[8px] w-40 rounded-md shadow-md shadow-[#13131a] 
                    bg-black text-white border-1 border-[#2c2e36]">
                    <button className="block flex gap-[4px] px-[36px] py-[16px] cursor-pointer">
                        <User size={16} className="mt-[4px]" /> Profile
                    </button>
                    <button className="block flex gap-[4px] px-[36px] py-[16px] cursor-pointer">
                        <Settings size={16} className="mt-[4px]" />Setting
                    </button>
                    <button className="block flex gap-[4px] px-[36px] py-[16px] cursor-pointer text-red-400 hover:text-red-300" onClick={Logout}>
                        <LogOut size={16} className="mt-[4px]" />Logout
                    </button>
                </div>
            )}
        </div>
    )

}
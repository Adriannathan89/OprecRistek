import { useEffect, useState } from "react";
import { getUser } from "./userService";

export function useUserProfile(userId: string) {
    const [user, setUser] = useState<String>()
    const [error, setError] = useState(false)

    useEffect(() => {
        getUser(userId)
        .then(setUser)
        .catch(setError)
    }, [userId])

    return {user, error}
}


export function useEscapeKey(
  enabled: boolean,
  onEscape: () => void
) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape();
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [enabled, onEscape]);
}


export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onOutsideClick: () => void
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
}
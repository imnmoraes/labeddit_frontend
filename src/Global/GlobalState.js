import { createContext } from "react";

export let userData = {
    connected: false,
    jwt: null
}

export const UserData = createContext();
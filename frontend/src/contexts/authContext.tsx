import React, { useEffect, useState } from "react";

import { jwtDecode } from 'jwt-decode';

// interface Person {
//     nom: string;
//     prenom: string;
// }

// const person: Partial<Person> = {
//     nom: 'grignon',
//     gdffdg: ''
// }

export interface AuthContextType {
    email?: string;
    token?: string;
    creationTime?: Date;

    setToken: (token: string | null) => void;
}

export const AuthContext = React.createContext<AuthContextType>({
    setToken: () => { console.warn("setToken called but context is not yet initialized") }
});

export const AUTH_TOKEN_LOCAL_STORAGE_KEY = 'authToken';

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [contextData, setContextData] = useState<Partial<AuthContextType>>({});

    const setToken = (token: string | null) => {
        console.log("set token", token)

        // save token in local storage
        if (!token) {
            localStorage.removeItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);

            // refresh context state
            setContextData({});
        } else {
            localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, token);

            // refresh context state
            console.log("update context data")

            const tokenData: any = jwtDecode(token);
            setContextData({
                token,
                email: tokenData.email,
                creationTime: new Date(tokenData.iat * 1000)
            });
        }

    };

    useEffect(() => {
        console.log('restore auth context from local storage');
        const token: string | null = localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
        setToken(token);
    }, []);

    return <AuthContext.Provider value={{ ...contextData, setToken }}>
        {children}
    </AuthContext.Provider>
};
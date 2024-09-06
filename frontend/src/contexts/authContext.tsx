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

export enum AuthRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export interface AuthContextType {
    email?: string;
    role?: AuthRole;
    token?: string;
    creationTime?: Date;
    expirationTime?: Date;

    setToken: (token: string | null) => void;
}

function jwtToAuthContextData(token: string | null): Partial<AuthContextType> {
    if (token == null) {
        return {}
    }

    const tokenData: any = jwtDecode(token);
    console.log("update context data from tokenData", tokenData);
    return {
        token,
        role: tokenData.role,
        email: tokenData.email,
        creationTime: new Date(tokenData.iat * 1000),
        expirationTime: new Date(tokenData.exp * 1000),
    };
}

export const AUTH_TOKEN_LOCAL_STORAGE_KEY = 'authToken';

export const AuthContext = React.createContext<AuthContextType>({
    setToken: () => { console.warn("setToken called but context is not yet initialized") }
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [contextData, setContextData] = useState<Partial<AuthContextType>>({
        ...jwtToAuthContextData(localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY))
    });

    const setToken = (token: string | null) => {
        console.log("set token", token)

        // save token in local storage
        if (!token) {
            localStorage.removeItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
        } else {
            localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, token);
        }
        
        // refresh context state
        setContextData(jwtToAuthContextData(token));
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
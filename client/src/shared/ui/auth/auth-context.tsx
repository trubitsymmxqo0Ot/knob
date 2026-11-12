import { createContext, useContext, type ReactNode } from "react";

interface AuthContextType {
    isLogin?: boolean;
    setIsLogin?: (isLogin: boolean) => void;
    email?: string;
    name?: string;
    createdAt?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
}

export const AuthProvider = ({children, createdAt, email, name, isLogin, setIsLogin}: AuthContextType & {children: ReactNode}) => {
    return (
        <AuthContext.Provider value={{isLogin, setIsLogin, email, name, createdAt}}>
            {children}
        </AuthContext.Provider>
    )
}
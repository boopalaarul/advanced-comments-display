"use client"
import { createContext, useState } from 'react';
import { Credentials } from '@/app/lib/definitions';
//AuthorizeContext can hold a username (selectively making certain edit/remove buttons
//available on CommentCards), or hold null (guest access, no database modification allowed)
//default value can also be an object, can be modified to include e.g. a secondary access
//rank/role (maybe a certain user is allowed to log in but has been banned from posting)
export const AuthorizeContext = createContext(null as Credentials)
export const SetAuthorizeContext = createContext(null as any)

export default function AuthorizeProvider({children}:any) {
    const [auth, setAuth] = useState(null)
    return (
        <AuthorizeContext.Provider value={auth}>
            <SetAuthorizeContext.Provider value={setAuth}>
                {children}
            </SetAuthorizeContext.Provider>
        </AuthorizeContext.Provider>
    );
}
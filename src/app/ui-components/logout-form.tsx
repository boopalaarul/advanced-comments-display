import { AuthorizeContext, SetAuthorizeContext } from "./context/authorize-provider";
import { useContext } from "react";
export default function LogoutForm() {
    const setAuth = useContext(SetAuthorizeContext);
    const credentials = useContext(AuthorizeContext);

    return (
        <div className="section flex flex-row space-x-3">
            <h2>Welcome, {credentials?.username}. When you&apos;re ready to go, make sure to</h2>
            <button className="button" onClick={()=>{setAuth(null)}}>Log Out</button>
        </div>
    );
}
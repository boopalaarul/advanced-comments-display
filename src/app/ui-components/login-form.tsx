import { SetAuthorizeContext } from "./context/authorize-provider";
import { useContext, useState } from "react";
export default function LoginForm() {
    
    const setAuth = useContext(SetAuthorizeContext)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [failureCause, setFailureCause] = useState(null)

    function handleUsernameChange(event : any) {
        const target = event.target as HTMLInputElement;
        setUsername(target.value);
    }

    function handlePasswordChange(event : any) {
        const target = event.target as HTMLInputElement;
        setPassword(target.value);
    }

    async function handleSubmission() {
        const credentials = {
            username: username,
            password: password
        }
        const response = await fetch("/api/auth/", {
            method: 'POST', //GET request can't have a body
            body: JSON.stringify({credentials}),
            headers: { "Content-Type": "application/json" }
        })
        const resBody = await response.json();
        if (resBody.authSuccess){
            setAuth(credentials)
        }
        else {
            setUsername("");
            setPassword("");
            setFailureCause(resBody.problem)
            //error message times out after two seconds
            setTimeout(()=>{setFailureCause(null)}, 2000)
        }
    }

    return (
        <div className="section">
            <h2>Want to join the conversation?</h2>
            <p className="text-red-600">
                {failureCause === "username" ? "Username not found." : null }
                {failureCause === "password" ? "Password incorrect." : null }
            </p>
            <div className="flex flex-row space-x-5">
                <label htmlFor="username-id">Username:</label>
                <input type="text" id="username-id" value={username} onChange={handleUsernameChange} />

                <label htmlFor="password-id">Password:</label>
                <input type="password" id="password-id" value={password} onChange={handlePasswordChange} />

                <button className="button" onClick={handleSubmission}>Sign In</button>
            </div>
        </div>
    );
}
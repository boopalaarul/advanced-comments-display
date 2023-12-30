//container for login and logout forms, can also display user information/profile
import { useContext } from "react";
import { AuthorizeContext } from "./context/authorize-provider";
import LoginForm from "./login-form";
import LogoutForm from "./logout-form";

export default function UserProfile() {
    
    const loggedInUser = useContext(AuthorizeContext);

    return (
        loggedInUser 
        ? <LogoutForm />
        : <LoginForm />
    )
}
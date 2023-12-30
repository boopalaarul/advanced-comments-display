import { useContext } from "react";
import { SetSubmitModeContext } from "./context/submitmode-provider";
import { removeMode, SubmitModeAction } from "../lib/submitmodes";

export default function RemoveButton( props : {target : number, text: string} ) {
    const setSubmitMode = useContext(SetSubmitModeContext)
    const newMode : SubmitModeAction = {
        mode: removeMode,
        target: props.target,
        text: props.text
    }
    return (
        //don't want this comment to be visible if user isn't the user who posted this comment
        //wait... if all the info i need is inside the comment card, why have a separate component at all?
        //to keep the code compartmentalized. get the relevant info from props.
        <button className="button" onClick={()=>{setSubmitMode(newMode)}}>Remove</button>
    );
}

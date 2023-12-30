import { useContext } from "react";
import { SetSubmitModeContext } from "./context/submitmode-provider";
import { replyMode, SubmitModeAction } from "../lib/submitmodes";

export default function ReplyButton( props : {target: number} ) {
    const setSubmitMode = useContext(SetSubmitModeContext)
    const newMode : SubmitModeAction = {
        mode: replyMode,
        target: props.target,
    }
    return (
        //don't want this comment to be visible if user isn't the user who posted this comment
        //wait... if all the info i need is inside the comment card, why have a separate component at all?
        //to keep the code compartmentalized. get the relevant info from props.
        <button className="button" onClick={()=>{setSubmitMode(newMode)}}>Reply</button>
    );
}
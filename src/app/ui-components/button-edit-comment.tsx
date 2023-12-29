import { useContext } from "react";
//authorization check done in CommentCard
//import { AuthorizeContext } from "./context/authorize-context";
import { SetSubmitModeContext } from "./context/submitmode-provider";
import { editMode, SubmitModeAction } from "../lib/submitmodes";

export default function EditButton( props : {target: number, text: string} ) {
    const setSubmitMode = useContext(SetSubmitModeContext)
    const newMode : SubmitModeAction = {
        mode: editMode,
        target: props.target,
        text: props.text
    }
    return (
        //don't want this comment to be visible if user isn't the user who posted this comment
        //wait... if all the info i need is inside the comment card, why have a separate component at all?
        //to keep the code compartmentalized. get the relevant info from props.
        <button className="button" onClick={()=>{setSubmitMode(newMode)}}>Edit</button>
    );
}
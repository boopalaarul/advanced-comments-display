import { useContext, useState } from "react"
import { AuthorizeContext } from "./context/authorize-context"
import { SubmitModeContext, SetSubmitModeContext } from "./context/submitmode-provider";
import { defaultMode, editMode, replyMode, removeMode } from "../lib/submitmodes";

/*
function TextArea({value, eventHandler}:any) {
    //this component should be able to access and modify the submitMode context
    const submitMode = useContext(SubmitModeContext);
    return(
        <textarea className="grow mx-10" 
                    placeholder="This movie was..."
                    defaultValue={submitMode.text ? submitMode.text : ""}
                    //value={value} 
                    onChange={eventHandler}
                />
    );
}
*/

export default function CommentInput() {

    //if loggedInUser is null, don't want the textfield to render
    const loggedInUser = useContext(AuthorizeContext);

    //this component should be able to access and modify the submitMode context
    const submitMode = useContext(SubmitModeContext);
    const setSubmitMode = useContext(SetSubmitModeContext);

    //state variable for controlled input textarea
    const [inputText, setInputText] = useState("")

    let heading = "";
    switch(submitMode.mode) {
        case defaultMode: {
            heading = "You are currently typing a top-level comment."
            break;
        }
        case replyMode: {
            heading = `You are currently replying to comment #${submitMode.target}.`
            break;
        }
        case editMode: {
            heading = `You are currently editing comment #${submitMode.target}.`
            break;
        }
        case removeMode: {
            heading = `Are you sure you want to delete comment #${submitMode.target}?`
            break;
        }
        default: {
           throw Error(`SubmitMode does not have a mode specified ${submitMode}`);
        }
    }

    function clearPreference() {
        setSubmitMode({mode:defaultMode});
        setInputText(""); //clears input
    }

    //controls the textarea component
    function handleInputChange(event: any) {
        const target = event.target as HTMLTextAreaElement;
        setInputText(target.value);
    }

    return (
        loggedInUser ? 
            <div className="section flex flex-col space-y-5">
                {/* tell the user what their input is going to do */}
                <div className="flex flex-row">
                    <h2 className="grow">{heading}</h2>
                    {submitMode.mode !== defaultMode
                    ? <button className="button" onClick={clearPreference}>Clear Preference</button>
                    : null}    
                </div>
                
                {/* allow user to create new / modify previous input */}
                <textarea className="grow mx-10" 
                    placeholder="This movie was..."
                    value={inputText} 
                    onChange={handleInputChange}
                />
            </div> 
        : null
    );
}
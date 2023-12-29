//would be cool to use this same component both for editing a comment and for making a new one
//could have a header that tracks "new top-level comment", "replying to #id", "editing #id"
//then depending on the header, the submit button either does a PUT or a POST... but how?

//it seems like what i'd have to do is useContext, and then this component will re-render &
//have what it needs to send the right data to the right API
    //but if there's another way to send data from one child to a child in a different branch,
    //besides lifting up state, then...

//useEffect responds to changes in dependencies... so either a change in prop or change in state
//maybe useReducer?

import { useContext, useState } from "react"
import { AuthorizeContext } from "./context/authorize-context"
import { SubmitModeContext, SetSubmitModeContext } from "./context/submitmode-provider";
import { defaultMode, editMode, replyMode, removeMode } from "../lib/submitmodes";

export default function CommentInput() {

    //if loggedInUser is null, don't want the textfield to render
    const loggedInUser = useContext(AuthorizeContext);

    //this component should be able to access and modify the submitMode context
    const submitMode = useContext(SubmitModeContext);
    const setSubmitMode = useContext(SetSubmitModeContext);

    //state variable for inner text of textarea, has to update as textarea updates
    const [inputText, setInputText] = useState(submitMode.text ? submitMode.text : "")

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
            heading = `You are currently replying to comment #${submitMode.target}.`
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
    }

    function handleInputChange(event: any) {
        const target = event.target as HTMLTextAreaElement;
        setInputText(target.value)
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
                    defaultValue={inputText} 
                    onChange={handleInputChange}
                />
            </div> 
        : null
    );
}
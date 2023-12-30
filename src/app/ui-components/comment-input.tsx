import { useContext, useState, useEffect } from "react"
import { AuthorizeContext } from "./context/authorize-context"
import { SubmitModeContext, SetSubmitModeContext } from "./context/submitmode-provider";
import { defaultMode, editMode, replyMode, removeMode } from "../lib/submitmodes";

export default function CommentInput({updater, forceUpdate} : any) {

    //if loggedInUser is null, don't want the textfield to render
    const loggedInUser = useContext(AuthorizeContext);
    
    //how many chars allowed in new comment
    const charLimit = 1000;

    //this component should be able to access and modify the submitMode context
    const submitMode = useContext(SubmitModeContext);
    const setSubmitMode = useContext(SetSubmitModeContext);

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

    //state variable for controlled input textarea
    const [inputText, setInputText] = useState("")

    //post-render adjustment of textarea
    useEffect(()=>{
        submitMode.text ? setInputText(submitMode.text) : setInputText("");
    }, [submitMode.text])

    /** event handlers */
    function clearPreference() {
        setSubmitMode({mode:defaultMode});
        setInputText(""); //clears input
        //inputText.current = ""
    }

    //controls the textarea component
    function handleInputChange(event: any) {
        const target = event.target as HTMLTextAreaElement;
        setInputText(target.value);
        //inputText.current = target.value
    }

    //using fetch to POST, figure out what the search params should look like
    async function handleSubmit(){
        //switch statements for URL and method (POST, PUT, DELETE)
        //PUT vs POST: POST changes are the kind that would have a stacking effect
        //if they were repeated, e.g. adding several duplicates of a new row; PUT
        //wouldn't have this effect (e.g. updating/replacing one row over and over)
        let url = ""
        let method = ""

        //escape characters like # in input text
        let encodedInputText = encodeURIComponent(inputText)

        switch(submitMode.mode) {
            case defaultMode: {
                //template literals might auto-escape newlines, but don't autoescape tabs!
                url = `/api/editData/?username=${loggedInUser}`
                    + `&timestamp=${(new Date(Date.now())).toISOString()}`
                    + `&text=${encodedInputText}`
                    + `&replying_to=${null}`;
                method = "POST"
                break;
            }
            case replyMode: {
                url =`/api/editData/?username=${loggedInUser}`
                    + `&timestamp=${(new Date(Date.now())).toISOString()}`
                    + `&text=${encodedInputText}`
                    + `&replying_to=${submitMode.target}`
                method = "POST"
                break;
            }
            case editMode: {
                //username not strictly necessary for this one (expect a person to be
                //editing their own comments), but can throw error if there's a mismatch
                url = `/api/editData/?id=${submitMode.target}`
                    + `&username=${loggedInUser}`
                    + `&timestamp=${(new Date(Date.now())).toISOString()}`
                    + `&text=${encodedInputText}`
                method = "PUT"
                break;
            }
            case removeMode: {
                //username, text included for extra WHERE conditions
                url = `/api/editData/?id=${submitMode.target}`
                    + `&username=${loggedInUser}`
                    + `&text=${submitMode.text}`
                method = "DELETE"
                //don't know what fields we need for this one
                //before designing the APIs, have the exact SQL commands we need written
                //out on paper
                break;
            }
            default: {
                throw Error("submit mode doesn't have a valid mode")
            }
        }

        //results go into here
        const response = await fetch(url, {method:method})
        if(response.status !== 200) {
            //if there's an error, then don't wipe any info, just let them try again
            alert("Something went wrong, and your request could not be completed. Please try again in a few seconds.")
        }
        else {
            //if everything went well, clear the input & clear the submit-info context
            clearPreference();
            forceUpdate(updater + 1);
        }
    }

    return (
        loggedInUser ? 
            <div className="section flex flex-col justify-center space-y-5">
                {/* tell the user what their input is going to do */}
                <div className="flex flex-row">
                    <h2 className="grow">{heading}</h2>
                    {submitMode.mode !== defaultMode
                    ? <button className="button" onClick={clearPreference}>Clear Preference</button>
                    : null}    
                </div>
                
                {/* allow user to create new / modify previous input*/}
                <div className="px-10 flex flex-col">
                    <p className="justify-left">
                        Characters remaining: {charLimit - inputText.length}/{charLimit}
                    </p>

                    <textarea className="grow" 
                        placeholder="This movie was..."
                        value={inputText} 
                        onChange={handleInputChange}
                        maxLength={charLimit}
                        disabled={submitMode.mode === removeMode}
                    />
                </div>

                {/* submission button */}
                <button disabled={inputText.length < 1} className="button" onClick={handleSubmit}>Submit</button>
            </div> 
        : null
    );
}
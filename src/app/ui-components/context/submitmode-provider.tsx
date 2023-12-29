//Component that creates contexts to hold a reducer state variable and a dispatch function.
//Meant to be used by CommentCard's Edit, Delete, and Remove buttons,
//as well as CommentInput's Submit and Clear Preference buttons.
"use client"
import { createContext, SetStateAction } from "react";
import { useState, Dispatch } from "react";
import { defaultMode, removeMode, SubmitModeAction } from '../../lib/submitmodes'

//have to export these to be able to import and use them in other elements
//if next state of textarea has no impact on previous state... why use a reducer at all,
//why not just pass around context? because modifying context is done by setting context
//value as a state variable and then making the setter accessible...
export const SubmitModeContext = createContext({} as SubmitModeAction);
export const SetSubmitModeContext = createContext((object : SubmitModeAction) => {});

export default function SubmitModeProvider({children} : {children: any}) {

    const [submitMode, setSubmitMode] = useState({mode: defaultMode})
    //const [submitMode, setSubmitMode] = useState({mode: removeMode, target:9, text:"blurg"})

    return (
        <SubmitModeContext.Provider value={submitMode}>
            <SetSubmitModeContext.Provider value={setSubmitMode}>
                {children}
            </SetSubmitModeContext.Provider>
        </SubmitModeContext.Provider>
    );
}
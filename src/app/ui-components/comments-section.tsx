"use client" //need this when using useState
import { useState } from "react"

import CommentsChronological from './comments-chronological';
import CommentsThreaded from './comments-threaded';

export default function CommentsSection( {updater} : {updater: number}) {

    const [isHierarchical, setMode] = useState(false)

    return (
        //this div not only controls the background, but also the spacing between 
        //comment cards or top-level comment threads
        <div className="bg-yellow-500 flex flex-col space-y-5">
            <h1 className="text-2xl text-bold text-black">Comments</h1>
            <p className="text-black"><strong>Comments policy:</strong> Be civil etc etc</p>
            <div className="flex flex-row space-x-5 text-black">
                <p>Comments displaying in: {
                        isHierarchical ? "threaded" : "chronological"
                    } mode.</p>
                <button className="button" onClick={() => {setMode(!isHierarchical)}}>Change Display Mode</button>
            </div>
            {isHierarchical ? <CommentsThreaded root_id={null} updater={updater}/> : <CommentsChronological updater={updater}/>}
            
        </div>
    )
}
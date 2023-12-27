"use client" //need this when using useState
import { useState } from "react"

import CommentsChronological from './comments-chronological';
import CommentsThreaded from './comments-threaded';

export default function CommentsSection() {

    const [isHierarchical, setMode] = useState(false)

    return (
        <div className="bg-yellow-500 rounded-lg p-10 flex flex-col space-y-5">
            <h1 className="text-2xl text-bold text-black">Comments</h1>
            <p className="text-black"><strong>Comments policy:</strong> Be civil etc etc</p>
            <div className="flex flex-row space-x-5">
                <p className="text-black">Comments displaying in: {
                        isHierarchical ? "hierachical" : "non-hierarchical"
                    } mode.</p>
                <button className="rounded-md bg-gray-500 px-[4px]" onClick={() => {setMode(!isHierarchical)}}>Change Display Mode</button>
        </div>

            {isHierarchical ? null : <CommentsChronological/>}
        </div>
    )
}